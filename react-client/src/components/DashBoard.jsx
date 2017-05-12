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
  indigo500,
  amber500,
} from 'material-ui/styles/colors';
import $ from 'jquery';

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
    $.getJSON('https://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?query=new+york+city+point+of+interest&language=en&key=' + require('../config/config').GOOGLE_KEY)
      .then((data) => {
        console.log('data', data);
        this.setState({
          sights: data.results
        })
      });
  }

  flightSearch(airline,flight,month,day,year) {
    return $.getJSON('https://crossorigin.me/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/102/arr/2017/5/11?appId=' + config.FLIGHTSTATUS.API_KEY + '&appKey=' + config.FLIGHTSTATUS.APP_KEY + '&utc=false')
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

  componentDidMount() {
    this.searchGoogle();
    this.flightSearch();
  }

  searchYelp(location) {
    $.ajax({
      url: 'https://api.yelp.com/v3/businesses/search',
      type: 'GET',
      data: {
        term: 'food',
        location: this.props.location || 'San Francisco',
        sort_by: 'rating'
      },
      headers: {
        Authorization: `Bearer ${process.env.YELP_TOKEN || require('../config/config').YELP_TOKEN}`
      }
    })
    .done((data) => {
      this.setState({
        food: data
      })
      console.log(data);
    });
  }

  render() {
    const styles = {
      titleStyle: {
        top: 'auto',
        right: 'auto',
        left: 50,
        bottom: 'auto',
        position: 'fixed',
      },
      gridList: {
        width: 'auto',
        height: 'auto',
        overflowY: 'auto',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
      },
      signOutStyle: {
        top:10,
        right: 30,
        left:'auto',
        bottom: 'auto',
        position:'fixed',
      },
      whiteTextStyle: {
        color: '#FFF',
      },
      toolbarStyle: {
        backgroundColor: indigo500,
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
      homeStyle: {
        textDecoration: 'none',
      },
    }
    return(
      <div>
        <MuiThemeProvider>
          <Toolbar
            style = {styles.toolbarStyle}>
            <ToolbarGroup firstChild={true} style={styles.titleStyle}>
              <Link to='/'
                style={styles.homeStyle}
              >
                <ToolbarTitle
                text="Flighty McFlightFace"
                style={styles.whiteTextStyle}
                />
              </Link>
            </ToolbarGroup>
            <ToolbarGroup style={styles.signOutStyle}>
              <Link to='/'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="Sign Out"
                />
              </Link>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <GridList
            cellHeight={400}
            cols = {3}
            style={styles.gridList}
          >
            <MuiThemeProvider><WeatherCard/></MuiThemeProvider>
            <MuiThemeProvider><FlightCard flight={this.state.flight}/></MuiThemeProvider>
            <MuiThemeProvider><FoodCard food={this.food}/></MuiThemeProvider>
            <MuiThemeProvider><SightsCard sights={this.state.sights}/></MuiThemeProvider>
          </GridList>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <FloatingActionButton
            style={styles.fab}
            backgroundColor = {amber500}
            label="Search"><ContentAdd />
          </FloatingActionButton>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default DashBoard;
