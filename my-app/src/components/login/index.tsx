import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './index.scss';

export default () => {
  const [redirect, setRedirect] = useState(false);

  const login = () => {
    console.log(username);
    setRedirect(true);
  };

  return (
    <div className="Login">
      {redirect && <Redirect from="login" to="rooms" />}
      <div className="title">Login to chat room</div>
      <div>
        <span>Username: </span>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <button onClick={login}>Login</button>
    </div>
  );
};
