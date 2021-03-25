const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
// This Model is for the Books added by the Admin as per the Ticket Description
//https://trello.com/c/8RMokrPH/11-add-book
let Book = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    examId: [String],
    categoryId: String,
    title: String,
    publisherId: String,
    publishYear: Number,
    isbn: String,
    level: {
        type: Number,
        default: 1
    },
    showToUsers: Boolean,
    image: String,
    students: [String]
}, {
   collection: 'books'
});

module.exports = mongoose.model('Book', Book);