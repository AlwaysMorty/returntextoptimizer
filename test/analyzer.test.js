const { expect } = require('chai');
const { analyzeReturns } = require('../gpt/analyzer');

describe('GPT analyzer', function() {
  it('should return a suggestion string mentioning frequent reason', async function() {
    const product = { id: 'p001', title: 'Test', description: 'A product' };
    const reasons = ['zu klein', 'zu klein', 'Farbe anders'];
    const suggestion = await analyzeReturns(product, reasons);
    expect(suggestion).to.be.a('string');
    expect(suggestion).to.include('zu klein');
  });
});
