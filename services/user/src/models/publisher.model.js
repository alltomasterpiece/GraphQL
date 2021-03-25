const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The model refers to CRUD operation for admin to add publishers to be added on the portal.
//https://trello.com/c/30k3C19u/16-17-publisher
let Publisher = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    logo: String,
    name: String,
    email: String,
    phone: String,
    address: String,
}, {
   collection: 'publishers'
});

module.exports = mongoose.model('Publisher', Publisher);