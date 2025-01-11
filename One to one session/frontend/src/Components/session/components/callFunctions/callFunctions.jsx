import React, { useState } from "react";
import './callFunctions.css'
import shareIcon from './share.svg'
import micOnIcon from './micOnIcon.svg'
import micOffIcon from './micOffIcon.svg'
import videoOnIcon from './videoOnIcon.svg'
import videoOffIcon from './videoOffIcon.svg'
import expandIcon from './expand.svg'
import shrinkIcon from './shrink.svg'

const CallFunctions = () => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isScreenExpanded, setIsScreenExpanded] = useState(false);

  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
  };

  const handleVideoToggle = () => {
    setIsVideoOn(!isVideoOn);
  };

  const handleScreenExpand = () => {
    setIsScreenExpanded(!isScreenExpanded);
  };

  return (
    <div className="functions-div">
      <div className="functions">
        <button className="share">
          <img src={shareIcon} alt="" className="shareBtn" />
        </button>
        <button
          className={`mic ${isMicOn ? 'mic-on' : 'mic-off'}`}
          onClick={handleMicToggle}
        >
          {isMicOn ? (
            <img src={micOnIcon} alt="Mic On" className="micBtn" />
          ) : (
            <img src={micOffIcon} alt="Mic Off" className="micBtn" />
          )}
        </button>
        <button
          className={`video ${isVideoOn ? 'video-on' : 'video-off'}`}
          onClick={handleVideoToggle}
        >
          {isVideoOn ? (
            <img src={videoOnIcon} alt="Video On" className="micBtn" />
          ) : (
            <img src={videoOffIcon} alt="Video Off" className="micBtn" />
          )}
        </button>
        <button
          className={`expand ${isScreenExpanded ? 'expand-on' : 'expand-off'}`}
          onClick={handleScreenExpand}
        >
          {isScreenExpanded ? (
            <img src={shrinkIcon} alt="Shrink Screen" className="expandBtn" />
          ) : (
            <img src={expandIcon} alt="Expand Screen" className="expandBtn" />
          )}
        </button>
      </div>
    </div>
  )
}

export default CallFunctions