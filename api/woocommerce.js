const axios = require('axios');

/**
 * WooCommerce REST API wrapper. In development, returns empty arrays.
 */
const { loadProducts, loadReturns } = require('../db/init');

async function getProducts() {
  if (!process.env.SHOP_API_KEY) {
    return loadProducts();
  }
  const url = `${process.env.WOO_BASE_URL}/wp-json/wc/v3/products`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${process.env.SHOP_API_KEY}` }
  });
  return res.data;
}

async function getReturns() {
  if (!process.env.SHOP_API_KEY) {
    return loadReturns();
  }
  // Placeholder for WooCommerce returns
  return [];
}

async function patchProduct(id, data) {
  if (!process.env.SHOP_API_KEY) {
    return { id, updated: false };
  }
  await axios.put(`https://api.woocommerce.com/products/${id}`, data, {
    headers: { Authorization: `Bearer ${process.env.SHOP_API_KEY}` }
  });
  return { id, updated: true };
}
module.exports = { getProducts, getReturns, patchProduct };
