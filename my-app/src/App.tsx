import { useState } from 'react';

import './App.scss';
import Login from './components/login';
import Rooms from './components/rooms';
import Room from './components/room';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login username={username} setUsername={setUsername} />
          </Route>
          <Route exact path="/rooms">
            <Rooms />
          </Route>
          <Route path="/room/">
            <Room />
          </Route>
          <Route path="*">
            <Redirect from="*" to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
