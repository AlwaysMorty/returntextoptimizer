require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { loadProducts, loadReturns } = require('./db/init');
const { runMigrations } = require('./db/migrate');
const { analyzeReturns, categorizeReason } = require('./gpt/analyzer');
const { saveSuggestion, setFeedback, listSuggestions, getSuggestion, markApplied } = require('./db/suggestions');
const { saveAnalysis } = require('./db/analysis');
const { getAuthUrl, exchangeCode } = require('./api/shopifyAuth');
const shopify = require('./api/shopify');
const woo = require('./api/woocommerce');

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static('frontend'));

// Run DB migrations on startup if a DB is configured
runMigrations().catch(err => console.error('Migration error', err));

async function analyzeAllProducts() {
  const products = await loadProducts();
  const allReturns = await loadReturns();
  for (const product of products) {
    const returns = allReturns.filter(r => r.product_id === product.id).map(r => r.return_reason);
    if (!returns.length) continue;
    const suggestion = await analyzeReturns(product, returns);
    const saved = await saveSuggestion(product.id, suggestion);
    const categories = {};
    for (const r of returns) {
      const cat = categorizeReason(r);
      categories[cat] = (categories[cat] || 0) + 1;
    }
    await saveAnalysis(product.id, categories, saved.id);
  }
}

if (process.env.NODE_ENV !== 'test') {
  const day = 24 * 60 * 60 * 1000;
  setInterval(analyzeAllProducts, day);
}

function requireAuth(req, res, next) {
  if (req.session.user) return next();
  res.status(401).json({ error: 'unauthenticated' });
}

app.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  req.session.user = { email };
  res.json({ ok: true });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

app.get('/session', (req, res) => {
  if (req.session.user) return res.json(req.session.user);
  res.status(401).json({});
});

app.get('/products', async (req, res) => {
  const products = await loadProducts();
  res.json(products);
});

app.get('/returns', async (req, res) => {
  const returns = await loadReturns();
  res.json(returns);
});

app.get('/shopify/products', async (req, res) => {
  const products = await shopify.getProducts();
  res.json(products);
});

app.get('/woocommerce/products', async (req, res) => {
  const products = await woo.getProducts();
  res.json(products);
});

app.get('/shopify/returns', async (req, res) => {
  const data = await shopify.getReturns();
  res.json(data);
});

app.get('/woocommerce/returns', async (req, res) => {
  const data = await woo.getReturns();
  res.json(data);
});

app.get('/analyze/:id', async (req, res) => {
  const products = await loadProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'not found' });
  const returns = (await loadReturns()).filter(r => r.product_id === product.id).map(r => r.return_reason);
  const suggestion = await analyzeReturns(product, returns);
  const saved = await saveSuggestion(product.id, suggestion);
  const categories = {};
  for (const reason of returns) {
    const cat = categorizeReason(reason);
    categories[cat] = (categories[cat] || 0) + 1;
  }
  await saveAnalysis(product.id, categories, saved.id);
  res.json({ id: saved.id, suggestion: saved.suggestion });
});

app.get('/categories/:id', async (req, res) => {
  const returns = (await loadReturns()).filter(r => r.product_id === req.params.id);
  if (!returns.length) return res.status(404).json({ error: 'no returns found' });
  const counts = {};
  for (const r of returns) {
    const cat = categorizeReason(r.return_reason);
    counts[cat] = (counts[cat] || 0) + 1;
  }
  res.json(counts);
});

app.get('/stats', requireAuth, async (req, res) => {
  const products = await loadProducts();
  const returns = await loadReturns();
  const countMap = {};
  for (const r of returns) {
    countMap[r.product_id] = (countMap[r.product_id] || 0) + 1;
  }
  const stats = products.map(p => ({ id: p.id, title: p.title, rate: countMap[p.id] || 0 }));
  res.json(stats);
});

app.get('/suggestions', requireAuth, async (req, res) => {
  const list = await listSuggestions();
  res.json(list);
});

app.post('/feedback/:id', requireAuth, async (req, res) => {
  const { accepted } = req.body;
  const updated = await setFeedback(req.params.id, accepted);
  if (!updated) return res.status(404).json({ error: 'not found' });
  res.json(updated);
});

app.post('/apply/:id', requireAuth, async (req, res) => {
  const suggestion = await getSuggestion(req.params.id);
  if (!suggestion) return res.status(404).json({ error: 'not found' });
  const resultShop = await shopify.patchProduct(suggestion.product_id, { description: suggestion.suggestion });
  const resultWoo = await woo.patchProduct(suggestion.product_id, { description: suggestion.suggestion });
  await markApplied(req.params.id);
  res.json({ shopify: resultShop.updated, woocommerce: resultWoo.updated });
});

app.post('/settings', requireAuth, (req, res) => {
  req.session.settings = req.body;
  res.json({ ok: true });
});

app.get('/auth/shopify', (req, res) => {
  res.json({ url: getAuthUrl() });
});

app.get('/auth/shopify/callback', async (req, res) => {
  const data = await exchangeCode(req.query.code);
  res.json(data);
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = server;
