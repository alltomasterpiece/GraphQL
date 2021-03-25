const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The Modal Refers to Management of the Page. Managing the status if the page is kept down for some purpose.
//https://trello.com/c/90k7VWGg/39-91-page-maintaining-website-panels
let PageStatus = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    isDown: String,
}, {
   collection: 'pagestatus'
});

module.exports = mongoose.model('PageStatus', PageStatus);