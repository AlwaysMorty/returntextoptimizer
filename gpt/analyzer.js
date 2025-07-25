const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'placeholder-key'
});

function generatePrompt(product, reasons) {
  const list = reasons.map(r => `- ${r}`).join('\n');
  return `Das folgende Produkt wird h\u00e4ufig zur\u00fcckgesendet.\n\nProdukt: ${product.title}\nBeschreibung:\n${product.description}\n\nR\u00fccksendungen:\n${list}\n\nFormuliere einen kurzen Verbesserungsvorschlag f\u00fcr die Beschreibung.`;
}

/**
 * Analyze return reasons for a product and generate a suggestion for a new description.
 * Uses OpenAI API when a real key is provided, otherwise returns a simple mock suggestion.
 * @param {Object} product - Product object with title and description.
 * @param {string[]} reasons - Array of return reason strings.
 */
async function analyzeReturns(product, reasons) {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-openai-key') {
    // Mock suggestion based on frequent words
    const counts = reasons.reduce((acc, r) => {
      acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {});
    const topReason = Object.entries(counts).sort((a,b) => b[1]-a[1])[0];
    return `Hinweis: Viele Kunden bemängeln "${topReason[0]}". Bitte Beschreibung prüfen.`;
  }

  const prompt = generatePrompt(product, reasons);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 100
  });
  return response.data.choices[0].text.trim();
}

function categorizeReason(reason) {
  const text = reason.toLowerCase();
  if (/(zu (klein|eng|gro\u00df|weit)|kleiner|gr\u00f6\u00dfer)/.test(text)) return 'size';
  if (/farbe/.test(text)) return 'color';
  if (/stoff|material|d\u00fcnn|qualit\u00e4t|kratzt/.test(text)) return 'quality';
  if (/dr\u00fcck|unbequem/.test(text)) return 'comfort';
  return 'other';
}

function clusterReasonsByProduct(returns) {
  const clusters = {};
  for (const r of returns) {
    const cat = categorizeReason(r.return_reason);
    if (!clusters[r.product_id]) clusters[r.product_id] = {};
    clusters[r.product_id][cat] = (clusters[r.product_id][cat] || 0) + 1;
  }
  return clusters;
}

module.exports = { analyzeReturns, categorizeReason, clusterReasonsByProduct, generatePrompt };
