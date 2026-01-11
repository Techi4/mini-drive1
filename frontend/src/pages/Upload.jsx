import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/upload.css";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const onFileChange = (e) => setFile(e.target.files[0]);

  const uploadFile = async () => {
    if (!file) return alert("Please choose a file!");

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      await API.post("/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("File uploaded ✅");
      navigate("/dashboard");
    } catch (err) {
  console.log("UPLOAD ERROR FULL:", err);

  console.log("STATUS:", err.response?.status);
  console.log("DATA:", err.response?.data);
  console.log("MESSAGE:", err.message);

  alert(
    err.response?.data?.message ||
    `Upload failed (Status: ${err.response?.status || "No Response"})`
  );
} 
finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2>Upload File</h2>
        <p className="upload-subtitle">
          Choose a document, image, or video to upload to Mini Drive.
        </p>

        <div className="upload-box">
          <input type="file" onChange={onFileChange} />

          {file && (
            <div className="file-preview">
              <p><b>Selected:</b> {file.name}</p>
              <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          )}

          <button className="btn btn-primary" disabled={uploading} onClick={uploadFile}>
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button className="btn btn-light" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
