import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './features/User/Login';
import Signup from './features/User/Signup';
import Dashboard from './features/Vehicles/Dashboard';
import { PrivateRoute } from './helpers/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={Signup} path="/signup" />
          <PrivateRoute exact component={Dashboard} path="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
