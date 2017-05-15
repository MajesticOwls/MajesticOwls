import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileCloud from 'material-ui/svg-icons/file/cloud';
import {lightBlue500, white} from 'material-ui/styles/colors';
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
  },
  icons: {
    backgroundColor: white
  }
}

const weekdays = 'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(' ');
const months = 'January February March April May June July August September October November December'.split(' ');
const icons = {
  'clear-day': './weather-icons/clear-day.png',
  'clear-night': './weather-icons/clear-night.png',
  'cloudy': './weather-icons/cloudy.png',
  'fog': './weather-icons/fog.png',
  'partly-cloudy-day': './weather-icons/partly-cloudy-day.png',
  'partly-cloudy-night': './weather-icons/partly-cloudy-night.png',
  'rain': './weather-icons/rain-day.png',
  'sleet': './weather-icons/sleet.png',
  'snow': './weather-icons/snow.png',
  'wind': './weather-icons/wind.png'
};

const WeatherCard = (props) => (
  <div>
    <Card style={styles.card}>
      <CardHeader
        title="Weather"
        subtitle={props.location}
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
            primaryText={<div>{weekdays[new Date(day.time * 1000).getDay()]}, {months[new Date(day.time * 1000).getMonth()]} {new Date(day.time * 1000).getDate()}</div>}
            secondaryText={<div>{Math.round(day.temperatureMax) + '/' + Math.round(day.temperatureMin)}</div>}
            rightAvatar={<Avatar src={icons[day.icon]} style={styles.icons} />}
          />
        ))}
      </List>
    </Card>
  </div>
)

export default WeatherCard;