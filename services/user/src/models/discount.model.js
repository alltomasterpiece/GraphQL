const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The modal represents Admins added to our platform as per the Ticket description.
//https://trello.com/c/bQYJy7VY/1-login-and-register-for-admin-teacherbackend-and-frontend
let DiscountCode = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: String,
    value: String
}, {
   collection: 'DiscountCode'
});

module.exports = mongoose.model('DiscountCode', DiscountCode);