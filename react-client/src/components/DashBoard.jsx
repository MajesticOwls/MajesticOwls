import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import PlacesToEatCard from './PlacesToEatCard.jsx';
import PlacesToGoCard from './PlacesToGoCard.jsx';

import FlightCard from './FlightCard.jsx';
import FoodCard from './FoodCard.jsx';
import SightsCard from './SightsCard.jsx';
import WeatherCard from './WeatherCard.jsx';
import NavigationCard from './NavigationCard.jsx';
import FlightTimeCard from './FlightTimeCard.jsx';
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
  amberA700,
} from 'material-ui/styles/colors';
import $ from 'jquery';
import SignOutToolBar from './SignOutToolBar.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
var yelpSample = require ('../../../dummyData/yelpSFtop10.js');
var fsSample = require ('../../../dummyData/fsSFtop10.js');

class DashBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      food: [],
      sights: [],
      flight: {},
      flightsArray: [],
      index: 0,
      weather: [],
      location: '',
      placesToEat: [],
      allMarkers: []
    }
    this.searchGoogle = this.searchGoogle.bind(this);
    this.flightSearch = this.flightSearch.bind(this);
    this.databaseFlightSearch = this.databaseFlightSearch.bind(this);
    this.historyChange = this.historyChange.bind(this);
    this.searchFood = this.searchFood.bind(this);
    this.searchWeather = this.searchWeather.bind(this);
    this.getPlacesToGo = this.getPlacesToGo.bind(this);
    this.addToFav = this.addToFav.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  componentDidMount() {
    this.setState({
      location: this.props.location.state.destination
    })
    this.getPlacesToGo();
    // this.databaseFlightSearch();
    // this.searchWeather('San Francisco');
    // this.searchFood('San Francisco');
    // this.searchGoogle('San Francisco');
  }
  
  handleMarkerClick(targetMarker) {
    this.state.allMarkers.map(marker => {
      if (marker === targetMarker){
        marker.markerstate.showInfo = true
        this.setState({marker});
      }
    })
    
  }

  handleMarkerClose(targetMarker) {
    this.state.allMarkers.map(marker => {
      if (marker === targetMarker){
        marker.markerstate.showInfo = false
        this.setState({marker});
      }
    })
  }

  searchGoogle(location) {
    $.get('/sights', {
      location: location
    })
    .done((data) => {
      console.log('places DATA', data);
      this.setState({
        sights: data
      })
    })
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
        flightsArray:data,
        location: data[0].destination
      })
      context.flightSearch(data[0].Airline,data[0].flight,data[0].month,data[0].day,data[0].year);
      context.searchGoogle(data[0].destination);
      context.searchFood(data[0].destination);
      context.searchWeather(data[0].destination);
      console.log('success GET', data);
      })
    .fail(function(err) {
      console.log('failed to GET', err);
    })
  }

  flightSearch(airline, flight, month, day, year) {
    $.get('/flightStatus', {
      airline: airline,
      flight: flight,
      month: month,
      day: day,
      year: year
    })
    .done((data) => {
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
        flightDuration = hours.toString() + ' Hour(s) ' + minutes.toString() + ' Minute(s)';
      } else if (flightDuration <= 60) {
        flightDuration = flightDuration + ' Minute(s)';
      }
      dateOnly = dateOnly[5] === '0' ? (dateOnly.slice(6,7) + '/' + dateOnly.slice(8,10) + '/' + dateOnly.slice(0,4)) : (dateOnly.slice(5,7) + '/' + dateOnly.slice(8,10) + '/' + dateOnly.slice(0,4));
      var obj = {
        departurePort: data.appendix.airports[0].fs,
        arrivalPort: data.appendix.airports[1].fs,
        departureCity: data.appendix.airports[0].city + ', '+data.appendix.airports[0].stateCode,
        arrivalCity: data.appendix.airports[1].city + ',' + data.appendix.airports[1].stateCode,
        leaveTime: newTime,
        flightDuration: flightDuration,
        airline: data.appendix.airlines[0].name,
        leaveDate: dateOnly,
        flightNumber: flight,
      };
      this.setState({
        flight: obj
      });
    });

  }

  historyChange(event, index) {
    this.setState({
      index: index,
    }, function() {
      var flight = this.state.flightsArray[index];
      this.flightSearch(flight.Airline,flight.flight,flight.month,flight.day,flight.year);
      this.searchGoogle(flight.destination);
      this.searchFood(flight.destination);
      this.searchWeather(flight.destination);
    });
  }

  searchFood(location) {
    $.get('/food', {
      location: location
    })
    .done((data) => {
      console.log('FOOD DATA', data);
      this.setState({
        food: data,
        location: location
      })
    })
  }

  searchWeather(location) {
    $.get('/weather', {
      location: location
    })
    .done((data) => {
      console.log('weather DATA', data);      
      this.setState({
        weather: data,
        location: location
      })
    })
  }

  getPlacesToGo(location) {
    var location = this.state.location || 'San Francisco, CA'; 
    console.log('location!!!', location)
    $.get('/getYelp', {location: location})
      .done ( (data) => {
        console.log('data', data);
        
      })
  } 

  addToFav(obj, checked) {
    console.log('obj', obj);

    if (checked) {
      var allMarkers = this.state.allMarkers;
      allMarkers.push({
        markerstate: {
          position: new google.maps.LatLng(obj.coordinates.latitude, obj.coordinates.longitude), 
          showInfo: false, 
          infoContent: obj.name
        },
        name: obj.name
      });
      this.setState({
        allMarkers: allMarkers
      })      
    } else {
      var allMarkers = this.state.allMarkers;
      for (var i=0; i< allMarkers.length; i++){
        if (allMarkers[i].name === obj.name){
          allMarkers.splice(i,1);
        }
      }
      this.setState({
        allMarkers: allMarkers
      })           
    }

    console.log('this.state.allMarkers', this.state.allMarkers)
  }

  render() {
    // console.log(this.state.location)
    const styles = {
      gridList: {
        width: 'auto',
        overflowX:'hidden',
        height: 'auto',
        overflowY:'visible',
        marginLeft: 20,
        marginRight: 20,
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
      hist:{
        top: 50,
        left: 30,
        zIndex: 100,
        position: 'fixed',
      }
    }
    return(
      <div>
        {console.log(fsSample.response.groups[0].items)}
        <SignOutToolBar/>
        <div
          style={styles.gridList}>
          <MuiThemeProvider>
            <SelectField
              floatingLabelText='Trips'
              onChange={this.historyChange}
              value={this.state.index}>
              {this.state.flightsArray.map((index, ind) => {
                return <MenuItem key={ind} value={ind} label={index.Airline + ' ' +index.flight} primaryText={index.Airline + ' ' +index.flight} />
              })}
            </SelectField>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <GridList
              cellHeight={400}
              cols = {3}
              padding = {25}>
              {/*<MuiThemeProvider><WeatherCard weather={this.state.weather} location={this.state.location}/></MuiThemeProvider>*/}
              <MuiThemeProvider><PlacesToGoCard places={fsSample.response.groups[0].items} location={this.state.location} handleFavPlace={this.addToFav}/></MuiThemeProvider>
              <MuiThemeProvider><PlacesToEatCard food={yelpSample.results} location={this.state.location} handleFavFood={this.addToFav}/></MuiThemeProvider>
              {/*<MuiThemeProvider><FlightCard flight={this.state.flight}/></MuiThemeProvider>*/}
              {/*<MuiThemeProvider><FoodCard food={this.state.food}/></MuiThemeProvider>*/}
              {/*<MuiThemeProvider><SightsCard sights={this.state.sights}/></MuiThemeProvider>*/}
              <MuiThemeProvider><NavigationCard 
                markers={this.state.allMarkers} 
                handleMarkerClick = {this.handleMarkerClick}
                handleMarkerClose = {this.handleMarkerClose}
                location={this.state.location} /></MuiThemeProvider>

              {/*<MuiThemeProvider><FlightTimeCard duration={this.state.flightsArray}/></MuiThemeProvider>*/}
            </GridList>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <Link to='/trip'>
              <FloatingActionButton
                style={styles.fab}
                backgroundColor = {amberA700}
                label="Search"><ContentAdd />
              </FloatingActionButton>
            </Link>
          </MuiThemeProvider>
        </div>
      </div>
    )
  }
}

export default DashBoard;
