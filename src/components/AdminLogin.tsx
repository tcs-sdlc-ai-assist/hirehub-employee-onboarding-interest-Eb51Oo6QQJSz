import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAdminAuthToken } from '../utils/storage';

interface AdminLoginFormState {
  username: string;
  password: string;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'hirehub2024',
};

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState<AdminLoginFormState>({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate async login
    await new Promise(resolve => setTimeout(resolve, 400));

    if (
      form.username.trim() === ADMIN_CREDENTIALS.username &&
      form.password === ADMIN_CREDENTIALS.password
    ) {
      saveAdminAuthToken('admin-session-token');
      setLoading(false);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password.');
      setLoading(false);
    }
  };

  return (
    <div className="app-container" style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2 className="header-title" style={{ fontSize: '1.5rem', marginBottom: '1em' }}>
        Admin Login
      </h2>
      <form onSubmit={handleSubmit} aria-label="Admin Login Form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        {error && (
          <div className="form-error" role="alert" style={{ marginBottom: '1em' }}>
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', marginTop: '0.5em' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-2 text-muted" style={{ fontSize: '0.95em', textAlign: 'center' }}>
        <span>Demo credentials: <b>admin</b> / <b>hirehub2024</b></span>
      </div>
    </div>
  );
};

export default AdminLogin;