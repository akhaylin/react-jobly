import { BrowserRouter, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './App.css';
import Nav from './navigation/Nav';
import RouteList from './navigation/RouteList';
import userContext from './context/userContext';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';

/**Renders App
 * App -> {Nav, RouteList}
 */
function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);


  useEffect(function () {
    async function fetchUserInfo() {
      if (token) {
        JoblyApi.token = token;
        const userInfo = jwtDecode(token);
        try {
          let user = await JoblyApi.getUserInfo(userInfo.username); // try/catch
          setUser(user);
        } catch (err) {
          console.error(err);
        }
      } else {

        setUser(null);
      }
    }

    fetchUserInfo();

  }, [token]);


  async function signup(formData) {
    let res = await JoblyApi.signup(formData);

    if (res.error) {
      console.log("IN APP ERROR", res.error)
      throw new Error(res.error);
    }
    setToken(res.token);
  }


  async function login(formData) {
    let res = await JoblyApi.login(formData);

    if (res.error) {
      throw new Error(res.error);
    }

    setToken(res.token);
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
