import { useCallback, useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ useCallback: prevents re-creating loadFiles every render
  const loadFiles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/files");
      setFiles(res.data || []);
    } catch (err) {
      alert("Session expired. Please login again.");
      localStorage.clear();
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // ✅ ESLint warning fixed
  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const formatDateTime = (dateString) => {
    if (!dateString) return "—";
    const dt = new Date(dateString);
    return dt.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="dash">
      {/* Top Navbar */}
      <header className="dash-nav">
        <div className="dash-brand">
          <div className="dash-logo">MD</div>
          <div>
            <h3>Mini Drive</h3>
            <p className="dash-subtitle">Your personal cloud storage</p>
          </div>
        </div>

        <div className="dash-user">
          <div className="dash-user-info">
            <p className="dash-user-name">{user?.name || "User"}</p>
            <p className="dash-user-email">{user?.email || ""}</p>
          </div>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="dash-body">
        <div className="dash-actions">
          <div>
            <h2 className="dash-title">Dashboard</h2>
            <p className="dash-text">Upload and manage your files securely.</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/upload")}
          >
            + Upload File
          </button>
        </div>

        {/* Stats */}
        <section className="dash-stats">
          <div className="stat-card">
            <p className="stat-label">Total Files</p>
            <h2 className="stat-value">{files.length}</h2>
          </div>

          <div className="stat-card">
            <p className="stat-label">Last Updated</p>
            <h2 className="stat-value">
              {files[0]?.createdAt ? formatDateTime(files[0]?.createdAt) : "—"}
            </h2>
          </div>
        </section>

        {/* Files Grid */}
        <section className="dash-files">
          <div className="dash-files-head">
            <h3>Your Files</h3>
            <button className="btn btn-light" onClick={loadFiles}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="loader">Loading files...</div>
          ) : files.length === 0 ? (
            <div className="empty">
              <h3>No files uploaded yet 📁</h3>
              <p>Click Upload File to add your first document.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/upload")}
              >
                Upload Now
              </button>
            </div>
          ) : (
            <div className="file-grid">
              {files.map((file) => (
                <div key={file._id} className="file-card">
                  <div className="file-icon">📄</div>

                  <div className="file-info">
                    <h4 className="file-name">{file.filename}</h4>
                    <p className="file-meta">
                      Uploaded: <span>{formatDateTime(file.createdAt)}</span>
                    </p>
                  </div>

                  <div className="file-actions">
                    <a
                      className="btn btn-outline"
                      href={`http://localhost:5000/${file.path}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
