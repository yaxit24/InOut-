import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { Shield } from 'lucide-react';

export default function Login() {
  const [phone, setPhone] = useState('0000000000'); // the dummy admin phone
  const [otp, setOtp] = useState('123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { phone, otp });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed. Are you an admin?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-card glass-panel">
        <Shield size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
        <h2>Admin Authentication</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Sign in to manage MyGate</p>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <div className="input-group">
            <label>Phone Number</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>OTP (Mock is 123456)</label>
            <input 
              type="password" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
