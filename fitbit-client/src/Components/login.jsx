import React, { Component } from 'react';
import logo from '../Fitbit_logo.svg';


export default class Login extends Component 
{
    render () 
    {
        return (
            <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Welcome to the fitbit meal client
              </p>
              <button onClick={() => window.location = 'http://localhost:8888/login'}>
                Access Account
              </button>
      
            </header>
          </div>
        )
    }
}