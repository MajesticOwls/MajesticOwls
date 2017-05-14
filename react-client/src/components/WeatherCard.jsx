import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileCloud from 'material-ui/svg-icons/file/cloud';
import {lightBlue500} from 'material-ui/styles/colors';
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
    backgroundColor: lightBlue500,
  }
}

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const WeatherCard = (props) => (
  <div>
    <Card style={styles.card}>
      <CardHeader
        title="Weather"
        avatar={<Avatar
          icon={<FileCloud />}
          style={styles.avatar}
        />}
        style={styles.cardHeader}
      />
      <Divider/>
      <List
        style={styles.list}
      >
        {props.weather.map((day) => (
          <ListItem
            key={day.time}
            primaryText={weekdays[new Date(day.time * 1000).getDay()]}
            secondaryText={<span>{Math.round(day.temperatureMax)} {Math.round(day.temperatureMin)}</span>}
            rightAvatar={<Avatar icon={<FileCloud />} />}
          />
        ))}
      </List>
    </Card>
  </div>
)

export default WeatherCard;