import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/Login/Login';
import Destination from './Components/Destination/Destination';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState({});
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
      <Switch>
          
          <Route path="/home">
            <Home/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/destination/:id">
            <Destination/>
          </PrivateRoute >
          <PrivateRoute path="/destination">
            <Destination/>
          </PrivateRoute >
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider>
  );
}

export default App;
