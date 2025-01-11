import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import './CreateSession.css';

const CreateSession = () => {
  const [sessionUrl, setSessionUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const createSession = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/create-session');
      setSessionUrl(response.data.url);
      setShowPopup(true);
      setCopySuccess('');
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sessionUrl).then(() => {
      setCopySuccess('Copied!');
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
      setCopySuccess('Failed to copy.');
    });
  };

  return (
    <div className="create-session-container">
      <nav className="navbar">
        <h1>Create a New Session</h1>
        <button className="create-button" onClick={createSession}>Create Session</button>
      </nav>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Session Created!</h2>
            <p>Share this link with the mentee/mentor to join the session:</p>
            <a href={sessionUrl} className="session-link">{sessionUrl}</a>
            <FontAwesomeIcon
              icon={faClipboard}
              className="copy-icon"
              onClick={copyToClipboard}
              title="Copy to Clipboard"
            />
            {copySuccess && <p className="copy-success">{copySuccess}</p>}
            <button className="close-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSession;
