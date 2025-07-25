const { pool } = require('./client');

let memory = [];

async function saveAnalysis(productId, categories, suggestionId = null) {
  if (pool) {
    const { rows } = await pool.query(
      'INSERT INTO analyses (product_id, categories, suggestion_id) VALUES ($1,$2,$3) RETURNING *',
      [productId, categories, suggestionId]
    );
    return rows[0];
  }
  const item = { id: memory.length + 1, product_id: productId, categories, suggestion_id: suggestionId };
  memory.push(item);
  return item;
}

async function getLatestAnalysis(productId) {
  if (pool) {
    const { rows } = await pool.query(
      'SELECT * FROM analyses WHERE product_id=$1 ORDER BY created_at DESC LIMIT 1',
      [productId]
    );
    return rows[0];
  }
  const list = memory.filter(a => a.product_id === productId);
  return list[list.length - 1];
}

module.exports = { saveAnalysis, getLatestAnalysis };

