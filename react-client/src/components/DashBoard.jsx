import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FlightCard from './FlightCard.jsx';
import FoodCard from './FoodCard.jsx';
import SightsCard from './SightsCard.jsx';
import WeatherCard from './WeatherCard.jsx';
import GridList from 'material-ui/GridList';
import GoogleButton from 'react-google-button';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {
  amber500,
} from 'material-ui/styles/colors';
import $ from 'jquery';
import SignOutToolBar from './SignOutToolBar.jsx'

class DashBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      food: [],
      sights: [],
      flight: {}
    }
    this.searchGoogle = this.searchGoogle.bind(this);
    this.flightSearch = this.flightSearch.bind(this);
  }

  searchGoogle(location) {
    $.getJSON('https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?query=new+york+city+point+of+interest&language=en&key=' + (process.env.GOOGLE_KEY || require('../config/config').GOOGLE_KEY))
      .then((data) => {
        console.log('data', data);
        this.setState({
          sights: data.results
        })
      });
  }

  flightSearch(airline,flight,month,day,year) {
    return $.getJSON('https://crossorigin.me/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/102/arr/2017/5/11?appId=' + (process.env.FLIGHT_API_KEY || require('../config/config').FLIGHTSTATUS.API_KEY) + '&appKey=' + (process.env.FLIGHT_APP_KEY || require('../config/config').FLIGHTSTATUS.APP_KEY) + '&utc=false')
        .then((data) => {
          console.log('data',data);
            var obj = {
              departurePort: data.appendix.airports[0].fs,
              arrivalPort: data.appendix.airports[1].fs,
              departureCity: data.appendix.airports[0].city,
              arrivalCity: data.appendix.airports[1].city,
              leaveTime: data.flightStatuses[0].departureDate.dateLocal,
              airline: data.appendix.airlines[0].name
            };
            console.log('obj', obj)
          this.setState({
              flight: obj
          });
        });

      }

  searchFood(location) {
    $.get('https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json', {
      key: process.env.GOOGLE_KEY || require('../config/config').GOOGLE_KEY,
      query: location || 'San Francisco',
      type: 'restaurant'
    })
    .done((data) => {
      this.setState({
        food: data.results
      })
    });
  }

  componentDidMount() {
    this.searchGoogle();
    this.flightSearch();
    this.searchFood();
  }

  render() {
    const styles = {
      gridList: {
        width: 'auto',
        height: 'auto',
        overflowY: 'auto',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
      },
      fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        zIndex: 100,
        position: 'fixed',
      },
    }
    return(
      <div>
        <SignOutToolBar/>
        <MuiThemeProvider>
          <GridList
            cellHeight={400}
            cols = {3}
            style={styles.gridList}
            padding = {25}
          >
            <MuiThemeProvider><WeatherCard/></MuiThemeProvider>
            <MuiThemeProvider><FlightCard flight={this.state.flight}/></MuiThemeProvider>
            <MuiThemeProvider><FoodCard food={this.state.food}/></MuiThemeProvider>
            <MuiThemeProvider><SightsCard sights={this.state.sights}/></MuiThemeProvider>
          </GridList>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Link to='/trip'>
            <FloatingActionButton
              style={styles.fab}
              backgroundColor = {amber500}
              label="Search"><ContentAdd />
            </FloatingActionButton>
          </Link>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default DashBoard;
