import React from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import {red500} from 'material-ui/styles/colors';


const styles = {
	card: {
	  width: '100%',
	  height: 400
	},
	avatar: {
	  backgroundColor: red500,
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
        subtitle="Places I plan to visit"
        avatar={<Avatar
          icon={<MapsLocalDining />}
          style={styles.avatar}
        />}
        style={styles.cardHeader}
      />
      <Divider />
      <List
        style={styles.list}
      >
      {this.props.itinItems.length ? this.props.itinItems.map((item,i) => {
      	return (
        <ListItem
          primaryText={i + ': ' + item.name}
        >
        </ListItem>
      )}) : null }
      </List>





      </Card>
   )   
  }
}

export default ItinList