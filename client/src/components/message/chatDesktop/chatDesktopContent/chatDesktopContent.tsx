import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const ChatDesktopContent = () => {
  useEffect(() => {
    const socket = io('http://localhost:4444');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (data: string) => {
      console.log('Received message:', data);
    });

    socket.emit('chatMessage', 'Hello, server!');

    return () => {
      socket.disconnect();
    };
  }, []);

  return <div></div>;
};

export default ChatDesktopContent;
