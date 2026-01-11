import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

export default function SharedFile() {
  const { fileId } = useParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    API.get(`/share/file/${fileId}`).then(res => {
      setStatus(res.data.access);
    });
  }, [fileId]);

  const requestAccess = async () => {
    await API.post('/share/request-access', { fileId });
    setStatus('pending');
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      {status === 'request' && (
        <>
          <h2>You don’t have access to this file</h2>
          <button onClick={requestAccess}>Request Access</button>
        </>
      )}

      {status === 'pending' && (
        <h2>Access request sent. Waiting for approval.</h2>
      )}

      {status === 'view' && (
        <h2>Access granted (View only)</h2>
      )}

      {status === 'edit' && (
        <h2>Access granted (Edit)</h2>
      )}
    </div>
  );
}