const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let BookletTest = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    examSet: String,
    booklet: String,
    title: String,
    lesson: [String],
    questions: Number,
    sortOrder: String
}, {
   collection: 'booklettest'
});

module.exports = mongoose.model('BookletTest', BookletTest);