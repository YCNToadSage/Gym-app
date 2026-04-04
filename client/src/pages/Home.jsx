import { Link } from 'react-router-dom';
import { Dumbbell, Users, Calendar } from 'lucide-react';

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Transform Your Body,<br />Transform Your Life</h1>
        <p style={styles.subtitle}>Join FitLife Gym and get access to world-class equipment, expert trainers, and a community that pushes you to be your best.</p>
        <div style={styles.buttons}>
          <Link to="/membership" style={styles.primaryBtn}>View Membership Plans</Link>
          <Link to="/schedule" style={styles.secondaryBtn}>See Class Schedule</Link>
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.card}>
          <Dumbbell size={48} color="#e94560" />
          <h3>Top Equipment</h3>
          <p>State of the art machines and free weights for every fitness level.</p>
        </div>
        <div style={styles.card}>
          <Users size={48} color="#e94560" />
          <h3>Expert Trainers</h3>
          <p>Certified coaches ready to help you hit your goals faster.</p>
        </div>
        <div style={styles.card}>
          <Calendar size={48} color="#e94560" />
          <h3>Group Classes</h3>
          <p>Yoga, HIIT, spin, and more — book your spot in seconds.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif' },
  hero: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: '5rem 2rem',
    textAlign: 'center'
  },
  title: { fontSize: '3rem', marginBottom: '1rem' },
  subtitle: { fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' },
  buttons: { display: 'flex', gap: '1rem', justifyContent: 'center' },
  primaryBtn: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '0.8rem 2rem',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '0.8rem 2rem',
    borderRadius: '5px',
    textDecoration: 'none',
    border: '2px solid white',
    fontWeight: 'bold'
  },
  features: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '4rem 2rem',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    width: '250px'
  }
};

export default Home;
