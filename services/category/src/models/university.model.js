const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let University = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    department: String,
    departmentPoint: String,
    departmentScore: String
}, {
   collection: 'university'
});

module.exports = mongoose.model('University', University);