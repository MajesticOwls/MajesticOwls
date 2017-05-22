const express = require('express');
const router = express.Router();
const request = require('request');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const api = require('./api.js') 

const Destination = require('../../database/models/destination');

module.exports.getCityCoords = function(req, res){
  Destination.find({ destination: req.query.location }, function (err, data){
    if (err) { console.log(err) }
    // console.log("SERVER COORDINATES", data[0].coordinates)
    res.send(data[0].coordinates)
  })
}

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

module.exports.getAllSavedCities = function(req, res) {
  Destination.find({})
  .select({ destination: 1, _id: 0})
  .exec(
    function (err, data){
      if (err) { console.log(err) }
      // console.log("getAll back", data)
      res.send(data)
    }  
  ) 
}

module.exports.getYelp = function(req, res) {
  // retrieves info from either db or api 
  Destination.find({ destination: req.query.location }, function (err, data){

    if (err) { console.log(err) }
    if (data[0].toptenEats.length !== 0){
      res.send(data[0].toptenEats)
    } else {
      // console.log('went in NEW API call')
      api.yelpAPICall(req.query.location, function(result){
        res.send(result)
      })
    }
  })
  
};

module.exports.getFourSquare = function(req, res) {
  // check db for location
  Destination.find({ destination: req.query.location }, function (err, data){

    if (err) { console.log(err) }
    if (data[0].toptenSights.length !== 0){
      res.send(data[0].toptenSights)
    } else {

      api.foursquareAPICall(req.query.location, function(result){
        res.send(result)
      })

    }
  })
};



