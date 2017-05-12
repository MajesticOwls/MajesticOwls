import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

const styles = {
  // Put any inline css styles here.
}

const FoodCard = (props) => (
  <div>
    <Card>
      {props.food}
    </Card>
  </div>
)

export default FoodCard;