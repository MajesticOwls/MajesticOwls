import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import SignOutToolBar from './SignOutToolBar.jsx';
import $ from 'jquery';


class NewTrip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      airline: 'AL',
      flightNumber: '',
      finalDestination: '',
      date:''
    }
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleFlightNumber = this.handleFlightNumber.bind(this);
    this.handleFinalDestination = this.handleFinalDestination.bind(this);
  }
  handleNext () {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev () {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  handleChange (event, index, value) {
    this.setState({airline: value});
  };
  handleDate (event, date) {
    this.setState({date: date});
    console.log('date', date);
  };
  handleFlightNumber (event, flightNumber) {
    this.setState({flightNumber: flightNumber});
  };
  handleFinalDestination (event, address) {
    this.setState({finalDestination: address});
  };
  getStepContent(stepIndex) {
    let DateTimeFormat = global.Intl.DateTimeFormat;
    switch (stepIndex) {
      case 0:
        return (<MuiThemeProvider>
                  <SelectField
                    floatingLabelText='Airline'
                    value={this.state.airline}
                    onChange={this.handleChange}
                  >
                    <MenuItem value='AL' label='Alaska Airlines (AL)' primaryText='Alaska Airlines' />
                    <MenuItem value='AA' label='American Airlines (AA)' primaryText="American Airlines" />
                    <MenuItem value='DL' label='Delta Airlines (DL)' primaryText="Delta Airlines" />
                    <MenuItem value='F9' label='Frontier Airlines (F9)' primaryText='Frontier Airlines' />
                    <MenuItem value='WN' label='Southwest Airlines (WN)' primaryText='Southwest Airlines'/>
                    <MenuItem value='NK' label='Spirit Airlines (NK)' primaryText='Spirit Airlines' />
                    <MenuItem value='UA' label='United Airlines (UA)' primaryText='United Airlines' />
                    <MenuItem value='VX' label='Virgin America (VX)' primaryText='Virgin America' />
                  </SelectField>
                </MuiThemeProvider>
                );
      case 1:
        return (<div>
                  <MuiThemeProvider>
                    <TextField
                      floatingLabelText="Flight Number"
                      onChange={this.handleFlightNumber}
                      hintText="007"
                      floatingLabelFixed={true}
                    />
                  </MuiThemeProvider>
                  <MuiThemeProvider>
                    <Divider />
                  </MuiThemeProvider>
                  <MuiThemeProvider>
                    <DatePicker
                      onChange={this.handleDate}
                      hintText="Flight Date"
                      firstDayOfWeek={0}
                      formatDate={new DateTimeFormat('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }).format}/>
                  </MuiThemeProvider>
                </div>
                );
      case 2:
        return (<MuiThemeProvider>
                  <TextField
                    floatingLabelText="Destination Address"
                    onChange={this.handleFinalDestination}
                    hintText="944 Market Street San Francisco"
                    floatingLabelFixed={true}
                  />
                </MuiThemeProvider>
                );
      default:
        return 'You\'ve somehow found a bug in our code, well done!';
    }
  };


saveData() {
  var context = this;
  console.log(context.state.airline);
    $.ajax({
      type: 'POST',
      url: '/database/save',
      contentType: 'application/JSON',
      data: JSON.stringify({
          airline: context.state.airline,
          flightNumber: context.state.flightNumber,
          finalDestination: context.state.finalDestination,
          date: context.state.date
            })
          })
          .done(function(data) {

          console.log('POST Successful');
          })
          .fail(function(err) {
          console.error('POST failed');
        })
  };

  render () {
    const {finished, stepIndex} = this.state;
    const styles = {
      contentStyle: {
        margin: '0 16px',
      },
    }
    return (
      <div>
        <SignOutToolBar/>
        <div style={{width: '100%', maxWidth: 800, margin: 'auto'}}>
          <MuiThemeProvider>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>Select Airline</StepLabel>
              </Step>
              <Step>
                <StepLabel>Choose Flight # & Date</StepLabel>
              </Step>
              <Step>
                <StepLabel>Add Final Destination Address</StepLabel>
              </Step>
            </Stepper>
          </MuiThemeProvider>
          <div style={styles.contentStyle}>
<<<<<<< HEAD
            {finished ? ( this.saveData() ||
              <Redirect push to="/dashboard" />) : (
=======
            {finished ? (
              // do shit here
              <Redirect push to="/dashboard" />
            ) : (
>>>>>>> 1bc20011748826bc7433c738d336c47aed9fed8d
              <div>
                {this.getStepContent(stepIndex)}
                <div style={{marginTop: 12}}>
                  <MuiThemeProvider>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                      style={{marginRight: 12}}
                    />
                  </MuiThemeProvider>
                  <MuiThemeProvider>
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary={true}
                      onClick={this.handleNext}
                    />
                  </MuiThemeProvider>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NewTrip;
