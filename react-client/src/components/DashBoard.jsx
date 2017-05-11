import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
<<<<<<< HEAD
import FlightCard from './FlightCard.jsx';
import FoodCard from './FoodCard.jsx';
import SightsCard from './SightsCard.jsx';
import WeatherCard from './WeatherCard.jsx';
import GridList from 'material-ui/GridList';
=======
>>>>>>> dad7396fcb2452827e215ab8c20107d6d6223845
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

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
      toolbarStyle: {
        backgroundColor: '#FFF',
      },
      gridList: {
        width: 'auto',
        height: 'auto',
        overflowY: 'auto',
      },
      signOutStyle: {
        top:15,
        right: 30,
        left:'auto',
        bottom: 'auto',
        position:'fixed',
      },
    }
    return(
      <div>
        <MuiThemeProvider>
          <Toolbar
            style = {styles.toolbarStyle}>
            <ToolbarGroup firstChild={true} style={styles.titleStyle}>
              <ToolbarTitle text="Majestic Owls" />
            </ToolbarGroup>
            <ToolbarGroup style={styles.signOutStyle}>
              <Link to='/'>
                <FlatButton
                  label="Sign Out"
                />
              </Link>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <GridList
            cellHeight={400}
            cols = {6}
            style={styles.gridList}
          >

<<<<<<< HEAD
          </GridList>
        </MuiThemeProvider>
      </div>
    )
  }
}

=======
const DashBoard = () => (
  <div>

    <MuiThemeProvider>
      <Toolbar
        style = {styles.toolbarStyle}>
        <ToolbarGroup firstChild={true} style={styles.titleStyle}>
          <ToolbarTitle text="Majesti" />
        </ToolbarGroup>
        <ToolbarGroup style={styles.signOutStyle}>
          <Link to='/'>
            <FlatButton
              label="Sign Out"
            />
          </Link>
        </ToolbarGroup>
      </Toolbar>
    </MuiThemeProvider>
    <MuiThemeProvider>
      <GridList
        cellHeight={400}
        cols = {6}
        style={styles.gridList}
      >
      </GridList>
    </MuiThemeProvider>
  </div>
)



>>>>>>> dad7396fcb2452827e215ab8c20107d6d6223845
export default DashBoard;
