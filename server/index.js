const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/classes', require('./routes/classes'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/members', require('./routes/members'));

app.get('/', (req, res) => {
  res.json({ message: 'Gym API running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
