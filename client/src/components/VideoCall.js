import React, { useEffect, useRef } from 'react';

function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const ws = useRef(null);

  useEffect(() => {
    
    // Initialize WebSocket connection
    ws.current = new WebSocket('ws://localhost:5000');

    ws.current.onmessage = (event) => {
      console.log('Received:', event.data);
      // Handle signaling messages here
    };

    // Setup video streams
    const getUserMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      localVideoRef.current.srcObject = stream;
    };

    getUserMedia();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted />
      <video ref={remoteVideoRef} autoPlay />
    </div>
  );
}

export default VideoCall;
