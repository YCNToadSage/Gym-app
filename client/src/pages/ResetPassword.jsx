import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../api/axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/password/reset', { email, token, password });
      setMessage(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Reset Password</h2>
        {message && <p style={styles.success}>{message} Redirecting to login...</p>}
        {error && <p style={styles.error}>{error}</p>}
        <input
          style={styles.input}
          placeholder="New Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button style={styles.button} onClick={handleSubmit}>Reset Password</button>
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
  success: { color: 'green', textAlign: 'center', margin: 0 },
  error: { color: 'red', textAlign: 'center', margin: 0 }
};

export default ResetPassword;
