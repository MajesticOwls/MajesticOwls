const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('../database/index');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(express.static(__dirname + '/../react-client/dist'));

// Passport/Auth

passport.use(new GoogleStrategy({
    clientID: process.env.G_ID || require('./config').G_ID,
    clientSecret: process.env.G_SECRET || require('./config').G_SECRET,
    callbackURL: process.env.G_URL || 'http://localhost:1337/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
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
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  });


//FOR ADDING DATA INTO THE DATEBASE
app.post('/datebase/save', (req,res) => {

    const addNew = new User({
      user: req.body.user,
      history: req.body.history
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
  User.find({user: req.body}).sort('history').exec((err,result) => {
    if(err) {
      console.log('Get did not return data');
    } else {
      res.json(result);
    }
  })

})


const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log('Listening on port', port);
});
