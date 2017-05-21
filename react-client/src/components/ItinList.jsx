import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import Divider from 'material-ui/Divider';
import LibraryBook from 'material-ui/svg-icons/av/library-books';
import {List, ListItem} from 'material-ui/List';
import {red500, deepPurple500} from 'material-ui/styles/colors';
import ItinIcon from 'material-ui/svg-icons/action/list';


const styles = {
	card: {
	  width: '100%',
	  height: 400
	},
	avatar: {
	  backgroundColor: deepPurple500,
	},
	list: {
      width: '100%',
      height: '75%',
      overflowY: 'auto',
	}
}
class ItinList extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
  }

  render () {
    return (
      <Card style={styles.card}>
        <CardHeader
        title="Itinerary"
        subtitle="Places I Plan To Visit"
        avatar={<Avatar
          icon={<ItinIcon />}
          style={styles.avatar}
        />}
        style={styles.cardHeader}
      />
      <List
        style={styles.list}
      >
      {this.props.itinItems.length ? this.props.itinItems.map((item,i) => {
      	return (
        <ListItem
          primaryText={i+1 + ': ' + item.name}
          key={i}
        >
        </ListItem>
      )}) : null }
      </List>





      </Card>
   )   
  }
}

export default ItinList