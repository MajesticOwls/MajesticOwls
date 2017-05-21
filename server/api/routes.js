var express = require('express');
var router = express.Router();
var cntrl = require('./controller.js');


router.get('/getYelp', cntrl.getYelp);
router.get('/getFourSquare', cntrl.getFourSquare);
router.get('/savelocation', cntrl.saveLocation);
router.get('/getAllSavedCities', cntrl.getAllSavedCities);
router.get('/getCityCoords', cntrl.getCityCoords);

module.exports = router;