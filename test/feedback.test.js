const { expect } = require('chai');
const { saveSuggestion, setFeedback, listSuggestions } = require('../db/suggestions');

describe('feedback processing', () => {
  it('saves and lists suggestions', async () => {
    const item = await saveSuggestion('p1', 'test');
    expect(item).to.have.property('id');
    const list = await listSuggestions();
    expect(list).to.have.length.greaterThan(0);
  });

  it('updates feedback state', async () => {
    const item = await saveSuggestion('p2', 'test2');
    const updated = await setFeedback(item.id, true);
    expect(updated.accepted).to.be.true;
  });
});
