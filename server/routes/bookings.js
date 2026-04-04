const express = require('express');
const router = express.Router();
const { getDb, saveDb } = require('../db');

// GET all bookings for a user
router.get('/user/:userId', (req, res) => {
  const db = getDb();
  const bookings = db.bookings.filter(b => b.userId === Number(req.params.userId));
  const detailed = bookings.map(b => {
    const gymClass = db.classes.find(c => c.id === b.classId);
    return { ...b, class: gymClass };
  });
  res.json(detailed);
});

// POST book a class
router.post('/', (req, res) => {
  const { userId, classId } = req.body;
  const db = getDb();

  // Check class exists
  const gymClass = db.classes.find(c => c.id === Number(classId));
  if (!gymClass) return res.status(404).json({ error: 'Class not found' });

  // Check if already booked
  const existing = db.bookings.find(b => b.userId === Number(userId) && b.classId === Number(classId));
  if (existing) return res.status(400).json({ error: 'Already booked' });

  // Check capacity
  const bookingCount = db.bookings.filter(b => b.classId === Number(classId)).length;
  if (bookingCount >= gymClass.capacity) return res.status(400).json({ error: 'Class is full' });

  const newBooking = {
    id: Date.now(),
    userId: Number(userId),
    classId: Number(classId)
  };

  db.bookings.push(newBooking);
  saveDb(db);
  res.json(newBooking);
});

// DELETE cancel a booking
router.delete('/:id', (req, res) => {
  const db = getDb();
  db.bookings = db.bookings.filter(b => b.id !== Number(req.params.id));
  saveDb(db);
  res.json({ message: 'Booking cancelled' });
});

module.exports = router;
