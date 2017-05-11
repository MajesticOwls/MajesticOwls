import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import testData from '../../../test/testdata.js'


 class FlightCard extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const styles = {
      gridList: {
        width: 500,
        height: 400,
        overflowY: 'auto',
      },
      card: {
        width:500,
        height: 400,
      }
    }
    return (
        <div>
        <MuiThemeProvider>
          <Card
            style={styles.card}
          >
            <GridList
              cellHeight={180}
              style={styles.gridList}
            >
              <Subheader>Sights</Subheader>

            </GridList>
          </Card>
        </MuiThemeProvider>
        </div>
    )
  }
}


export default FlightCard;
