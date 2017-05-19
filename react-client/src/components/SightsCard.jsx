import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import {red500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';


const styles = {  
  cardHeader: {
    height: '20%',
  },
  list: {
    width: '100%',
    height: '75%',
    overflowY: 'auto',
  },
  card: {
    width: '100%',
    height: 400,
  },
  avatar: {
    backgroundColor: red500,
  },
  block: {
    maxWidth: 250,
  },
  listitem: {
    height: 400
  }
}

class SightsCard extends React.Component {
  constructor (props) {
    super(props);
    this.handleCheckedSight = this.handleCheckedSight.bind(this);
    this.handleFavoritedSight = this.handleFavoritedSight.bind(this);
  }

  handleCheckedSight(place, checked) {
    this.props.addToMaps(place, checked);
  }

  handleFavoritedSight(place, checked) {
    this.props.addToItinerary(place, checked);
  }

  render () {
    console.log('list :', this.props.sights)
    return (
      <div>
        <Card style={styles.card}>
          <CardHeader
            title="Places to See"
            subtitle={this.props.location + ': Top 10 Attractions'}
            avatar={<Avatar
            icon={<MapsPlace />}
            style={styles.avatar}
          />}
            style={styles.cardHeader}
          />
          <Divider/>
          <List
            style={styles.list}
          >
            {this.props.sights.map((attraction, i) => (
              <ListItem
                key={i}
                rightAvatar={<Avatar src='' />}
                leftCheckbox={<Checkbox 
                  checkedIcon={<ActionFavorite />}
                  uncheckedIcon={<ActionFavoriteBorder />}
                  iconStyle={{left: '4'}, {bottom: '3.77'}}
                  onCheck={ (e,checked) => {
                    this.handleFavoritedSight(attraction.venue, checked)} }
                />}
                leftAvatar={<Checkbox 
                  iconStyle={{left: "13"}}
                  onCheck={ (e,checked) => {
                    attraction.venue.coordinates = {};
                    attraction.venue.coordinates.latitude = attraction.venue.location.lat;
                    attraction.venue.coordinates.longitude = attraction.venue.location.lng;
                    this.handleCheckedSight(attraction.venue, checked)} }
                />}
                primaryText={i+1 + '. ' + attraction.venue.name}
                secondaryText={'# Reviews: ' + attraction.venue.ratingSignals + ' | Rating: ' + attraction.venue.rating + ' | ' + attraction.venue.categories[0].pluralName}
                target="_blank"
                href={attraction.venue.url}
              />
            ))}
          </List>
        </Card>
      </div>
    )
  }
}



export default SightsCard;

//things to do
  //need to get it to re-route to url once clicked
  //need to get photos to display


//attraction.venue.location.lat/lng
// const PlacesToEatCard = (props) => (
// )

// import React from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import Subheader from 'material-ui/Subheader';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
// import Star from 'material-ui/svg-icons/toggle/star';
// import MapsPlace from 'material-ui/svg-icons/maps/place';
// import Avatar from 'material-ui/Avatar';
// import {
//   grey500, blueGrey500
// } from 'material-ui/styles/colors';
// import Divider from 'material-ui/Divider';

// const styles = {
//   cardHeader: {
//     height: '20%',
//   },
//   gridList: {
//     width: '100%',
//     height: '80%',
//     overflowY: 'auto',
//   },
//   card: {
//     width: '100%',
//     height: 400,
//   },
//   avatar: {
//     backgroundColor: blueGrey500,
//   }
// }

// const SightsCard = (props) => (
//   <div>
//     <Card
//       style={styles.card}
//     >
//       <CardHeader
//         title="Places of Interest"
//         subtitle='sldkjf'
//         avatar={<Avatar icon={<MapsPlace />} style={styles.avatar} />}
//         style={styles.cardHeader}
//       />
//       <Divider/>
//       <GridList
//         cellHeight={180}
//         style={styles.gridList}
//       >
//           <GridTile
//             key='sldkfj'
//             title='sldkfj'
//             subtitle={<b>'dslkfj'</b>}
//             actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
//           >
//             <a target="_blank" href='https://google.com'>
//             <img src="https://s-media-cache-ak0.pinimg.com/736x/80/d3/64/80d364e09d31fcba8af274926d4332ff.jpg" />
//             </a>
//           </GridTile>
//       </GridList>
//     </Card>
//   </div>
// )

// export default SightsCard;