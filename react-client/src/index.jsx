import React from 'react';
import {render} from 'react-dom';
import Search from './components/Search.jsx';
import SignIn from './components/SignIn.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
  signInStyle: {
    top:15,
    right: 30,
    left:'auto',
    bottom: 'auto',
    position:'fixed',
  }
}

const Home = () => (
  <div>
    <div> 
      <MuiThemeProvider>
        <Toolbar>
          <ToolbarGroup firstChild={true} style={styles.titleStyle}>
            <ToolbarTitle text="Majestic Owls" />
          </ToolbarGroup>
          <ToolbarGroup style={styles.signInStyle}>
            <Link to='/sign-in'>
              <FlatButton 
                label="Sign In"
              />
            </Link>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>
    </div>
  </div>
)

const About = () => (
  <div>
    <h2>Sign-In</h2>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/sign-in" component={SignIn}/>
    </div>
  </Router>
)

render(<App/>, document.getElementById('app'));
