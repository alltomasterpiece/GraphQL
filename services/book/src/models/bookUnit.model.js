const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The modal refers to adding of the Book Unit by the Admin for the Books as per the ticket description.
//https://trello.com/c/o8BKDTpa/12-add-book-unit
// Book Unit has one-to-one relationship with Lesson(e.g. "Mathmatics", "Physics", "History").

let BookUnit = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookId: String,
    lessonId: String,
    title: [String],
}, {
   collection: 'bookUnits'
});

module.exports = mongoose.model('BookUnit', BookUnit);