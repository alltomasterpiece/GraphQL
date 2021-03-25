const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let StudentBookTestAnswer = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    bookTestAnswerId: String,
    studentBookTestId: String,
    questionNumber: Number,
    studentAnswer: {
        type: String,
        enum: ['Unknown', 'A', 'B', 'C', 'D', 'E'],
        default: 'Unknown'
    },
    isCorrect: Boolean,
    timeSpent: Number,
    questionPhoto: String,
    solutionPhoto: String
}, {
   collection: 'studentBookTestAnswers'
});

module.exports = mongoose.model('StudentBookTestAnswer', StudentBookTestAnswer);