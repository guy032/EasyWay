import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.scss';

export default (props) => {
  const { username } = props;
  const [room, setRoom] = useState({
    name: 'Room 1',
    id: '1',
  });

  const location = useLocation();
  const roomId = location.pathname.split('/')[2];
  console.log(`roomId: ${roomId}`);

  const { name } = room || {};

  return (
    <div className="Login">
      <div className="title">{name}</div>
      <Link to="/rooms">go back to all rooms</Link>
    </div>
  );
};
