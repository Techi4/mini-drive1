import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/auth.css";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const payload = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };

    try {
      setLoading(true);

      // ✅ Correct endpoint: baseURL should already include /api
      const res = await API.post("/auth/signup", payload);

      alert("Account created ✅");

      // ✅ optional store token + user
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }
      if (res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // ✅ clear inputs
      e.target.reset();

      // ✅ redirect
      navigate("/login");
    } catch (err) {
      console.log("SIGNUP ERROR FULL:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);

      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Signup failed";

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h2>Welcome to Mini Drive</h2>
        <p>Upload images, videos & files securely</p>

        <form onSubmit={submit}>
          <input name="name" placeholder="Full Name" required />
          <input name="email" placeholder="Email" type="email" required />

          <div className="input-box">
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              minLength={6}
            />
            <span className="toggle" onClick={() => setShow(!show)}>
              {show ? "🙈" : "👁"}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Already have an account?{" "}
            <span
              style={{ color: "#7c3aed", cursor: "pointer", fontWeight: 700 }}
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
