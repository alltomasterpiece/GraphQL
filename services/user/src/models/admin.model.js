const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The modal represents Admins added to our platform as per the Ticket description.
//https://trello.com/c/bQYJy7VY/1-login-and-register-for-admin-teacherbackend-and-frontend
let Admin = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    surname: String,
    email: String,
    city: String,
    district: String,
    phone: String,
    role: String
}, {
   collection: 'admin'
});

module.exports = mongoose.model('Admin', Admin);