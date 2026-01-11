import { useState } from 'react';
import API from '../api/axios';
import '../styles/auth.css';

export default function AdminSignup() {
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/register', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: 'admin', // 👈 VERY IMPORTANT
      });

      alert('Admin registered successfully');
      window.location = '/admin-login';
    } catch (err) {
      alert(err.response?.data?.message || 'Admin registration failed');
    }
  };

  return (
    <div className="auth-bg admin-bg">
      <div className="auth-card admin-card">
        <h2>🛡 Admin Registration</h2>
        <p>Create a new administrator account</p>

        <form onSubmit={submit}>
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            required
          />

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

          <button type="submit">CREATE ADMIN</button>
        </form>

        <div className="auth-links">
          <p>
            Already an admin? <a href="/admin-login">Login here</a>
          </p>
          <p>
            <a href="/login">← Back to User Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}