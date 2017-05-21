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

const SignOutToolBar = () => (
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
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
        {/*<ToolbarGroup> 
          <FontIcon className="muidocs-icon-custom-sort" />
          <form> 
            <input type="text" style={styles.signOutStyle} placeholder="Enter Location" />
  
          </form> 
        </ToolbarGroup> */}
      </Toolbar>
    </MuiThemeProvider>
  </div>
)
export default SignOutToolBar;