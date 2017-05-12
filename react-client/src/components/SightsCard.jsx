import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import Avatar from 'material-ui/Avatar';
import {
  grey500,
} from 'material-ui/styles/colors';

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
  },
  avatar: {
    backgroundColor: grey500,
  }
}

const SightsCard = (props) => (
  <div>
    <Card
      style={styles.card}
    >
      <CardHeader
        title="Places of Interest"
        subtitle="Subtitle here"
        avatar={<Avatar icon={<MapsPlace />} style={styles.avatar} />}
        style={styles.cardHeader}
      />
      <GridList
        cellHeight={180}
        style={styles.gridList}
      >
        {props.sights.map((sight) => (
          <GridTile
            key={sight.place_id}
            title={sight.name}
            subtitle={<b>{sight.formatted_address}</b>}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
          >
            <img src={sight.img} />
          </GridTile>
        ))}
      </GridList>
    </Card>
  </div>
)

export default SightsCard;