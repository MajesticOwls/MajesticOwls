import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Redirect} from 'react-router';
import $ from 'jquery';

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    console.log('A location was submitted: ' + this.state.value);
    e.preventDefault();
    this.setState({
      submitted: true
    })
  }

  render() {
    const styles = {
      subHeader: {
        fontFamily: "'Roboto', sans-serif",
        fontSize: '36px'
      },
      button: {
        backgroundColor: '#4CAF50',
        borderRadius: '8px',
        border: 'none',
        color: 'white',
        padding: '15px',
        textAlign: 'center',
        textDecoration: "none",
        display: 'inline-block',
        fontSize: '16px'
      }      
    }
    const {submitted} = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input style={styles.subHeader} type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter Location" />
          <br/>
          <input style={styles.button} type="submit" value="Submit" />
        </form>
        {submitted ? <Redirect to={{
                            pathname: "/dashboard",
                            state: {destination: this.state.value}
                          }} /> : null }
      </div>
    );
  }
}

export default LocationForm;
