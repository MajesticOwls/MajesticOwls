import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn.jsx';
import DashBoard from './components/DashBoard.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import {
  indigo500,
} from 'material-ui/styles/colors';


class App extends React.Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {

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
      signInStyle: {
        top: 10,
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
      homeStyle: {
        textDecoration: 'none',
      },
    }

    const Home = () => (
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
              <ToolbarGroup style={styles.signInStyle}>
                <Link to='/sign-in'>
                  <FlatButton
                    style={styles.whiteTextStyle}
                    label="Sign In"
                  />
                </Link>
              </ToolbarGroup>
            </Toolbar>
          </MuiThemeProvider>
      </div>
    )

    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/sign-in" component={SignIn}/>
          <Route path="/dashboard" component={DashBoard}/>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
