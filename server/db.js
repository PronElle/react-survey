'use strict';

const sqlite = require('sqlite3');
const DATASRC = './db/surveys.db';

// open the database
const db = new sqlite.Database(DATASRC, (err) => {
  if (err) throw err;
});

module.exports = db;