const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');
// mongoose.connect('mongodb://localhost/greenfield');
mongoose.connect('mongodb://group:Hackreactor21@ds127101.mlab.com:27101/greenfield');
mongoose.Promise = require('bluebird');

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/greenfield');

mongoose.connect('mongodb://group:Hackreactor21@ds127101.mlab.com:27101/greenfield');
mongoose.Promise = require('bluebird');


var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});


var userSchema = mongoose.Schema({

    user: String,
    history: String
  })

userSchema.plugin(findOrCreate)


var  historyStorage = mongoose.model('historyStorage', userSchema);


module.exports = historyStorage;
