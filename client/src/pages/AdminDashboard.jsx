import { useState, useEffect } from 'react';
import axios from '../api/axios';

function AdminDashboard() {
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [tab, setTab] = useState('classes');
  const [form, setForm] = useState({
    name: '', instructor: '', day: '', time: '', capacity: '', description: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchClasses();
    fetchMembers();
  }, []);

  const fetchClasses = async () => {
    const res = await axios.get('/classes');
    setClasses(res.data);
  };

  const fetchMembers = async () => {
    const res = await axios.get('/members');
    setMembers(res.data);
  };

  const handleAddClass = async () => {
    try {
      await axios.post('/classes', { ...form, capacity: Number(form.capacity) });
      setMessage('Class added!');
      setForm({ name: '', instructor: '', day: '', time: '', capacity: '', description: '' });
      fetchClasses();
    } catch (err) {
      setMessage('Failed to add class');
    }
  };

  const handleDeleteClass = async (id) => {
    await axios.delete(`/classes/${id}`);
    fetchClasses();
  };

  const handleDeleteMember = async (id) => {
    await axios.delete(`/members/${id}`);
    fetchMembers();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(tab === 'classes' ? styles.activeTab : {}) }}
          onClick={() => setTab('classes')}
        >
          Classes
        </button>
        <button
          style={{ ...styles.tab, ...(tab === 'members' ? styles.activeTab : {}) }}
          onClick={() => setTab('members')}
        >
          Members
        </button>
      </div>

      {message && <p style={styles.message}>{message}</p>}

      {tab === 'classes' && (
        <div>
          <div style={styles.form}>
            <h3>Add New Class</h3>
            <div style={styles.formGrid}>
              <input style={styles.input} placeholder="Class Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
              <input style={styles.input} placeholder="Instructor" value={form.instructor}
                onChange={e => setForm({ ...form, instructor: e.target.value })} />
              <input style={styles.input} placeholder="Day (e.g. Monday)" value={form.day}
                onChange={e => setForm({ ...form, day: e.target.value })} />
              <input style={styles.input} placeholder="Time (e.g. 9:00 AM)" value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })} />
              <input style={styles.input} placeholder="Capacity" value={form.capacity}
                onChange={e => setForm({ ...form, capacity: e.target.value })} />
              <input style={styles.input} placeholder="Description" value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
            <button style={styles.addButton} onClick={handleAddClass}>Add Class</button>
          </div>

          <h3>Current Classes</h3>
          {classes.length === 0 ? <p>No classes yet.</p> : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th><th>Instructor</th><th>Day</th><th>Time</th><th>Capacity</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.instructor}</td>
                    <td>{c.day}</td>
                    <td>{c.time}</td>
                    <td>{c.capacity}</td>
                    <td>
                      <button style={styles.deleteBtn} onClick={() => handleDeleteClass(c.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {tab === 'members' && (
        <div>
          <h3>Registered Members</h3>
          {members.length === 0 ? <p>No members yet.</p> : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Role</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.email}</td>
                    <td>{m.role}</td>
                    <td>
                      <button style={styles.deleteBtn} onClick={() => handleDeleteMember(m.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' },
  title: { color: '#1a1a2e', fontSize: '2rem' },
  tabs: { display: 'flex', gap: '1rem', marginBottom: '2rem' },
  tab: {
    padding: '0.6rem 1.5rem', border: 'none', borderRadius: '5px',
    cursor: 'pointer', backgroundColor: '#ddd', fontSize: '1rem'
  },
  activeTab: { backgroundColor: '#1a1a2e', color: 'white' },
  message: { color: '#e94560', fontWeight: 'bold' },
  form: {
    backgroundColor: '#f5f5f5', padding: '1.5rem',
    borderRadius: '10px', marginBottom: '2rem'
  },
  formGrid: { display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' },
  input: {
    padding: '0.7rem', borderRadius: '5px', border: '1px solid #ddd',
    fontSize: '1rem', flex: '1 1 200px'
  },
  addButton: {
    backgroundColor: '#e94560', color: 'white', border: 'none',
    padding: '0.7rem 1.5rem', borderRadius: '5px', cursor: 'pointer',
    fontWeight: 'bold', fontSize: '1rem'
  },
  table: { width: '100%', borderCollapse: 'collapse' },
  deleteBtn: {
    backgroundColor: '#e94560', color: 'white', border: 'none',
    padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer'
  }
};

export default AdminDashboard;
