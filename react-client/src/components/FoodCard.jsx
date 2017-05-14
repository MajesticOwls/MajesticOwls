import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import {red500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

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
      <Divider/>
      <List
        style={styles.list}
      >
        {props.food.map((restaurant) => (
          <ListItem
            key={restaurant.place_id}
            leftAvatar={<Avatar src={restaurant.photo} />}
            primaryText={restaurant.name}
            secondaryText={restaurant.formatted_address + ' · Rating:' + restaurant.rating}
            target="_blank"
            href={restaurant.url}
          />
        ))}
      </List>
    </Card>
  </div>
)

export default FoodCard;