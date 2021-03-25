const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Question = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lesson: String,
    topic: [String],
    subtopic: [String],
    title: String,
    questionPhoto: String,
    solutionPhoto: String
}, {
   collection: 'question'
});

module.exports = mongoose.model('Question', Question);