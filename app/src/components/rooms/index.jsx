import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './index.scss';

export default (props) => {
  const { username } = props;
  const [messages, setMessages] = useState({
    1: [],
    2: [],
  });
  const [newMessage, setNewMessage] = useState('');
  const rooms = [
    {
      name: 'Room 1',
      id: '1',
    },
    {
      name: 'Room 2',
      id: '2',
    },
  ];
  const location = useLocation();
  const roomId = location.pathname.split('/')[2] || 1;

  let socket;

  const sendMessage = () => {
    socket.emit('messages', messages[roomId].push({ username, content: newMessage }));
    setNewMessage('');
  };

  useEffect(() => {
    socket = io('http://localhost:3002');
    console.log('listen to messages');
    socket.on(`messages`, (newMessages) => {
      setMessages(newMessages);
      console.log(newMessages);
    });

    console.log(messages);
    return () => {};
  });

  return (
    <div className="rooms">
      <div id="chat-container">
        <div id="side-bar">
          <div className="username">username: {username}</div>
          {rooms.map((room) => {
            return (
              <div className="room-link">
                <Link key={room.id} to={`/rooms/${room.id}`}>
                  {room.name}
                </Link>
              </div>
            );
          })}
        </div>
        <div id="chat-window">
          <div className="room-name">Room {roomId}</div>
          <div className="messages">
            {messages[roomId] &&
              messages[roomId].map((message) => {
                const { username, content } = message;
                return (
                  <div>
                    <div className="message">
                      {username}: {content}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="new-message">
            <span>Your message: </span>
            <textarea type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};
