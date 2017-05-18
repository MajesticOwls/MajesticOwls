var express = require('express');
var router = express.Router();
var cntrl = require('./controller.js');


router.get('/getYelp', cntrl.getYelp);
router.get('/getFourSquare', cntrl.getFourSquare);


module.exports = router;