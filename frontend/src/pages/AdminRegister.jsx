import API from '../api/axios';

export default function AdminRegister() {
  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/register', {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: 'admin', // 👈 IMPORTANT
      });

      alert('Admin registered successfully');
      window.location = '/login';
    } catch (err) {
      alert(err.response?.data?.message || 'Admin registration failed');
    }
  };

  return (
    <div className="container">
      <h2>🛡 Admin Registration</h2>

      <form onSubmit={submit} className="card">
        <input
          name="name"
          placeholder="Admin Name"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Admin Email"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit">Create Admin</button>
      </form>
    </div>
  );
}