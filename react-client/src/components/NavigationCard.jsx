import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MapNavigation from 'material-ui/svg-icons/maps/navigation';
import Avatar from 'material-ui/Avatar';
import Arrow from 'material-ui/svg-icons/navigation/arrow-forward';
import Divider from 'material-ui/Divider';
import {
  grey500, white, deepPurple500,
} from 'material-ui/styles/colors';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import FlatButton from 'material-ui/FlatButton';
import ComboMap from './ComboMap.jsx';
import $ from 'jquery';


 class NavigationCard extends React.Component {
  constructor (props) {
    super(props);

  }

  render() {
    const styles = {
      card: {
        width: '100%',
        height: 400,
      },
      avatar: {
        backgroundColor: deepPurple500,
      },
      cardHeader: {
        height: '20%',
      },
      center: {
        lat: 37.7749,
        lng: -122.42,
      },
      map: {
        height: '68%',
      },
      actions: {
        height: '20%',
      }
    }

    return (
      <div>
        <Card
          style={styles.card}>
          <CardHeader
              title='Map'
              subtitle='Your Restaurants + Places'
              avatar={<Avatar icon={<MapNavigation />}
                style={styles.avatar}
                color={white}/>}
              style={styles.cardHeader}/>
              <Divider/>
              <div
                style={styles.map}>
               
                <ComboMap 
                  containerElement={
                    <div style={{ height: `105%` }} />
                  }
                  mapElement={
                    <div style={{ height: `110%` }} />
                  }
                  center={this.props.coordinates}
                  markers={this.props.markers} onMarkerClick={this.props.handleMarkerClick} onMarkerClose={this.props.handleMarkerClose} />

              </div>
        </Card>
      </div>
    )
  }
}

export default NavigationCard;
