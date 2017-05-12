import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import {grey500} from 'material-ui/styles/colors';

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
    backgroundColor: grey500,
  }
}

const FoodCard = (props) => (
  <div>
    <Card style={styles.card}>
    <CardHeader
      title="Food"
      avatar={<Avatar
        icon={<MapsLocalDining />}
        style={styles.avatar}
      />}
      style={styles.cardHeader}
    />
    <List
      style={styles.list}
    >
      {props.food.map((restaurant) => (
        <ListItem
          key={restaurant.place_id}
          leftAvatar={<Avatar/>}
          primaryText={restaurant.name}
          secondaryText={restaurant.rating}
        />
      ))}
    </List>
    </Card>
  </div>
)

export default FoodCard;