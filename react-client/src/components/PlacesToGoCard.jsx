import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
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
}

class PlacesToGoCard extends React.Component {
  constructor (props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(restaurant, checked) {
    this.props.handleFavPlace(restaurant, checked);
  }

  render () {
    return (
      <div>
        <Card style={styles.card}>
          <CardHeader
            title="Places To Go"
            subtitle={this.props.location + ': Top recommended places '}
            avatar={<Avatar
              icon={<MapsLocalDining />}
              style={styles.avatar}
            />}
            style={styles.cardHeader}
          />
          <Divider/>
          <List
            style={styles.list}
          >
            {this.props.places.map((place, i) => (
              <ListItem
                key={i}
                rightAvatar={<Avatar src={place.image_url} />}
                leftAvatar={<Checkbox 
                  onCheck={ (e,checked) => {
                    // console.log('e',e)
                    // console.log('checked',checked)
                    this.handleCheck(place, checked)} }
                  />}
                primaryText={i+1 + '. ' + place.venue.name}
                secondaryText={'Rating: ' + place.venue.rating + ' | ' + place.venue.categories[0].name}
                target="_blank"
                href={place.url}
              />
            ))}
          </List>
        </Card>
      </div>
    )
  }
}

// const PlacesToEatCard = (props) => (
// )

export default PlacesToGoCard;