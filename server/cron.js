const CronJob = require('cron').CronJob;
const api = require('./api/api.js') 
const Destination = require('../database/models/destination');

var apiCron = function(){

  Destination.find({toptenEats: {$exists: true}}, 'destination', function(err, data){
    var destinations = data.map((entry) => {
      return entry.destination
    })

    destinations.forEach((destination) => {
      api.yelpAPICall(destination, function(){
        console.log("updated DB for Yelp API")
      });

      api.foursquareAPICall(destination, function(){
        console.log("updated DB for FourSquare API")
      });

    })

  })
}

// updates the Eats information in the db every midnight 
var cron = new CronJob({
  cronTime: '00 00 00 * * *',
  onTick: apiCron,
  start: true,
  timeZone: 'America/Los_Angeles'
});


