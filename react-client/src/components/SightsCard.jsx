import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  cardHeader: {
    height: '20%',
  },
  gridList: {
    width: '100%',
    height: '80%',
    overflowY: 'auto',
  },
  card: {
    width: '100%',
    height: 400,
  }
}
const testData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Golden Gate Bridge',
    author: 'Price: $ · Rating: 4.9',
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Fisherman\'s Wharf',
    author: 'Price: $$ · Rating: 4.5',
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Pier 39',
    author: 'Price: $$ · Rating: 4.3',
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'California Academy of Sciences',
    author: 'Price: $$$ · Rating: 4.7',
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'De Young Museum',
    author: 'Price: $$$ · Rating: 4.4',
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Legion of Honor',
    author: 'Price: $$$ · Rating: 4.6',
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Ferry Building',
    author: 'Price: $ · Rating: 4.6',
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'AT&T Park',
    author: 'Price: $$ · Rating: 4.2',
  },
];

const SightsCard = () => (
  <div>
    <Card
      style={styles.card}
    >
      <CardHeader
        title="Places of Interest"
        avatar="images/jsa-128.jpg"
        style={styles.cardHeader}
      />
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
        {testData.map((tile) => (
          <GridTile
            key={tile.img}
            title={tile.title}
            subtitle={<b>{tile.author}</b>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={tile.img} />
          </GridTile>
        ))}
      </GridList>
    </Card>
  </div>
)

export default SightsCard;