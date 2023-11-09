import { BrowserRouter, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './App.css';
import Nav from './navigation/Nav';
import RouteList from './navigation/RouteList';
import userContext from './context/userContext';
import JoblyApi from './api';

/**Renders App
 * App -> {Nav, RouteList}
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(function () {
    async function fetchUserInfo() {
      if (token !== null) {
        let user = await JoblyApi.getUserInfo(token);
        setUser(user);

      } else {

        setUser(null);
      }
    }

    fetchUserInfo();

  }, [token]);


  async function signup(formData) {
    let res = await JoblyApi.signUp(formData);

    if (res.error) {
      <Navigate to='/signup' error={res.error} />;
    }

    const { username } = { ...formData };
    setToken({ username, token: res.token });
  }


  async function login(formData) {
    let res = await JoblyApi.login(formData);

    if (res.error) {
      <Navigate to='/login' error={res.error} />;
    }
    const { username } = formData;
    setToken({ username, token: res.token });
  }


  function logout() {
    setToken(null);
  }


  return (
    <userContext.Provider value={user}>
      <BrowserRouter>
        <Nav logout={logout} />
        <div className='App container'>
          <div className='row'>
            <div className='col-11'>
              <RouteList signup={signup} login={login} />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
