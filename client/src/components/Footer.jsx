import { MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.grid}>
        <div style={styles.section}>
          <h3 style={styles.brand}>FitLife Gym</h3>
          <p style={styles.tagline}>Transform your body, transform your life.</p>
          <div style={styles.socials}>
            <a href="#" style={styles.icon}>Instagram</a>
            <a href="#" style={styles.icon}>Twitter</a>
            <a href="#" style={styles.icon}>Facebook</a>
          </div>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <a href="/" style={styles.link}>Home</a>
          <a href="/schedule" style={styles.link}>Schedule</a>
          <a href="/membership" style={styles.link}>Membership</a>
          <a href="/login" style={styles.link}>Login</a>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.contact}><MapPin size={16} /> 123 Fitness Ave, New York, NY</p>
          <p style={styles.contact}><Phone size={16} /> (555) 123-4567</p>
          <p style={styles.contact}><Mail size={16} /> info@fitlifegym.com</p>
        </div>

        <div style={styles.section}>
          <h4 style={styles.heading}>Hours</h4>
          <p style={styles.hours}>Mon - Fri: 5:00 AM - 11:00 PM</p>
          <p style={styles.hours}>Saturday: 6:00 AM - 10:00 PM</p>
          <p style={styles.hours}>Sunday: 7:00 AM - 8:00 PM</p>
        </div>
      </div>

      <div style={styles.bottom}>
        <p>© {new Date().getFullYear()} FitLife Gym. All rights reserved.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: '3rem 2rem 1rem',
    marginTop: '4rem'
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'space-between',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  section: { display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '180px' },
  brand: { fontSize: '1.5rem', margin: 0, color: 'white' },
  tagline: { color: '#aaa', margin: 0 },
  socials: { display: 'flex', gap: '1rem', marginTop: '0.5rem' },
  icon: { color: '#aaa', textDecoration: 'none', fontSize: '0.95rem' },
  heading: { color: '#e94560', margin: '0 0 0.5rem' },
  link: { color: '#aaa', textDecoration: 'none', fontSize: '0.95rem' },
  contact: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#aaa', margin: 0, fontSize: '0.95rem' },
  hours: { color: '#aaa', margin: 0, fontSize: '0.95rem' },
  bottom: { textAlign: 'center', color: '#555', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #333' }
};

export default Footer;
