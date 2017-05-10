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
} from 'react-router-dom'

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
}

const DashBoard = () => (
  <div> 
    <MuiThemeProvider>
      <Toolbar
        style = {styles.toolbarStyle}
      >
        <ToolbarGroup firstChild={true} style={styles.titleStyle}>
          <ToolbarTitle text="Majestic Owls" />
        </ToolbarGroup>
      </Toolbar>
    </MuiThemeProvider>
  </div>
)

export default DashBoard;