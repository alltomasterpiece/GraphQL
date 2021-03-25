const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
// This modal refers to the Test Answers as per the ticket description by Admin.
//https://trello.com/c/j06Td8ll/17-add-answers-for-tests
let BookTestAnswer = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bookTestId: String,
    subTopicId: String,
    questionNumber: Number,
    correctAnswer: {
        type: String,
        enum: ['Unknown', 'A', 'B', 'C', 'D', 'E'],
        default: 'Unknown'
    },
}, {
   collection: 'bookTestAnswers'
});

module.exports = mongoose.model('BookTestAnswer', BookTestAnswer);