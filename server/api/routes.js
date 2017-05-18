var express = require('express');
var router = express.Router();
var cntrl = require('./controller.js');


router.get('/getYelp', cntrl.getYelp);


module.exports = router;