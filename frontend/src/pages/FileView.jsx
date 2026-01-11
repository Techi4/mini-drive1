import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function FileView() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    api.get(`/share/${id}`).then(res => setFile(res.data));
  }, [id]);

  if (!file) return <p>Loading...</p>;

  return (
    <div>
      <h2>{file.filename}</h2>
      <a href={`http://localhost:5000/${file.path}`} target="_blank">
        Download
      </a>
    </div>
  );
}