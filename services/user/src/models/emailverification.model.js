const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The Model represent EmailValidation Scenario for the registered user to manage the token and registration flow
//https://trello.com/c/bQYJy7VY/1-login-and-register-for-admin-teacherbackend-and-frontend
let Email = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: String,
    isValid: Boolean,
    userId: String,
    type: String
}, {
   collection: 'emails'
});

module.exports = mongoose.model('Email', Email);