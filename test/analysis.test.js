const { expect } = require('chai');
const { saveAnalysis, getLatestAnalysis } = require('../db/analysis');

describe('analysis storage', () => {
  it('saves categories in memory', async () => {
    const item = await saveAnalysis('p1', { size: 2 });
    expect(item).to.have.property('id');
    const latest = await getLatestAnalysis('p1');
    expect(latest.categories.size).to.equal(2);
  });
});
