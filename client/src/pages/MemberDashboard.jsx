import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { Calendar, Clock, Users } from 'lucide-react';

function MemberDashboard() {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate('/login');
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(`/bookings/user/${user.id}`);
    setBookings(res.data);
  };

  const handleCancel = async (id) => {
    await axios.delete(`/bookings/${id}`);
    setMessage('Booking cancelled');
    fetchBookings();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Dashboard</h1>
      <p style={styles.welcome}>Welcome back, {user?.name}!</p>
      {message && <p style={styles.message}>{message}</p>}
      <h2 style={styles.subtitle}>My Booked Classes</h2>
      {bookings.length === 0 ? (
        <p style={styles.empty}>You have no upcoming classes. <a href="/schedule" style={styles.link}>Browse the schedule</a></p>
      ) : (
        <div style={styles.grid}>
          {bookings.map(b => (
            <div key={b.id} style={styles.card}>
              <h3 style={styles.className}>{b.class?.name}</h3>
              <p style={styles.detail}><Users size={16} /> {b.class?.instructor}</p>
              <p style={styles.detail}><Calendar size={16} /> {b.class?.day}</p>
              <p style={styles.detail}><Clock size={16} /> {b.class?.time}</p>
              <button style={styles.cancelBtn} onClick={() => handleCancel(b.id)}>
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' },
  title: { color: '#1a1a2e', fontSize: '2rem', marginBottom: '0' },
  welcome: { color: '#888', fontSize: '1.1rem', marginBottom: '2rem' },
  subtitle: { color: '#1a1a2e' },
  message: { color: '#e94560', fontWeight: 'bold' },
  empty: { color: '#888', fontSize: '1.1rem' },
  link: { color: '#e94560', fontWeight: 'bold' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '1.5rem' },
  card: {
    backgroundColor: '#f5f5f5',
    padding: '1.5rem',
    borderRadius: '10px',
    width: '260px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
  },
  className: { color: '#1a1a2e', marginTop: 0 },
  detail: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#555', margin: '0.4rem 0' },
  cancelBtn: {
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '1rem'
  }
};

export default MemberDashboard;
