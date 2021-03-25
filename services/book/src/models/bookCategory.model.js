const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
// This Model is for the Books Categories added by the Admin as per the Ticket Description
//https://trello.com/c/n3ra6JQB/7-13-book-categories
let BookCategory = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    exam: String,
    category: {
        type: String,
        enum: ['questionbank', 'ExamSet']
    }
}, {
   collection: 'bookCategory'
});

module.exports = mongoose.model('BookCategory', BookCategory);