import { useState } from 'react';

import './App.scss';
import Login from './components/login';
import Rooms from './components/rooms';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');

  console.log(username === '');

  return (
    <div className="App">
      <Router>
        {username === '' && <Redirect from="*" to="/login" />}
        <Switch>
          <Route exact path="/login">
            <Login username={username} setUsername={setUsername} />
          </Route>
          <Route path="/rooms">
            <Rooms username={username} />
          </Route>
          <Route path="*">
            <Redirect from="*" to="/login" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
