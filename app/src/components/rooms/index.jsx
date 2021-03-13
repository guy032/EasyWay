import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import './index.scss';

const socket = io('http://localhost:3002');

export default (props) => {
  const { username } = props;
  const [messages, setMessages] = useState();
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

  const sendMessage = () => {
    const addMessage = { roomId, username, content: newMessage };
    socket.emit('messages', addMessage);
    const newMessages = JSON.parse(JSON.stringify(messages));
    newMessages[roomId].push(addMessage);
    setMessages(newMessages);
    setNewMessage('');
  };

  useEffect(() => {
    console.log('listen to messages');
    socket.on(`newMessages`, (newMessages) => {
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
            {messages &&
              messages[roomId] &&
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
