const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The Model Represents the registered managers on the platform which can help login and manage the plaform for the App users.
//https://trello.com/c/bQYJy7VY/1-login-and-register-for-admin-teacherbackend-and-frontend
let Manager = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    roleId: String,
    districtId: String,
    isSystemAdministrator: Boolean,
    name: String,
    surname: String,
    dateOfBirth: String,
    password: String,
    gsm: String,
    email: String,
    city: String,
    district: String,
    confirmationKey: Number,
    isConfirmed: Boolean,
    registrationDate: String,
    facebook: String,
    twitter: String,
    instagram: String,
    image: String,
    token: String,
}, {
   collection: 'managers'
});

module.exports = mongoose.model('Manager', Manager);