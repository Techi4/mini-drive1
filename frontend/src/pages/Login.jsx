import { useState } from 'react';
import API from '../api/axios';
import '../styles/auth.css';

export default function Login() {
  const [show, setShow] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      window.location = '/dashboard';
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Welcome Back 👋</h2>
        <p>Login to Mini Drive</p>

        <form onSubmit={submit}>
          <input name="email" placeholder="Email" required />

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

          <button>SIGN IN</button>
        </form>

        <div className="auth-links">
          <p>New user? <a href="/signup">Create account</a></p>
          <p>Admin? <a href="/admin-login">Login here</a></p>
        </div>
      </div>
    </div>
  );
}