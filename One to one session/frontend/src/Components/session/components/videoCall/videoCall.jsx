// videoCall.jsx
import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './videoCall.css';

const VideoCall = ({ sessionId }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const socket = io(); // Connect to the server

    const peerConnection = new RTCPeerConnection();

    // Handle ICE candidate events
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', event.candidate);
      }
    };

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    // Handle incoming offers
    socket.on('offer', async (offer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', answer);
    });

    // Handle incoming answers
    socket.on('answer', async (answer) => {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // Handle incoming ICE candidates
    socket.on('ice-candidate', (candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Access user media and add tracks to peer connection
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      peerConnection.close();
    };
  }, [sessionId]);

  return (
    <div className="videoCallScreen">
      <video ref={localVideoRef} autoPlay muted className="localVideo" />
      
    </div>
  );
};

export default VideoCall;
