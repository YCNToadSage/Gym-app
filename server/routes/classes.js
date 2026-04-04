const express = require('express');
const router = express.Router();
const { getDb, saveDb } = require('../db');

// GET all classes
router.get('/', (req, res) => {
  const db = getDb();
  res.json(db.classes);
});

// GET single class
router.get('/:id', (req, res) => {
  const db = getDb();
  const gymClass = db.classes.find(c => c.id === Number(req.params.id));
  if (!gymClass) return res.status(404).json({ error: 'Class not found' });
  res.json(gymClass);
});

// POST create class (admin only - we'll protect this later)
router.post('/', (req, res) => {
  const { name, instructor, day, time, capacity, description } = req.body;
  const db = getDb();

  const newClass = {
    id: Date.now(),
    name,
    instructor,
    day,
    time,
    capacity,
    description
  };

  db.classes.push(newClass);
  saveDb(db);
  res.json(newClass);
});

// DELETE a class (admin only)
router.delete('/:id', (req, res) => {
  const db = getDb();
  db.classes = db.classes.filter(c => c.id !== Number(req.params.id));
  saveDb(db);
  res.json({ message: 'Class deleted' });
});

module.exports = router;
