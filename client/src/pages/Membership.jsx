import { useNavigate } from 'react-router-dom';

function Membership() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSelect = (plan) => {
    if (!user) {
      navigate('/login');
    } else {
      alert(`You selected the ${plan} plan! Payment integration coming soon.`);
    }
  };

  const plans = [
    {
      name: 'Basic',
      price: '$29/mo',
      dark: false,
      features: ['Gym Access', 'Locker Room', '2 Group Classes/mo', 'Free Parking']
    },
    {
      name: 'Pro',
      price: '$59/mo',
      dark: true,
      features: ['Everything in Basic', 'Unlimited Classes', 'Personal Trainer Session', 'Nutrition Consultation', 'Guest Passes']
    },
    {
      name: 'Elite',
      price: '$99/mo',
      dark: false,
      accent: true,
      features: ['Everything in Pro', 'Dedicated Trainer', 'Priority Booking', 'Spa Access', 'Merchandise Discount']
    }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Membership Plans</h1>
      <p style={styles.subtitle}>Choose the plan that fits your goals</p>
      <div style={styles.grid}>
        {plans.map(plan => {
          const bg = plan.dark ? '#1a1a2e' : plan.accent ? '#e94560' : '#f5f5f5';
          const textColor = plan.dark || plan.accent ? 'white' : '#1a1a2e';
          const priceColor = plan.dark || plan.accent ? 'white' : '#e94560';
          const btnBg = plan.dark || plan.accent ? 'white' : '#1a1a2e';
          const btnColor = plan.dark ? '#1a1a2e' : plan.accent ? '#e94560' : 'white';

          return (
            <div key={plan.name} style={{ ...styles.card, backgroundColor: bg }}>
              <h2 style={{ color: textColor, marginTop: 0 }}>{plan.name}</h2>
              <p style={{ ...styles.price, color: priceColor }}>{plan.price}</p>
              <ul style={styles.list}>
                {plan.features.map(f => (
                  <li key={f} style={{ ...styles.listItem, color: textColor }}>
                    <span style={{ ...styles.check, color: priceColor }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                style={{ ...styles.button, backgroundColor: btnBg, color: btnColor }}
                onClick={() => handleSelect(plan.name)}
              >
                Get Started
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '3rem 2rem', fontFamily: 'sans-serif', textAlign: 'center' },
  title: { color: '#1a1a2e', fontSize: '2.5rem', marginBottom: '0.5rem' },
  subtitle: { color: '#888', fontSize: '1.2rem', marginBottom: '3rem' },
  grid: { display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' },
  card: { padding: '2.5rem', borderRadius: '15px', width: '280px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
  price: { fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0 1.5rem' },
  list: { listStyle: 'none', padding: 0, textAlign: 'left', marginBottom: '2rem' },
  listItem: { marginBottom: '0.6rem', fontSize: '0.95rem' },
  check: { fontWeight: 'bold', fontSize: '1.1rem' },
  button: { padding: '0.8rem 2rem', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', width: '100%' }
};

export default Membership;
