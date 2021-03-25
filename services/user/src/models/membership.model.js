const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The model represent the Membership added by the admin to portal to be displayed on the App side for subscriptions.
//https://trello.com/c/D7VRcwHQ/32-51-creating-membership-plans
let Membership = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    price: String,
    date: String,
    paymenttitle: String,
    productLink: String,
    availableModule: [String]
}, {
   collection: 'membership'
});

module.exports = mongoose.model('Membership', Membership);