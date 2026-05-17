import { useState } from 'react';
import api from '../api/axiosConfig';
import useAuthStore from '../store/useAuthStore';
import { Activity } from 'lucide-react';

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  
  // Bring in the 'login' action from our Zustand short-term memory
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear old errors

    // 📨 Send username/password to Django's token printer
    api.post('token/', credentials)
      .then((response) => {
        // SUCCESS! Django handed us the badge (access token)
        // Pass it to Zustand to save it globally
        login(response.data.access);
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setError('Invalid username or password. Please try again.');
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bg-light)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Activity size={48} color="var(--primary-blue)" />
        </div>
        
        <h2 style={{ marginBottom: '5px' }}>HMS Portal</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px' }}>Sign in to access patient records</p>

        {error && <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '5px' }}>Username</label>
          <input 
            className="input-field" 
            type="text" 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            required 
            style={{ marginBottom: '15px' }}
          />

          <label style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '5px' }}>Password</label>
          <input 
            className="input-field" 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            required 
            style={{ marginBottom: '20px' }}
          />

          <button className="btn-primary" type="submit" style={{ width: '100%', marginTop: '0' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;