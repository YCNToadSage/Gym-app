const express = require('express');
const router = express.Router();
const { getDb, saveDb } = require('../db');

// GET all members (admin only)
router.get('/', (req, res) => {
  const db = getDb();
  const members = db.users.map(({ password, ...rest }) => rest);
  res.json(members);
});

// GET single member
router.get('/:id', (req, res) => {
  const db = getDb();
  const user = db.users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Member not found' });
  const { password, ...rest } = user;
  res.json(rest);
});

// DELETE a member (admin only)
router.delete('/:id', (req, res) => {
  const db = getDb();
  db.users = db.users.filter(u => u.id !== Number(req.params.id));
  saveDb(db);
  res.json({ message: 'Member deleted' });
});

module.exports = router;
