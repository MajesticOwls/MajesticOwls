import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CardIcon from 'material-ui/svg-icons/social/location-city';
import {red500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import MapIcon from 'material-ui/svg-icons/maps/place';
import ItinIcon from 'material-ui/svg-icons/action/list';

import {GridList, GridTile} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  avatar: {
    backgroundColor: red500,
  },  
  gridList: {
    width: '99%',
    height: '80%',
    overflowY: 'auto',
    padding: '10 0 0 0',
    cols:'1',
    padding: '5 5 5 5 '    
  },
  gridTile: {
    height: '85%',
    width: '100%',
  },
  gridListImg: {
    position: 'relative',
    width: '250',
    height: '250',
  },
  center: {
    margin: '0 auto',
    width: '60px'  
  }  
};


class PlacesToGoCard extends React.Component {
  constructor (props) {
    super(props);
    this.handleCheckedSight = this.handleCheckedSight.bind(this);
    this.handleFavoritedSight = this.handleFavoritedSight.bind(this);
    this.handleCheckboxesItin = this.handleCheckboxesItin.bind(this);
    this.handleCheckboxesMap = this.handleCheckboxesMap.bind(this);
    this.state= {
      activeCheckboxesItin: '',
      activeCheckboxesMap: ''
    }
  }
  componentDidMount() {
    this.setState({
      activeCheckboxesMap: this.props.activeCheckboxesMap,
      activeCheckboxesItin: this.props.activeCheckboxesItin
    })
  }

  handleCheckedSight(place, checked) {
    this.props.addToMaps(place, checked);
  }

  handleFavoritedSight(place, checked) {
    this.props.addToItinerary(place, checked);
  }

  handleCheckboxesItin(name) {
    var found = this.state.activeCheckboxesItin.includes(name);
    if (!found) {
      this.setState({
        activeCheckboxesItin: [...this.state.activeCheckboxesItin, name]
      })
    } else {
      this.setState({
        activeCheckboxesItin: this.state.activeCheckboxesItin.filter(x => x !== name)
      })
    }
  }

  handleCheckboxesMap(name) {
    var found = this.state.activeCheckboxesMap.includes(name);
    if (!found) {
      this.setState({
        activeCheckboxesMap: [...this.state.activeCheckboxesMap, name]
      })
    } else {
      this.setState({
        activeCheckboxesMap: this.state.activeCheckboxesMap.filter(x => x !== name)
      })
    }
  }

  render() {
    return (      
      <div>
        <Card style={styles.card}>
          <CardHeader
            title="Places To Go"
            subtitle={<span>Top 10 Suggested Places <small>(Powered by Foursquare)</small></span>}
            avatar={<Avatar icon={<CardIcon />} style={styles.avatar} />}
            style={styles.cardHeader}
          />      

        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          {this.props.sights.map((attraction, i) => (
            <div key={i}>
              <div>
                <GridTile
                  key={i}
                  title={i+1 + '. ' + attraction.venue.name}
                  subtitle={<span># Reviews: {attraction.venue.ratingSignals} | Rating: {attraction.venue.rating} <p>{attraction.venue.categories[0].pluralName}</p></span>}
                  titlePosition="top"
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                  style = {styles.gridTile}
                > 
                <a target="_blank" href={attraction.venue.url}>
                  <img 
                    style={styles.gridListImg} src={attraction.venue.photos.groups[0].items[0].prefix + 'width960' + attraction.venue.photos.groups[0].items[0].suffix} 
                  />
                </a>   

                </GridTile>
              </div>

              <div style={styles.center}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div style ={{width: '100%'}}>
                    <Checkbox 
                      checkedIcon={<ItinIcon />}
                      uncheckedIcon={<ItinIcon />}
                      onCheck={ (e,checked) => {
                        this.handleFavoritedSight(attraction.venue, checked);
                        this.handleCheckboxesItin(attraction.venue.name);
                      }}
                      checked={this.state.activeCheckboxesItin.includes(attraction.venue.name)} 
                    />
                  </div>
                  <div style ={{width: '100%'}}>
                    <Checkbox 
                      checkedIcon={<MapIcon />}
                      uncheckedIcon={<MapIcon />}
                      onCheck={ (e,checked) => {
                        attraction.venue.coordinates = {};
                        attraction.venue.coordinates.latitude = attraction.venue.location.lat;
                        attraction.venue.coordinates.longitude = attraction.venue.location.lng;
                        this.handleCheckedSight(attraction.venue, checked);
                        this.handleCheckboxesMap(attraction.venue.name);
                      }} 
                      checked={this.state.activeCheckboxesMap.includes(attraction.venue.name)}
                    />
                  </div>           
                </div>           
              </div>
            </div>         
          ))}
        </GridList>
        </Card>        
      </div>
    ) 
  }
};

export default PlacesToGoCard;