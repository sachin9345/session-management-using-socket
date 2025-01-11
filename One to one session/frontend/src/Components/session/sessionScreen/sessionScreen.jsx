import React from 'react';
import { useParams } from 'react-router-dom';
import NavSS from "../components/nav/navSS";
import VideoCall from "../components/videoCall/videoCall";
import CallFunctions from "../components/callFunctions/callFunctions";
import Chat from "../components/chat/chat";
import WhiteBoard from "../components/Whiteboard/whiteboard";
import './sessionScreen.css'

const SessionScreen = () => {
  const { sessionId } = useParams();

  return (
    <div className="wholeSS">
      <div className="navScreen">
        <NavSS sessionId={sessionId} />
      </div>
      <div className="bodyScreen">
        <div className="expandDiv">
          <div className="whiteBoardScreen">
            <WhiteBoard sessionId={sessionId} />
          </div>
        </div>
        <div className="callDiv">
          <div className="callScreen">
            <VideoCall sessionId={sessionId} />
          </div>
          <div className="callFunction">
            <CallFunctions sessionId={sessionId} />
          </div>
          <div className="ChatScreen">
            <Chat sessionId={sessionId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionScreen;
