import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default () => {
  const [rooms, setRooms] = useState([
    {
      name: 'Room 1',
      id: '1',
    },
    {
      name: 'Room 2',
      id: '2',
    },
  ]);

  return (
    <div className="Login">
      <div className="title">Chat rooms</div>
      {rooms.map((room) => {
        return (
          <div>
            <Link key={room.id} to={`room/${room.id}`}>
              {room.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
