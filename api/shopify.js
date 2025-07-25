const axios = require('axios');

/**
 * Simple wrapper to fetch products via Shopify API.
 * Expects environment variables SHOP_API_KEY and SHOP_SECRET.
 */
const { loadProducts, loadReturns } = require('../db/init');

async function getProducts() {
  if (!process.env.SHOP_API_KEY) {
    // Fallback to local data during development
    return loadProducts();
  }
  const domain = process.env.SHOP_DOMAIN;
  const res = await axios.get(`https://${domain}/admin/api/2024-04/products.json`, {
    headers: { 'X-Shopify-Access-Token': process.env.SHOP_API_KEY }
  });
  return res.data.products;
}

async function getReturns() {
  if (!process.env.SHOP_API_KEY) {
    return loadReturns();
  }
  // Placeholder for real returns fetch via Shopify API
  return [];
}

async function patchProduct(id, data) {
  if (!process.env.SHOP_API_KEY) {
    // In development without credentials, do nothing
    return { id, updated: false };
  }
  // Placeholder for real API call
  await axios.patch(`https://api.shopify.com/products/${id}`, { product: data }, {
    headers: { 'X-Shopify-Access-Token': process.env.SHOP_API_KEY }
  });
  return { id, updated: true };
}
module.exports = { getProducts, getReturns, patchProduct };
