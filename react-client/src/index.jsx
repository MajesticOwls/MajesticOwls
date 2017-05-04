import React from 'react';
import {render} from 'react-dom';
import Search from './components/Search.jsx';
import SignIn from './components/SignIn.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

const signInStyle= {
  top: 10,
  right: 10,
  left: 'auto',
  bottom: 'auto',
  position: 'fixed',
}
const Home = () => (
  <div>
    <div> 
       <MuiThemeProvider>
        <Link to='/sign-in'><RaisedButton 
          label="Sign In" 
          style = {signInStyle} 
          primary={true}
        /></Link>
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
