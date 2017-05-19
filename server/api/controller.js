const express = require('express');
const router = express.Router();
const request = require('request');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const Destination = require('../../database/models/destination');

module.exports.saveLocation = function(req, res) {
  Destination.create({
    destination: req.query.location
  }), function(err, data){
    if (err){
      console.log(err)
    } else {
      console.log("Successfully entered")
    }
  };
  res.end()
}

module.exports.getYelp = function(req, res) {
  // check db for location
  Destination.find({ destination: req.query.location }, function (err, data){

    if (err) { console.log(err) }
    if (data[0].toptenEats.length !== 0){
      res.send(data[0].toptenEats)
    } else {
      console.log('went in NEW API call')
      console.log('req.query.location', req.query.location)
      //Yelp Fusion's OAuth 2.0 credentials https://www.yelp.com/developers/v3/manage_app
      const clientId = '0jgaCvkiiSDmlRChqiBxdw';
      const clientSecret = 'YymoKgxeD7oOKZNI4Musd0iKqdLVi8pUbRWidhwSDRN9n6W7JR5YD96BsT6cGhEP';

      const searchRequest = {
        term:'food',
        location: req.query.location,
        limit: 10,
        sort_by: 'review_count'
      };
      
      const getYelp = new Promise((resolve, reject) => {

        yelp.accessToken(clientId, clientSecret)
          .then(response => {
            const client = yelp.client(response.jsonBody.access_token);

            client.search(searchRequest).then(response => {
              const searchResults = response.jsonBody.businesses;
              const prettyJson = JSON.stringify(searchResults, null, 4);
              resolve(searchResults);
            });
          })
          .catch(e => {
            console.log(e);
          });
      });
      getYelp.then(searchResults => {
        Destination.update({ destination: req.query.location },
          { $set: { toptenEats: searchResults } }, 
          function(err, data){
            if (err){
              console.log(err)
            } else {
              console.log("Successfully entered")
            }
          }
        );
        res.send(searchResults)
      });

    }

  });
  
};

module.exports.getFourSquare = function(req, res) {
  // check db for location
  Destination.find({ destination: req.query.location }, function (err, data){

    if (err) { console.log(err) }
    if (data[0].toptenSights.length !== 0){
      res.send(data[0].toptenSights)
    } else {

      const token = '4MVKT2MMAUFFFU3FODWZEU2LLLC4KXPZE0F0NJM0CYCTGHM5'
      const location = req.query.location;

      const getData = new Promise((resolve, reject) => {
        var url = `https://api.foursquare.com/v2/venues/explore?oauth_token=${token}&near=${location}&limit=10&v=20170517&query=Popular with Visitors&photos=1`
        request.get(url, (err, result) => {
          resolve(result);
        })
      });

      getData.then( result => {
        // console.log("RESULT", result)
        var parsedbody = JSON.parse(result.body)
        // console.log("FOUR SQUARE RESULT BODY RESPONSE", parsedbody.response.geocode.center)
        // console.log("FOUR SQUARE API CALL RESULT", result.body.response.geocode.center);
        Destination.update({ destination: req.query.location },
          { $set: { toptenSights: result.body, coordinates: parsedbody.response.geocode.center } }, 
          function(err, data){
            if (err){
              console.log(err)
            } else {
              console.log("Successfully entered")
            }
          }
        );
        res.send(result.body)
      });
    }
  })
};

// 

