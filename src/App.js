import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './features/User/Login';
import Signup from './features/User/Signup';
import Dashboard from './features/Vehicles/Dashboard';
import VehicleLog from './features/Vehicles/VehicleLog';
import VehicleLastLog from './features/Vehicles/VehicleLastLog';
import { PrivateRoute } from './helpers/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={Signup} path="/signup" />
          <PrivateRoute exact component={Dashboard} path="/" />
          <PrivateRoute exact component={VehicleLog} path="/vehicle-log/:vid" />
          <PrivateRoute exact component={VehicleLastLog} path="/vehicle-last-log/:vid" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
