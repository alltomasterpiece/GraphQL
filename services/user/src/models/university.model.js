const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The modal represents the universities to be added by the admin on the admin section.
//https://trello.com/c/Tj8JeEGF/46-18-add-university
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