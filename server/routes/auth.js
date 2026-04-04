const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb, saveDb } = require('../db');

// SIGNUP
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const db = getDb();

  const existing = db.users.find(u => u.email === email);
  if (existing) return res.status(400).json({ error: 'Email already in use' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    role: 'member'
  };

  db.users.push(newUser);
  saveDb(db);

  const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET);
  res.json({ token, user: { id: newUser.id, name, email, role: newUser.role } });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = getDb();

  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user.id, name: user.name, email, role: user.role } });
});

module.exports = router;
