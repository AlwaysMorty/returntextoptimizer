const { pool } = require('./client');

let memory = [];

async function saveSuggestion(productId, suggestion) {
  if (pool) {
    const { rows } = await pool.query(
      'INSERT INTO suggestions (product_id, suggestion, accepted) VALUES ($1,$2,$3) RETURNING *',
      [productId, suggestion, null]
    );
    return rows[0];
  }
  const item = { id: memory.length + 1, product_id: productId, suggestion, accepted: null };
  memory.push(item);
  return item;
}

async function getSuggestion(id) {
  if (pool) {
    const { rows } = await pool.query('SELECT * FROM suggestions WHERE id=$1', [id]);
    return rows[0];
  }
  return memory.find(s => s.id === Number(id));
}

async function markApplied(id) {
  if (pool) {
    const { rows } = await pool.query(
      'UPDATE suggestions SET applied=true WHERE id=$1 RETURNING *',
      [id]
    );
    return rows[0];
  }
  const obj = memory.find(s => s.id === Number(id));
  if (obj) obj.applied = true;
  return obj;
}

async function setFeedback(id, accepted) {
  if (pool) {
    const { rows } = await pool.query(
      'UPDATE suggestions SET accepted=$2 WHERE id=$1 RETURNING *',
      [id, accepted]
    );
    return rows[0];
  }
  const obj = memory.find(s => s.id === Number(id));
  if (obj) obj.accepted = accepted;
  return obj;
}

async function listSuggestions() {
  if (pool) {
    const { rows } = await pool.query('SELECT * FROM suggestions ORDER BY id');
    return rows;
  }
  return memory;
}

module.exports = { saveSuggestion, setFeedback, listSuggestions, getSuggestion, markApplied };

