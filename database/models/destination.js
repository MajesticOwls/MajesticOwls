const mongoose = require('mongoose');

var destinationSchema = new mongoose.Schema({
  destination: {type: String, unique: true, dropDups: true },
  coordinates: { lat: Number, lng: Number },
  toptenEats: [],
  toptenSights: []
})

module.exports = mongoose.model('Destination', destinationSchema);

// module.exports = destinationModel