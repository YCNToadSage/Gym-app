const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { getDb, saveDb } = require('../db');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// REQUEST PASSWORD RESET
router.post('/forgot', async (req, res) => {
  const { email } = req.body;
  const db = getDb();

  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(404).json({ error: 'No account with that email' });

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = Date.now() + 3600000; // 1 hour

  if (!db.resetTokens) db.resetTokens = [];
  db.resetTokens = db.resetTokens.filter(t => t.email !== email);
  db.resetTokens.push({ email, token, expiry });
  saveDb(db);

  const resetLink = `http://localhost:5173/reset-password?token=${token}&email=${email}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'FitLife Gym - Password Reset',
    html: `
      <h2>Password Reset Request</h2>
      <p>Click the link below to reset your password. This link expires in 1 hour.</p>
      <a href="${resetLink}">Reset Password</a>
    `
  });

  res.json({ message: 'Reset email sent' });
});

// RESET PASSWORD
router.post('/reset', async (req, res) => {
  const { email, token, password } = req.body;
  const db = getDb();

  if (!db.resetTokens) return res.status(400).json({ error: 'Invalid or expired token' });

  const resetEntry = db.resetTokens.find(t => t.email === email && t.token === token);
  if (!resetEntry) return res.status(400).json({ error: 'Invalid or expired token' });
  if (Date.now() > resetEntry.expiry) return res.status(400).json({ error: 'Token expired' });

  const hashed = await bcrypt.hash(password, 10);
  db.users = db.users.map(u => u.email === email ? { ...u, password: hashed } : u);
  db.resetTokens = db.resetTokens.filter(t => t.email !== email);
  saveDb(db);

  res.json({ message: 'Password reset successful' });
});

module.exports = router;
