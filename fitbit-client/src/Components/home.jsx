import React, { Component } from "react";
import StatsCard from "./StatsCard";
import { Row, Col, Dropdown } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import queryString from "query-string";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPercent, faLevelUpAlt, faLevelDownAlt} from '@fortawesome/free-solid-svg-icons';

const mealUrl = "https://api.fitbit.com/1/user/-/foods/log/date/";
//2019-10-06.json
const foodUrl = "https://api.fitbit.com/1/foods/";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealLog: {},
      dataSummary: [],
      startDate: null
    };
    this.loadData = this.loadData.bind(this);
  }

  renderData() {
    if (this.state.dataSummary === undefined) {
      return <h4>No logs available for that date</h4>
    }
    //  return (
    //    this.state.dataSummary
    // )
    return this.state.dataSummary.map((i) => {
      return (  <Col lg={3} sm={6}> {i} </Col>)
   });
  }

  loadData(date, setDate) {
    this.setState({startDate: setDate})
   // console.log(date);
    let parsed = queryString.parse(window.location.search);
    let access_token = parsed.access_token;

    fetch(mealUrl + date + ".json", {
      headers: { Authorization: "Bearer " + access_token }
    })
      .then(response => response.json())
      .then(data => 
        { 
          let summary =    
         Object.keys(data.summary).map(function(key, index) {
          return ( 
              <StatsCard
            key={key}
            bigIcon={<FontAwesomeIcon icon={faPercent} />}
            statsText={key}
            statsValue={data.summary[key]}
            statsIcon={(parseFloat(data.summary[key]) > 100.0) ? <FontAwesomeIcon icon={faLevelUpAlt}/> : <FontAwesomeIcon icon={faLevelDownAlt}/>}
            statsIconText={(parseFloat(data.summary[key]) > 100.0) ? "Over the limit" : "Under the limit" }
          />
 )
       })
      
      this.setState({dataSummary : summary});
      console.log("state", this.state.dataSummary);
    });
  }

  componentDidMount() {}

  render() {
    return (
      <div className="main-panel" id="main-panel">
        <AdminNavbar data={this.props.userDetails} />
        <div className="content">
          <div className="container">
            <Row>
              <Col lg={4}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Food Filter
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col lg={4}>
                <DatePicker
                  selected={this.state.startDate}
                  onChange={date =>
                    this.loadData(moment(date).format("YYYY-MM-DD"), date)
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select food log date"
                />
              </Col>
            </Row>
            <br></br>
            <Row>
             
              {this.renderData()}
              
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
// data.foods.map(function(logged){
//   return fetch(foodUrl+logged.loggedFood.foodId+".json",
//   {headers : {'Authorization': 'Bearer '+access_token}
// }).then(response => response.json()).then(
//   function(data)
//   {
//     console.log(data);
//   }
// )
// })
