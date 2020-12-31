import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/authPage/login';
import SignUp from './components/authPage/register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
              <Route  exact path="/" component={Login}/>
              <Route  path="/signup" component={SignUp}/>
              <PrivateRoute path="/dashboard" component={Dashboard}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
