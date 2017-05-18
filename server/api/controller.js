const express = require('express')
const router = express.Router()
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');

module.exports.getYelp = function(req, res) {
  //Yelp Fusion's OAuth 2.0 credentials https://www.yelp.com/developers/v3/manage_app
  const clientId = '0jgaCvkiiSDmlRChqiBxdw';
  const clientSecret = 'YymoKgxeD7oOKZNI4Musd0iKqdLVi8pUbRWidhwSDRN9n6W7JR5YD96BsT6cGhEP';

  const searchRequest = {
    term:'food',
    location: req.query.location,
    limit: 10,
    sort_by: 'review_count'
  };

  yelp.accessToken(clientId, clientSecret)
    .then(response => {
      const client = yelp.client(response.jsonBody.access_token);

      client.search(searchRequest).then(response => {
        const searchResults = response.jsonBody.businesses;
        const prettyJson = JSON.stringify(searchResults, null, 4);
        res.send(searchResults);
      });
    })
    .catch(e => {
      console.log(e);
    });
};

module.exports.getFourSquare = function(req, res) {

}