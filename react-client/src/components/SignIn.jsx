import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import GoogleButton from 'react-google-button'
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {
  indigo500,
} from 'material-ui/styles/colors';

const styles = {
  titleStyle: {
    top: 'auto',
    right: 'auto',
    left: 50,
    bottom: 'auto',
    position: 'fixed',
  },
  signInStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  googleSignInStyle: {
    textDecoration: 'none',
  },
  whiteTextStyle: {
    color: '#FFF',
  },
  toolbarStyle: {
    backgroundColor: indigo500,
  },
  homeStyle: {
    textDecoration: 'none',
  },
}

const SignIn = () => (
  <div> 
    <MuiThemeProvider>
      <Toolbar
        style = {styles.toolbarStyle}
      >
        <ToolbarGroup firstChild={true} style={styles.titleStyle}>
          <Link to='/'
            style={styles.homeStyle}
          >
            <ToolbarTitle 
            text="Majestic Owls"
            style={styles.whiteTextStyle}
            />
          </Link>
        </ToolbarGroup>
      </Toolbar>
    </MuiThemeProvider>
    <div
      style = {styles.signInStyle} >
      <a href="/auth/google"
        style = {styles.googleSignInStyle}>
        <GoogleButton />
      </a>
    </div>
  </div>
)

export default SignIn;