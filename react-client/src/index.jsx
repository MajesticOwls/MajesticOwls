import React from 'react';
import {render} from 'react-dom';
import Search from './components/Search.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchFlight = this.searchFlight.bind(this);
    this.searchAddress = this.searchAddress.bind(this);
    this.dropDownSelect = this.dropDownSelect.bind(this);
    this.state = { 
      trips: [],
    }
  }

  searchFlight (flight) {

  }

  searchAddress (address) {

  }

  dropDownSelect (trip) {

  }


  render () {
    return (
      <div> 
         <MuiThemeProvider>
          <a href = '/auth/google'><RaisedButton 
            label="Sign in with Google" primary={true}
          /></a>
        </MuiThemeProvider>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
