const { expect } = require('chai');
const { newDb } = require('pg-mem');
const { runMigrations } = require('../db/migrate');

describe('database migrations', function() {
  it('creates required tables', async function() {
    const db = newDb();
    const pg = db.adapters.createPg();
    const client = new pg.Client();
    await client.connect();
    const pool = { query: (text, params) => client.query(text, params) };
    await runMigrations(pool);
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name in ('users','products','returns','suggestions')");
    expect(res.rows).to.have.length(4);
    await client.end();
  });
});
