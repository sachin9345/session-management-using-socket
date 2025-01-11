import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinSession = () => {
  const [sessionId, setSessionId] = useState('');
  const navigate = useNavigate();

  const handleJoinSession = () => {
    if (sessionId) {
      navigate(`/session/${sessionId}`); // Navigate to SessionScreen with sessionId
    }
  };

  return (
    <div>
      <h1>Join a Session</h1>
      <input
        type="text"
        placeholder="Enter Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button onClick={handleJoinSession}>Join Session</button>
    </div>
  );
};

export default JoinSession;
