import React from 'react';
import {render} from 'react-dom';
import Search from './components/Search.jsx';
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
          label="Sign In" style = {signInStyle} primary={true}
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

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/sign-in" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

render(<App/>, document.getElementById('app'));
