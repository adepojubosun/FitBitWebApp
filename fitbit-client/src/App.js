import React, {Component} from 'react';
import './App.css';
import Login from './Components/login';
import Home from './Components/home';
import queryString from "query-string";

const userUrl = "https://api.fitbit.com/1/user/-/profile.json";

class App extends Component {
  constructor() 
  {
    super();
    this.state = {
      userData : {},
      accessGranted : false
    }
  }
  componentDidMount()
  {
    let parsed = queryString.parse(window.location.search);
    let access_token = parsed.access_token;
    //console.log(accessToken);
    //GET https://api.fitbit.com/1/user/[user-id]/profile.json
    fetch(userUrl, 
    {headers : {'Authorization': 'Bearer '+access_token}
  }).then(response => {if (response.ok) {return response.json()} else {throw new Error("something went wrong")}} ).then(data => this.setState({userData : data.user, accessGranted : true})).catch(error => this.setState({accessGranted:false}));
  }

  render () {

    return (
      <div>
  {this.state.accessGranted ? <Home userDetails= {this.state.userData} token= {this.state.accessToken} /> : <Login/> }
      </div>
      
     
  );
  }

}

export default App;
