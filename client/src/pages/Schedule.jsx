import { useState, useEffect } from 'react';
import axios from '../api/axios';

function Schedule() {
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('/classes').then(res => setClasses(res.data));
  }, []);

  const handleBook = async (classId) => {
    if (!user) return setMessage('Please login to book a class');
    try {
      await axios.post('/bookings', { userId: user.id, classId });
      setMessage('Class booked successfully!');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Class Schedule</h1>
      {message && <p style={styles.message}>{message}</p>}
      {classes.length === 0 ? (
        <p style={styles.empty}>No classes available yet. Check back soon!</p>
      ) : (
        <div style={styles.grid}>
          {classes.map(c => (
            <div key={c.id} style={styles.card}>
              <h3 style={styles.className}>{c.name}</h3>
              <p>👤 {c.instructor}</p>
              <p>📅 {c.day} at {c.time}</p>
              <p>👥 Capacity: {c.capacity}</p>
              <p>{c.description}</p>
              <button style={styles.button} onClick={() => handleBook(c.id)}>
                Book Class
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', fontFamily: 'sans-serif' },
  title: { textAlign: 'center', color: '#1a1a2e', fontSize: '2rem' },
  message: { textAlign: 'center', color: '#e94560', fontWeight: 'bold' },
  empty: { textAlign: 'center', color: '#888', fontSize: '1.2rem' },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    justifyContent: 'center',
    marginTop: '2rem'
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: '1.5rem',
    borderRadius: '10px',
    width: '280px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  className: { color: '#1a1a2e', marginTop: 0 },
  button: {
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '0.5rem'
  }
};

export default Schedule;
