import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FlightCard from './FlightCard.jsx';
import FoodCard from './FoodCard.jsx';
import SightsCard from './SightsCard.jsx';
import WeatherCard from './WeatherCard.jsx';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
      flight: {},
      flightsArray:[]
    }
    this.searchGoogle = this.searchGoogle.bind(this);
    this.flightSearch = this.flightSearch.bind(this);
    this.databaseFlightSearch = this.databaseFlightSearch.bind(this);
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

  databaseFlightSearch() {
    var context = this;
    $.ajax({
      type: 'GET',
      url: '/database/return',
      datatype: 'json'
    })
    .done(function(data) {
      context.setState({
        flightsArray:data
      })
      context.flightSearch(data[0].Airline,data[0].flight,data[0].month,data[0].day,data[0].year);
      console.log('success GET', data);
      })
    .fail(function(err) {
      console.log('failed to GET', err);
    })
  }
  flightSearch(airline,flight,month,day,year) {

    console.log(airline);
    console.log(flight);
    console.log(month);
    console.log(day);
    console.log(year);
    console.log('https://crossorigin.me/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/'+airline+'/'+flight+'/arr/'+year+'/'+day+'/'+month+'?appId=' + require('../config/config').FLIGHTSTATUS.API_KEY + '&appKey=' + require('../config/config').FLIGHTSTATUS.APP_KEY + '&utc=false');
    return $.getJSON('https://crossorigin.me/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/'+airline+'/'+flight+'/arr/'+year+'/'+day+'/'+month+'?appId=' + require('../config/config').FLIGHTSTATUS.API_KEY + '&appKey=' + require('../config/config').FLIGHTSTATUS.APP_KEY + '&utc=false')
        .then((data) => {
          console.log('data',data);
          var dateTime = data.flightStatuses[0].departureDate.dateLocal;
          var newTime;
          var dateOnly;
          var hours;
          var minutes;
          var count = 0;
        for (var i = 0; i < dateTime.length; i++) {
          if (dateTime[i] === 'T') {
            dateOnly = dateTime.slice(0,i);
            newTime =dateTime.slice(i+1,dateTime.length);
          }
        }
            hours = newTime.slice(0,2);
            minutes = newTime.slice(3,5);

          hours = Number(hours);

          if (hours > 12) {

              newTime = (Math.floor(hours - 12)).toString()+ ':' + minutes + ' PM'
          } else {

              newTime = hours.toString() + ':'+ minutes + ' AM'
          }

          var flightDuration = data.flightStatuses[0].flightDurations.scheduledAirMinutes;

          if (flightDuration > 60) {
            hours = Math.floor(flightDuration / 60);
            minutes = flightDuration - (hours * 60);

            flightDuration = hours.toString() + ' Hour(s) ' + minutes.toString() + ' Minutes(s)'
          }

          dateOnly = dateOnly.slice(8,10) + '-' + dateOnly.slice(5,7) + '-' + dateOnly.slice(0,4);

          var obj = {
              departurePort: data.appendix.airports[0].fs,
              arrivalPort: data.appendix.airports[1].fs,
              departureCity: data.appendix.airports[0].city + ', '+data.appendix.airports[0].stateCode,
              arrivalCity: data.appendix.airports[1].city + ',' + data.appendix.airports[1].stateCode,
              leaveTime: newTime,
              flightDuration: flightDuration,
              airline: data.appendix.airlines[0].name,
              leaveDate: dateOnly

            };

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
    // this.searchGoogle();
    this.databaseFlightSearch();
    // this.searchFood();
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
