const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('../database/index');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const request = require('request');
const GooglePlaces = require('googleplaces');
const GOOGLE_KEY = process.env.GOOGLE_KEY || require('./config').GOOGLE_KEY;
const DARK_SKY_KEY = process.env.DARK_SKY_KEY || require('./config').DARK_SKY_KEY;


const place = new GooglePlaces(GOOGLE_KEY, 'json');

app.use(express.static(__dirname + '/../react-client/dist'));

// Passport/Auth
var userId;
// check if user has saved data
var userIdCheck = false;
var checkUser = () => {
  User.find({user: userId}).exec((err,result) => {
    if(err) {
      console.log('Get did not return data');
    } else {
      if (typeof result[0] === 'object') {
        userIdCheck = true;
      } else {
        userIdCheck = false;
      }
    }
  });
}

passport.use(new GoogleStrategy({
    clientID: process.env.G_ID || require('./config').G_ID,
    clientSecret: process.env.G_SECRET || require('./config').G_SECRET,
    callbackURL: process.env.G_URL || 'http://localhost:1337/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
      userId = profile.id;
      checkUser();
    User.findOrCreate({ googleId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: process.env.SESSION_SECRET || require('./config').SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/sign-in' }),
  (req, res) => {
    if (userIdCheck === true) {
      res.redirect('/dashboard');
    } else {
      res.redirect('/trip');
    }
  });

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
})

app.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
})

app.get('/trip', (req, res) => {
  res.sendFile(path.join(__dirname, '/../react-client/dist/index.html'));
})

app.get('/weather', (req, res) => {
  const getCoords = new Promise((resolve, reject) => {
    request.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_KEY}&address=${req.query.location || 'San Francisco'}`,
    (error, response, body) => {
      if (error) console.error(error);
      resolve(JSON.parse(body).results[0].geometry.location);
    });
  });
  getCoords.then(coords => {
    request.get(`https://api.darksky.net/forecast/${DARK_SKY_KEY}/${coords.lat},${coords.lng}?exclude=[minutely,hourly]`,
    (error, response, body) => {
      if (error) console.error(error);
      res.send(JSON.parse(body).daily.data);
    });
  });
});

app.get('/sights', (req, res) => {
  let params = {
    query: (req.query.location || 'San Francisco') + ' attractions'
  };
  const getSights = new Promise((resolve, reject) => {
    place.textSearch(params, (err, res) => {
      if (err) console.error(err);
      resolve(res.results);
    });
  });
  getSights.then(sights => {
    let promiseArr = sights.map((sight) => {
      return new Promise((resolve, reject) => {
        place.placeDetailsRequest({ placeid: sight.place_id }, (err, res) => {
          if (err) console.error(err);
          sight.url = res.result.url;
          if ( sight.photos ) {
            sight.img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + sight.photos[0].photo_reference + '&key=' + GOOGLE_KEY;
          } else {
            sight.img = '';
          }
          resolve(sight);
        });
      });
    });
    Promise.all(promiseArr).then(sights => {
      res.send(sights);
    });
  });
});

app.get('/food', (req, res) => {
  let params = {
    query: req.query.location || 'San Francisco',
    type: 'restaurant'
  };
  const getRestaurants = new Promise((resolve, reject) => {
    place.textSearch(params, (err, res) => {
      if (err) console.error(err);
      resolve(res.results);
    });
  });
  getRestaurants.then(restaurants => {
    promiseArr = restaurants.map((restaurant) => {
      return new Promise((resolve, reject) => {
        place.placeDetailsRequest({ placeid: restaurant.place_id }, (err, res) => {
          if (err) console.error(err);
          restaurant.url = res.result.url;
          if ( restaurant.photos ) {
            restaurant.photo = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=100&photoreference=' + restaurant.photos[0].photo_reference + '&key=' + GOOGLE_KEY;
          } else {
            restaurant.photo = '';
          }
          resolve(restaurant);
        });
      });
    });
    Promise.all(promiseArr).then(restaurants => {
      res.send(restaurants);
    });
  });
});

app.get('/flightStatus', (req, res) => {
  request.get('https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/'+req.query.airline+'/'+req.query.flight+'/arr/'+req.query.year+'/'+req.query.day+'/'+req.query.month+'?appId=' + require('./config').FLIGHT_API_KEY + '&appKey=' + require('./config').FLIGHT_APP_KEY + '&utc=false',
  (error, response, body) => {
    if (error) console.error(error);
    res.send(JSON.parse(body));
  });
})


//FOR ADDING DATA INTO THE DATEBASE
app.post('/database/save', (req, res) => {

    var dateTotal = req.body.date;
    var monthOnly;
    var dayOnly;
    var yearOnly;

    yearOnly = dateTotal.slice(0,4);
    dayOnly = Number(dateTotal.slice(5,7)).toString();
    monthOnly = Number(dateTotal.slice(8,10)).toString();
    userId = userId.toString();

    const addNew = new User({
      user: userId,
      month: monthOnly,
      day: dayOnly,
      year: yearOnly,
      Airline: req.body.airline,
      flight: req.body.flightNumber,
      destination: req.body.finalDestination
    })

    addNew.save((err,result) => {
      if (err) {
        console.log('did not save');
      } else {
        console.log('history saved', result);
      }
    })
    res.end();
});

//RETURNS LIST OF THE USERS HISTORY
app.get('/database/return', (req,res) => {
  User.find({user: userId}).limit(10).exec((err,result) => {
    if(err) {
      console.log('Get did not return data');
    } else {
      result = result.reverse();
      res.json(result);
    }
  })

})


const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log('Listening on port', port);
});
