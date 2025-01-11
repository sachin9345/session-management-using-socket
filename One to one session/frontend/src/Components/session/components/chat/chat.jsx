import React, { useState } from "react";
import './chat.css'
import plusIcon from './Vector.svg'
import expandIcon from './expand.svg'
import shrinkIcon from './shrink.svg'
import messageIcon from './message.svg'

const Chat = () => {
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);

  const handleChatExpand = () => {
    setIsChatExpanded(!isChatExpanded);
  };

  const handleSendMessage = () => {
    const newMessage = message.trim();
    if (newMessage !== '') {
      setSentMessages([...sentMessages, newMessage]);
      setMessage('');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="chatWhole">
      <nav className="chatNav">
        <div className="chatNavLeft">
          <img src={plusIcon} alt="" className="plusIcon" />
          <h1>Live chat</h1>
        </div>
        <div className="chatNavRight">
          <button
            className={`chatExpand ${isChatExpanded ? 'chatExpand-on' : 'chatExpand-off'}`}
            onClick={handleChatExpand}
          >
            {isChatExpanded ? (
              <img src={shrinkIcon} alt="Shrink Chat" className="chatExpandBtn" />
            ) : (
              <img src={expandIcon} alt="Expand Chat" className="chatExpandBtn" />
            )}
          </button>
        </div>
      </nav>
      <div className="chatPart">
        {sentMessages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <span>{msg}</span>
          </div>
        ))}
        <div className="sendMessage">
          <input
            type="text"
            placeholder="Send your message"
            value={message}
            onChange={handleInputChange}
          />
          <button className="sendMsgBtn" onClick={handleSendMessage}>
            <img src={messageIcon} alt="message" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;