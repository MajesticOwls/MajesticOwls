import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';


 class FlightCard extends React.Component {
  constructor (props) {
    super(props);
  }


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

    return (
        <div>
        <MuiThemeProvider>
          <Card style={styles.card}>
               <Subheader>Flight Info</Subheader>

               <ul>{this.props.flight.departurePort} | {this.props.flight.departureCity}  TO {this.props.flight.arrivalPort} | {this.props.flight.arrivalCity}</ul>
               <ul>{this.props.flight.leaveTime}</ul>
               <ul>{this.props.flight.airline}</ul>

          </Card>
        </MuiThemeProvider>
        </div>
    )
  }
}


export default FlightCard;
