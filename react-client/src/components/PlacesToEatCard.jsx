import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import CardIcon from 'material-ui/svg-icons/social/location-city';
import {red500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
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
    height: '240',
  },
  center: {
    margin: '0 auto',
    width: '60px'  
  }  
};


class PlacesToEatCard extends React.Component {
  constructor (props) {
    super(props);
    this.handleCheck = this.handleCheck.bind(this);
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
      activeCheckboxesItin: this.props.activeCheckboxesItin,
      activeCheckboxesMap: this.props.activeCheckboxesMap
    })
  }

  handleCheck(restaurant, checked) {
    this.props.handleFavFood(restaurant, checked);
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
            title="Places To Eat"
            subtitle={<span>Top 10 Most Reviewed Restaurants<small> (Powered by Yelp)</small></span>}
            avatar={<Avatar 
              icon={<MapsLocalDining />}
              style={styles.avatar} />
            }
          />      

        <GridList
          cellHeight={180}
          style={styles.gridList}
        >
          {this.props.food.map((restaurant, i) => (
            <div key={i}>
              <div>
                <GridTile
                  key={i}
                  title={i+1 + '. ' + restaurant.name}
                  subtitle={<span># Reviews: {restaurant.review_count} | Rating: {restaurant.rating} <p>{restaurant.categories[0].title}</p></span>}
                  titlePosition="top"
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                  style = {styles.gridTile}
                > 
                <a target="_blank" href={restaurant.url}>
                  <img 
                    style={styles.gridListImg} src={restaurant.image_url} 
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
                        this.handleFavoritedSight(restaurant, checked)
                        this.handleCheckboxesItin(restaurant.name)
                      }}
                      checked={this.state.activeCheckboxesItin.includes(restaurant.name)} 
                    />
                  </div>
                  <div style ={{width: '100%'}}>
                    <Checkbox 
                      checkedIcon={<MapIcon />}
                      uncheckedIcon={<MapIcon />}
                      onCheck={ (e,checked) => {
                        this.handleCheck(restaurant, checked);
                        this.handleCheckboxesMap(restaurant.name);
                      }}
                      checked={this.state.activeCheckboxesMap.includes(restaurant.name)}

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

export default PlacesToEatCard;


//*********V2 UI below***************


// import React from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import {List, ListItem} from 'material-ui/List';
// import Avatar from 'material-ui/Avatar';
// import MapsLocalDining from 'material-ui/svg-icons/maps/local-dining';
// import {red500} from 'material-ui/styles/colors';
// import Divider from 'material-ui/Divider';
// import Checkbox from 'material-ui/Checkbox';
// import ActionFavorite from 'material-ui/svg-icons/action/favorite';
// import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
// import Visibility from 'material-ui/svg-icons/action/visibility';
// import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
// import ItinIcon from 'material-ui/svg-icons/action/list';
// import MapIcon from 'material-ui/svg-icons/maps/place';
// import FlatButton from 'material-ui/FlatButton';
// import Paper from 'material-ui/Paper';

// const styles = {
//   cardHeader: {
//     height: '20%',
//   },
//   list: {
//     width: '100%',
//     height: '75%',
//     overflowY: 'auto',
//   },
//   card: {
//     width: '100%',
//     height: 400,
//   },
//   avatar: {
//     backgroundColor: red500,
//   },
//   block: {
//     maxWidth: 250,
//   },
//   center: {
//     margin: '0 auto',
//     width: '120px',
//     height: '30px' 
//   }
// }


// class PlacesToEatCard extends React.Component {
//   constructor (props) {
//     super(props);
//     this.handleCheck = this.handleCheck.bind(this);
//     this.handleFavoritedSight = this.handleFavoritedSight.bind(this);
//   }

//   handleCheck(restaurant, checked) {
//     this.props.handleFavFood(restaurant, checked);
//   }

//   handleFavoritedSight(place, checked) {
//     this.props.addToItinerary(place, checked);
//   }

//   render () {
//     return (
//       <div>
//         <Card style={styles.card}>
//           <CardHeader
//             title="Places To Eat"
//             subtitle={<span>Top 10 Most Reviewed Restaurants<small> (Powered by Yelp)</small></span>}
//             avatar={<Avatar
//               icon={<MapsLocalDining />}
//               style={styles.avatar}
//             />}
//             style={styles.cardHeader}
//           />
//           <List
//             style={styles.list}
//           >
//             {this.props.food.map((restaurant, i) => (
//               <div key={i}>
//                 <ListItem
//                   key={i}
//                   rightAvatar={<Avatar src={restaurant.image_url} />}
//                   // leftCheckbox={
//                   //   <div style ={{display:'block', width: '10%'}}>
//                   //     <Checkbox 
//                   //     style ={{width: '10%'}}
//                   //     checkedIcon={<ActionFavorite />}
//                   //     uncheckedIcon={<ActionFavoriteBorder />}
//                   //     iconStyle={{left: '4'}, {bottom: '3.77'}}
//                   //     onCheck={ (e,checked) => {
//                   //       this.handleFavoritedSight(restaurant, checked)} }
//                   //     />
//                   //   </div>
//                   // }
//                   // leftAvatar={
//                   //   <div style ={{width: '10%'}}>                
//                   //     <Checkbox 
//                   //     iconStyle={{left: "13"}}
//                   //     onCheck={ (e,checked) => {
//                   //       this.handleCheck(restaurant, checked)} }
//                   //     />
//                   //   </div>
//                   // }
//                   primaryText={i+1 + '. ' + restaurant.name}
//                   secondaryText={'# Reviews: ' + restaurant.review_count + ' | Rating: ' + restaurant.rating + ' | ' + restaurant.categories[0].title}
//                   target="_blank"
//                   href={restaurant.url}
//                 />

//                 <div style={styles.center}>
//                   <div style={{display: 'flex', flexDirection: 'row', fontSize: 30}}>
//                     <div style ={{width: '100%'}}>
//                       <Checkbox 
//                         checkedIcon={<ItinIcon />}
//                         uncheckedIcon={<ItinIcon />}
//                         onCheck={ (e,checked) => {
//                           this.handleFavoritedSight(restaurant, checked)} }
//                       />
//                     </div>  
//                     <div style ={{width: '100%'}}>
//                       <Checkbox 
//                         checkedIcon={<MapIcon />}
//                         uncheckedIcon={<MapIcon />}
//                         onCheck={ (e,checked) => {
//                           this.handleCheck(restaurant, checked)} }
//                       />
//                     </div>           
//                   </div>           
//                 </div>                  
//               </div>

//             ))}
//           </List>
//         </Card>
//       </div>
//     )
//   }
// }

// export default PlacesToEatCard;
