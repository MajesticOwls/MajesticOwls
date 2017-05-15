import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FileCloud from 'material-ui/svg-icons/file/cloud';
import {lightBlue500, grey500, white} from 'material-ui/styles/colors';
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
  listItem: {
    height: 100
  },
  card: {
    width: '100%',
    height: 400,
  },
  avatar: {
    backgroundColor: lightBlue500,
  },
  icons: {
    backgroundColor: lightBlue500,
    height: 70,
    width: 70
  },
  dateText: {
    fontWeight: 300,
    paddingBottom: 16,
  },
  tempText: {
    fontWeight: 300,
    color: grey500
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
const condition = {
  'clear-day': 'Sunny',
  'clear-night': 'Clear',
  'cloudy': 'Cloudy',
  'fog': 'Fog',
  'partly-cloudy-day': 'Partly Cloudy',
  'partly-cloudy-night': 'Partly Cloudy',
  'rain': 'Rain',
  'sleet': 'Sleet',
  'snow': 'Snow',
  'wind': 'Wind'
}

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
            rightAvatar={<Avatar src={icons[day.icon]} style={styles.icons} />}
            style={styles.listItem}
          >
          <h3 style={styles.dateText} >{weekdays[new Date(day.time * 1000).getDay()]}, {months[new Date(day.time * 1000).getMonth()]} {new Date(day.time * 1000).getDate()}</h3>
          <h2 style={styles.tempText} >{Math.round(day.temperatureMax) + '° / ' + Math.round(day.temperatureMin) + '° · ' + condition[day.icon]}</h2>
          </ListItem>
        ))}
      </List>
    </Card>
  </div>
)

export default WeatherCard;