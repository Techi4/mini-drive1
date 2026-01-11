import { useEffect, useState } from 'react';
import API from '../api/axios';
import '../styles/dashboard.css';

export default function AdminDashboard() {
  const [files, setFiles] = useState([]);

  const loadFiles = async () => {
    const res = await API.get('/admin/files');
    setFiles(res.data);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const deleteFile = async (id) => {
    if (!window.confirm('Delete this file permanently?')) return;
    await API.delete(`/admin/files/${id}`);
    loadFiles();
  };

  return (
    <div className="drive-page">
      <div className="drive-header">
        <h2>🛡 Admin – All User Files</h2>
      </div>

      <div className="file-grid">
        {files.map(file => (
          <div className="file-card" key={file._id}>
            <div className="file-icon">📁</div>

            <div className="file-name">{file.filename}</div>

            <small style={{ color: '#555' }}>
              Uploaded by: {file.owner?.email}
            </small>

            <div className="file-actions">
              <a
                href={`http://localhost:5000/${file.path}`}
                target="_blank"
                rel="noreferrer"
              >
                Open
              </a>
              <button onClick={() => deleteFile(file._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}