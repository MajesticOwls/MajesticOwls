import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
<<<<<<< HEAD



 class FlightCard extends React.Component {
  constructor (props) {
    super(props);
  }

=======
import testData from '../../../test/testdata.js';
import $ from 'jquery';


 class FlightCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      departure: null,
      arrival: null,
      leaveTime: null,
      airline: null

    }
  }

  componentWillMount() {
    this.flightSearch();
  }
  flightSearch(airline,flight,month,day,year) {
    return $.getJSON('https://crossorigin.me/https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/102/arr/2017/5/11?appId=a187a7bc&appKey=e276d93bc5207238c1eacdd21bec0653&utc=false')
        .then((data) => {
          console.log('data',data);
          this.setState({
              departure: data.appendix.airports[0].city


          });
        });

      }
>>>>>>> 8c374c551c888065883c5cf8f244df7106cfa3f1

  render() {
    const styles = {
      gridList: {
        width: '100%',
        height: 400,
        overflowY: 'auto',
      },
      card: {
        width: '100%',
        height: 400,
      }
    }
<<<<<<< HEAD
    console.log(this.props.flight);
=======
>>>>>>> 8c374c551c888065883c5cf8f244df7106cfa3f1
    return (
        <div>
        <MuiThemeProvider>
          <Card style={styles.card}>
               <Subheader>Flight Info</Subheader>
<<<<<<< HEAD
               <ul>{this.props.flight.departurePort} | {this.props.flight.departureCity}  TO {this.props.flight.arrivalPort} | {this.props.flight.arrivalCity}</ul>
               <ul>{this.props.flight.leaveTime}</ul>
               <ul>{this.props.flight.airline}</ul>
=======
               <ul>{this.state.departure}</ul>
>>>>>>> 8c374c551c888065883c5cf8f244df7106cfa3f1

          </Card>
        </MuiThemeProvider>
        </div>
    )
  }
}


export default FlightCard;
