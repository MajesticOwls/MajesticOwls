import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import PlacesToEatCard from './PlacesToEatCard.jsx';
import PlacesToGoCard from './PlacesToGoCard.jsx';
import NavigationCard from './NavigationCard.jsx';
import ItinList from './ItinList.jsx';

import FlightCard from './FlightCard.jsx';
import FoodCard from './FoodCard.jsx';
import WeatherCard from './WeatherCard.jsx';
import FlightTimeCard from './FlightTimeCard.jsx';
import SignOutToolBar from './SignOutToolBar.jsx';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {GridList, GridTile} from 'material-ui/GridList';
import GoogleButton from 'react-google-button';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {
  amberA700,
} from 'material-ui/styles/colors';
import $ from 'jquery';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

var yelpSample = require ('../../../dummyData/yelpSFtop10.js');

class DashBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      food: [],
      sights: [],
      flight: {},
      flightsArray: [],
      savedCities: [],
      index: 0,
      weather: [],
      location: '',
      newLocation: '',
      placesToEat: [],
      placesToGo: [],
      allMarkers: [],
      itineraryItems:[],
      coordinates: { lat: 37.77493, lng: -122.41942 },
      cardsList: [],
      cardsViews: [],
      activeCheckboxesMap: [],
      activeCheckboxesItinerary: []
    }
    this.searchGoogle = this.searchGoogle.bind(this);
    this.flightSearch = this.flightSearch.bind(this);
    this.databaseFlightSearch = this.databaseFlightSearch.bind(this);
    this.historyChange = this.historyChange.bind(this);
    this.getSavedCities = this.getSavedCities.bind(this);
    this.savedCitiesClick = this.savedCitiesClick.bind(this);
    this.searchFood = this.searchFood.bind(this);
    this.searchWeather = this.searchWeather.bind(this);
    this.getPlacesToGo = this.getPlacesToGo.bind(this);
    this.getPlacesToEat = this.getPlacesToEat.bind(this);
    this.addToFav = this.addToFav.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
    this.fetch = this.fetch.bind(this);
    this.savelocation = this.savelocation.bind(this);
    this.addToItinerary = this.addToItinerary.bind(this);
    this.clearItineraryAndCheckboxes = this.clearItineraryAndCheckboxes.bind(this);
    this.renderWeather = this.renderWeather.bind(this);
    this.renderFood = this.renderFood.bind(this);
    this.renderItin = this.renderItin.bind(this);
    this.renderPlaces = this.renderPlaces.bind(this);
    this.renderMap = this.renderMap.bind(this);
    this.toggleWeather = this.toggleWeather.bind(this);
    this.toggleFood = this.toggleFood.bind(this);
    this.togglePlaces = this.togglePlaces.bind(this);
    this.toggleItin = this.toggleItin.bind(this);
    this.toggleMap = this.toggleMap.bind(this);

  }

  componentDidMount() {
    this.setState({
      location: this.props.location.state.destination
    }, () => {
      // creates the destination into the database 
      this.savelocation();
      console.log('STATE AFTER DID MOUNT', this.state.location)
      this.getSavedCities(this.state.location);
    })

  }
  
  savelocation(){
    $.get('/savelocation', { location: this.state.location })
       .then((data) => {
          this.fetch(this.state.location);  
       }) 
       .catch((err) => {
          console.log(err)
       })
  }

  toggleWeather() {
    const cards = this.state.cardsList
    const cardsViews = this.state.cardsViews;
    let weatherIndex = cards.indexOf('weather'); 
    if (weatherIndex >= 0) {
      cards.splice(weatherIndex, 1)
      cardsViews.pop()
      this.setState(prevState => ({
        cardsList: cards
      }))

    } else {
      cards.push('weather');
      cardsViews.push(this.renderWeather);
      this.setState(prevState => ({
        cardsList: cards
      }))
    }
    
  }

  toggleFood() {
    const cards = this.state.cardsList
    const cardsViews = this.state.cardsViews;    
    let foodIndex = cards.indexOf('food');
    if (foodIndex >= 0) {
      cards.splice(foodIndex, 1)
      cardsViews.pop()
      this.setState(prevState => ({
        cardsList: cards
      }))

    } else {
      cards.push('food');
      cardsViews.push(this.renderFood);
      this.setState(prevState => ({
        cardsList: cards
      }))
    }
    
  }

  togglePlaces() {
    const cards = this.state.cardsList
    const cardsViews = this.state.cardsViews;    
    let placesIndex = cards.indexOf('places');
    if (placesIndex >= 0) {
      cards.splice(placesIndex, 1)
      cardsViews.pop()
      this.setState(prevState => ({
        cardsList: cards
      }))

    } else {
      cards.push('places');
      cardsViews.push(this.renderPlaces);
      this.setState(prevState => ({
        cardsList: cards
      }))
    }
    
  }

  toggleItin() {
    const cards = this.state.cardsList
    const cardsViews = this.state.cardsViews;    
    let itinIndex = cards.indexOf('itin');
    if (itinIndex >= 0) {
      cards.splice(itinIndex, 1)
      cardsViews.pop()
      this.setState(prevState => ({
        cardsList: cards
      }))

    } else {
      cards.push('itin');
      cardsViews.push(this.renderItin);
      this.setState(prevState => ({
        cardsList: cards
      }))
    }
    
  }

  toggleMap() {
    const cards = this.state.cardsList
    const cardsViews = this.state.cardsViews;    
    let mapIndex = cards.indexOf('map');
    if (mapIndex >= 0) {
      cards.splice(mapIndex, 1)
      cardsViews.pop()
      this.setState(prevState => ({
        cardsList: cards
      }))

    } else {
      cards.push('map');
      cardsViews.push(this.renderMap);
      this.setState(prevState => ({
        cardsList: cards
      }))
    }
    
  }

  fetch(location) {
    // this.searchWeather(location);    
    // this.searchFood(location);
    // this.searchGoogle(location);
    this.getPlacesToGo(location);
    this.getPlacesToEat(location);
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

  getSavedCities(location){
    $.get('/getAllSavedCities', { location: location })
       .done((data) => {
        var savedCities = [];
        for(var i=0; i<data.length; i++) {
          savedCities.push(data[i].destination);
        }
        var index = savedCities.indexOf(location);
        this.setState({
          savedCities: savedCities,
          index: index
        })
      }) 
  }

  savedCitiesClick(e, index) {
    e.preventDefault();
    var target = this.state.savedCities[index]
    this.setState({
      index: index,
      location: target
    }, function() {
      this.savelocation();
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
    var location = location || 'San Francisco, CA'; 
    $.get('/getFourSquare', {location: location})
      .then ( (data) => {
        var top10 = JSON.parse(data).response.groups[0].items
        // console.log('FourSquare API RESULT', top10);
        this.setState({
          placesToGo: top10
        })        
      })
      .then(() => {
        $.get('/getCityCoords', {location: location})
          .done ( (data) => {
            // console.log('GET COORDS', data);
            this.setState({
              coordinates: data
            })        
          })
      })
  } 

  getPlacesToEat(location) {
    var location = location || 'San Francisco, CA'; 
    console.log(location, "PLACES TO EAT LOCATION")
    $.get('/getYelp', {location: location})
      .done ( (data) => {
        // console.log('YELP API RESULT', data);
        this.setState({
          placesToEat: data
        })
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


  handleLocationChange(e) {
    // console.log(e.target.value)
    this.setState({newLocation: e.target.value});
  }

  handleLocationSubmit(e) {
    e.preventDefault();
    // location.reload();
    this.setState({location: this.state.newLocation.toLowerCase()}, () => {
      // ReactDOM.findDOMNode(this.refs.form).reset();
      console.log('A New Location was submitted: ' + this.state.location);    
      this.savelocation();
      this.clearItineraryAndCheckboxes();      
      this.getSavedCities(this.state.location);      
    })
  }

  clearItineraryAndCheckboxes() {
    this.setState({
      itineraryItems: [],
      activeCheckboxesMap: [],
      activeCheckboxesItinerary: []
    });  
    console.log('itineray :', this.state.itineraryItems)
  }

  addToItinerary(obj, checked) {
    console.log('object!!!', obj)
    var itineraryItems = this.state.itineraryItems;
    if (checked) {
      itineraryItems.push(obj);
      this.setState({
        itineraryItems: itineraryItems
      })
    } else {
      for (var i=0; i < itineraryItems.length; i++) {
        if (itineraryItems[i].name === obj.name) {
          itineraryItems.splice(i, 1);
        }
      }
      this.setState({
        itineraryItems: itineraryItems
      })
    } 
  }

  renderWeather() {
    return <MuiThemeProvider><WeatherCard weather={this.state.weather} location={this.state.location}/></MuiThemeProvider>   
  }

  renderFood() {
    return <MuiThemeProvider><PlacesToEatCard food={this.state.placesToEat} location={this.state.location} handleFavFood={this.addToFav} addToItinerary={this.addToItinerary}/></MuiThemeProvider>      
  }

  renderPlaces() {
    return <MuiThemeProvider><PlacesToGoCard sights = {this.state.placesToGo} location={this.state.location} addToItinerary={this.addToItinerary} addToMaps={this.addToFav}/></MuiThemeProvider>
  }

  renderItin() {
    return <MuiThemeProvider><ItinList itinItems={this.state.itineraryItems}/></MuiThemeProvider>
  }

  renderMap() {
    return (<MuiThemeProvider><NavigationCard 
                markers={this.state.allMarkers} 
                handleMarkerClick = {this.handleMarkerClick}
                handleMarkerClose = {this.handleMarkerClose}
                coordinates={this.state.coordinates}
                location={this.state.location} />
              </MuiThemeProvider>)
  }

  render() {
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
      hist: {
        top: 50,
        left: 30,
        zIndex: 100,
        position: 'fixed',
      },
      center: {
        width: "800px",
        margin: "0 auto"
      }
    }


    return(
      <div>
        <SignOutToolBar weather={this.toggleWeather} food={this.toggleFood} places={this.togglePlaces} itin={this.toggleItin} map={this.toggleMap} />
        
        <div style={styles.gridList}>
          <MuiThemeProvider>
            <GridList
            cellHeight={80}
            cols = {3}
            padding = {25}>

            <MuiThemeProvider>
              <SelectField
                floatingLabelText='Past Cities'
                onChange={this.savedCitiesClick}
                value={this.state.index}
              >
                {this.state.savedCities.map((city, i) => {
                  return <MenuItem key={i} value={i} label={city} primaryText={city} />
                })}
              </SelectField>
            </MuiThemeProvider>

            <MuiThemeProvider>
              <form onSubmit={this.handleLocationSubmit} ref="form">
                <MuiThemeProvider>
                  <TextField hintText="Enter Location" floatingLabelText="Change Location" onChange={this.handleLocationChange} floatingLabelFixed={true}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <FlatButton label="Submit" onClick={this.handleLocationSubmit} />
                </MuiThemeProvider>
              </form>
            </MuiThemeProvider>

            </GridList>
          </MuiThemeProvider>
        </div>

        <div
          style={styles.gridList}>
          <MuiThemeProvider>
            <GridList
              cellHeight={400}
              cols = {3}
              padding = {25}
            >
              {/*<MuiThemeProvider><WeatherCard weather={this.state.weather} location={this.state.location}/></MuiThemeProvider>*/}
              <MuiThemeProvider><PlacesToEatCard food={this.state.placesToEat} location={this.state.location} handleFavFood={this.addToFav} addToItinerary={this.addToItinerary} activeCheckboxesMap={this.state.activeCheckboxesMap} activeCheckboxesItinerary={this.state.activeCheckboxesItinerary}/></MuiThemeProvider>
              <MuiThemeProvider><PlacesToGoCard sights = {this.state.placesToGo} location={this.state.location} addToItinerary={this.addToItinerary} addToMaps={this.addToFav} activeCheckboxesMap={this.state.activeCheckboxesMap} activeCheckboxesItinerary={this.state.activeCheckboxesItinerary}/></MuiThemeProvider>
              <MuiThemeProvider><NavigationCard 
                markers={this.state.allMarkers} 
                handleMarkerClick = {this.handleMarkerClick}
                handleMarkerClose = {this.handleMarkerClose}
                coordinates={this.state.coordinates}
                location={this.state.location} />
              </MuiThemeProvider>

              {/*<MuiThemeProvider><FlightCard flight={this.state.flight}/></MuiThemeProvider>*/}
              {/*<MuiThemeProvider><FoodCard food={this.state.food}/></MuiThemeProvider>*/}
              {/*<MuiThemeProvider><FlightTimeCard duration={this.state.flightsArray}/></MuiThemeProvider>*/}
            </GridList>

          </MuiThemeProvider>

          <MuiThemeProvider>
            <GridList
              cellHeight={180}
              cols = {1}
              padding = {25}
            >            
              <MuiThemeProvider><ItinList itinItems={this.state.itineraryItems}/></MuiThemeProvider>
            </GridList>
          </MuiThemeProvider>
          {/*<MuiThemeProvider>
            <Link to='/trip'>
              <FloatingActionButton
                style={styles.fab}
                backgroundColor = {amberA700}
                label="Search"><ContentAdd />
              </FloatingActionButton>
            </Link>
          </MuiThemeProvider>*/}
        </div>
        <br/>
            <div 
              style={styles.gridList}>
              <MuiThemeProvider>
              <GridList
                cellHeight={400}
                col={1}
                padding={25}
                
              >
                {this.state.cardsViews.length ? this.state.cardsViews.map(card => (
                  <MuiThemeProvider>
             
                  <GridTile> 
                    <div>
                      {card()}
                    </div>
                  </GridTile>
                  </MuiThemeProvider>
                )) : <MuiThemeProvider>{null}</MuiThemeProvider>}
              </GridList>
              </MuiThemeProvider>
            </div>
      </div>
    )
  }
}

export default DashBoard;
