const express = require('express');
const request = require('request');
const yelp = require('yelp-fusion');
const Destination = require('../../database/models/destination');
 

module.exports.yelpAPICall = function(location, callback) {
  //Yelp Fusion's OAuth 2.0 credentials https://www.yelp.com/developers/v3/manage_app
  const clientId = '0jgaCvkiiSDmlRChqiBxdw';
  const clientSecret = 'YymoKgxeD7oOKZNI4Musd0iKqdLVi8pUbRWidhwSDRN9n6W7JR5YD96BsT6cGhEP';

  const searchRequest = {
    term:'food',
    location: location,
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
    Destination.update({ destination: location },
      { $set: { toptenEats: searchResults } }, 
      function(err, data){
        if (err){
          console.log(err)
        } else {
          console.log("Successfully entered")
        }
      }
    );
    callback(searchResults);
  });
}

module.exports.foursquareAPICall = function(location, callback) {

      const token = '4MVKT2MMAUFFFU3FODWZEU2LLLC4KXPZE0F0NJM0CYCTGHM5'
      var location = location;

      const getData = new Promise((resolve, reject) => {
        var url = `https://api.foursquare.com/v2/venues/explore?oauth_token=${token}&near=${location}&limit=10&v=20170517&query=Popular with Visitors&venuePhotos=1`
        request.get(url, (err, result) => {
          resolve(result);
        })
      });

      getData.then( result => {
        var parsedbody = JSON.parse(result.body)

        Destination.update({ destination: location },
          { $set: { toptenSights: result.body, coordinates: parsedbody.response.geocode.center } }, 
          function(err, data){
            if (err){
              console.log(err)
            } else {
              console.log("Successfully entered")
            }
          }
        );
        callback(result.body)
      });

}


