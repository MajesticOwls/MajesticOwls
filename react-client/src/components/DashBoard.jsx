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

class DashBoard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
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
            <MuiThemeProvider><FlightCard/></MuiThemeProvider>
            <MuiThemeProvider><FoodCard/></MuiThemeProvider>
            <MuiThemeProvider><SightsCard/></MuiThemeProvider>
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
