import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const endpoint = isSignup ? '/auth/signup' : '/auth/login';
      const res = await axios.post(endpoint, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
        {error && <p style={styles.error}>{error}</p>}
        {isSignup && (
          <input
            style={styles.input}
            placeholder="Full Name"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        )}
        <input
          style={styles.input}
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <button style={styles.button} onClick={handleSubmit}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p style={{ textAlign: 'center' }}>
          <Link to="/forgot-password" style={{ color: '#e94560' }}>Forgot Password?</Link>
        </p>
        <p style={styles.toggle}>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <span style={styles.link} onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? ' Login' : ' Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#f5f5f5'
  },
  box: {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  title: { textAlign: 'center', color: '#1a1a2e', margin: 0 },
  input: {
    padding: '0.8rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#e94560',
    color: 'white',
    padding: '0.8rem',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: { color: 'red', textAlign: 'center', margin: 0 },
  toggle: { textAlign: 'center', margin: 0 },
  link: { color: '#e94560', cursor: 'pointer', fontWeight: 'bold' }
};

export default Login;
