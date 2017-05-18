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
import ItinList from './ItinList.jsx';
const GOOGLE_KEY = process.env.GOOGLE_KEY || require('../../../server/config').GOOGLE_KEY;


 class NavigationCard extends React.Component {
  constructor (props) {
    super(props);

    this.state={
      markers: []
        // {
        //   position: new google.maps.LatLng(37.7829016035273, -122.419043442957),
        //   showInfo: false,
        //   infoContent: "Brendas <p><a href=`https://www.google.com`>Google</a></p>"
        // }, 
        // {
        //   position: new google.maps.LatLng(37.7614250022004, -122.424051321456),
        //   showInfo: false,
        //   infoContent: "hello"
        // },
    }

    

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
        height: '65%',
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
              title={this.props.location}
              subtitle='Your Sights + Restaurants'
              avatar={<Avatar icon={<MapNavigation />}
                style={styles.avatar}
                color={white}/>}
              style={styles.cardHeader}/>
              <Divider/>
              <div
                style={styles.map}>
               
                <ComboMap 
                  containerElement={
                    <div style={{ height: `100%` }} />
                  }
                  mapElement={
                    <div style={{ height: `100%` }} />
                  }
                  markers={this.props.markers} onMarkerClick={this.props.handleMarkerClick} onMarkerClose={this.props.handleMarkerClose} />

              </div>
              <CardActions style={styles.actions}>
                <FlatButton primary = {true} label="NAVIGATE" />
                <FlatButton label="SHARE" />
              </CardActions>
        </Card>
      </div>
    )
  }
}

export default NavigationCard;
