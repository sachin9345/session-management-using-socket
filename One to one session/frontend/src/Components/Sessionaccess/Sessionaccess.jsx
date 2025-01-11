import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Session() {
  const { sessionId } = useParams();
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/session/${sessionId}`);
        setIsValidSession(response.data.valid);
      } catch (error) {
        console.error('Error validating session:', error);
      }
    };

    checkSession();
  }, [sessionId]);

  return (
    <div className="Session">
      {isValidSession ? (
        <h1>Welcome to the Session</h1>
      ) : (
        <h1>Invalid Session</h1>
      )}
    </div>
  );
}

export default Session;
