const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The section refers to Book Question test for the Admin Section as per the ticket description
//https://trello.com/c/J6wO7op2/15-add-questions-tests
let BookTest = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookId: String,
    bookUnitId: String,
    bookUnitSectionId: String,
    testName: String,
    questionCount: Number
}, {
   collection: 'bookTests'
});

module.exports = mongoose.model('BookTest', BookTest);