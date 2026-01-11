import { useState } from 'react';
import API from '../api/axios';

import '../styles/auth.css';

export default function AdminLogin() {
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/admin-login', {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');

      window.location = '/admin-dashboard';
    } catch {
      alert('Admin login failed');
    }
  };

  return (
    <div className="auth-bg admin-bg">
      <div className="auth-card admin-card">
        <h2>🛡 Admin Login</h2>
        <p>Restricted access – admins only</p>

        <form onSubmit={submit}>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
          />

          <div className="input-box">
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
            />
            <span className="toggle" onClick={() => setShow(!show)}>
              {show ? '🙈' : '👁'}
            </span>
          </div>

          <button>LOGIN AS ADMIN</button>
        </form>

        <div className="auth-links">
          <p><a href="/login">← Back to User Login</a></p>
        </div>
      </div>
    </div>
  );
}