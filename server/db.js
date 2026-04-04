const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

const defaultData = {
  users: [],
  classes: [],
  bookings: []
};

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2));
}

function getDb() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function saveDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = { getDb, saveDb };
