const axios = require('axios');

const SCOPES = 'read_products,read_orders';

function getAuthUrl(state = 'dev') {
  if (!process.env.SHOP_API_KEY) {
    return 'https://example.com/mock-auth';
  }
  const redirect = encodeURIComponent(process.env.SHOP_CALLBACK_URL || 'http://localhost:5000/auth/shopify/callback');
  const domain = process.env.SHOP_DOMAIN;
  return `https://${domain}/admin/oauth/authorize?client_id=${process.env.SHOP_API_KEY}&scope=${SCOPES}&redirect_uri=${redirect}&state=${state}`;
}

async function exchangeCode(code) {
  if (!process.env.SHOP_API_KEY) {
    return { access_token: 'mock-token' };
  }
  const domain = process.env.SHOP_DOMAIN;
  const res = await axios.post(`https://${domain}/admin/oauth/access_token`, {
    client_id: process.env.SHOP_API_KEY,
    client_secret: process.env.SHOP_SECRET,
    code,
  });
  return res.data;
}

module.exports = { getAuthUrl, exchangeCode };
