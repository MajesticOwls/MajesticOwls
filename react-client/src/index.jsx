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
        top:15,
        right: 30,
        left:'auto',
        bottom: 'auto',
        position:'fixed',
      },
      toolbarStyle: {
        backgroundColor: '#FFF',
      },
    }

    const Home = () => (
      <div>
          <MuiThemeProvider>
            <Toolbar
              style = {styles.toolbarStyle}>
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
