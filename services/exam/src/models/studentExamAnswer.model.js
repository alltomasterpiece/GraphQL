const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let StudentExamAnswer = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    examSetTestId: String,
    studentExamTestId: String,
    examAnswerId: String,
    questionNumber: Number,
    studentAnswer: {
        type: String,
        enum: ['Unknown', 'A', 'B', 'C', 'D', 'E'],
        default: 'Unknown'
    },
    isCorrect: Boolean,
    date: String,
    timeSpent: Number
}, {
   collection: 'studentExamAnswers'
});

module.exports = mongoose.model('StudentExamAnswer', StudentExamAnswer);