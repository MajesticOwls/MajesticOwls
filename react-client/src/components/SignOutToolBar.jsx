import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {
  indigo500,
} from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import LocationForm from './LocationForm.jsx';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FontIcon from 'material-ui/FontIcon';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';



class SignOutToolBar extends React.Component {
  constructor(props) {
    super(props);

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
        zIndex: 1000,
      },
      homeStyle: {
        textDecoration: 'none',
      },
    }
    return (
      <div>
        <MuiThemeProvider>
          <Toolbar
            style = {styles.toolbarStyle}>
            <ToolbarGroup firstChild={true} style={styles.titleStyle}>
              <Link to='/'
                style={styles.homeStyle}
              >
                <ToolbarTitle
                text="Via·tor"
                style={styles.whiteTextStyle}
                />
              </Link>
            </ToolbarGroup>
            <ToolbarGroup style={styles.signOutStyle}>
              <Link to='/'>
                <FlatButton
                  style={styles.whiteTextStyle}
                  label="SIGN OUT"
                />
              </Link>
              <IconMenu
                iconButtonElement={<IconButton touch={true}><ContentFilter /></IconButton>}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <List>
                  <Subheader>Card Filter</Subheader>
                  <ListItem
                    value="1"
                    leftCheckbox={<Checkbox onCheck={this.props.weather} />}
                    primaryText="Weather"
                    secondaryText="Toggle Weather"
                  />
                  <ListItem
                    value="2"
                    leftCheckbox={<Checkbox onCheck={this.props.food} />}
                    primaryText="Food"
                    secondaryText="View top 10 places to eat"
                  />
                  <ListItem
                    value="3"
                    leftCheckbox={<Checkbox onCheck={this.props.places} />}
                    primaryText="Places"
                    secondaryText="View top 10 places to visit"
                  />
                  <ListItem
                    value="4"
                    leftCheckbox={<Checkbox onCheck={this.props.map} />}
                    primaryText="Map"
                    secondaryText="View map"
                  />
                  <ListItem
                    value="5"
                    leftCheckbox={<Checkbox onCheck={this.props.itin} />}
                    primaryText="Itinerary"
                    secondaryText="Plan your trip with the itinerary"
                  />
                </List>
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default SignOutToolBar;
