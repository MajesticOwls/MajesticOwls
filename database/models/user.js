const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    user: String,
    month: String,
    day: String,
    year: String,
    Airline: String,
    flight: String,
    destination: String

});

module.exports = mongoose.model('User', userSchema)