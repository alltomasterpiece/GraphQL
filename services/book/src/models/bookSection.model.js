const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
// This modal refers to Book Sections Unit for the admin end as per the ticket
//https://trello.com/c/s1dhLM2y/13-add-book-sections-unit
let BookSection = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookId: String,
    unitId: String,
    topicId: [String],
    title: [String]
}, {
   collection: 'bookSection'
});

module.exports = mongoose.model('BookSection', BookSection);