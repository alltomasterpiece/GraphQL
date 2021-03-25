const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

// BookTest which is solved by a certain student
let StudentBookTest = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    bookId: String,
    bookUnitId: String,
    bookUnitSectionId: String,
    bookTestId: String,
    examId: String,
    lessonId: String,
    topicId: String,
    testName: String,
    questionCount: Number,
    date: { type: Date, default: Date.now },
    timeSpent: String,
    solvedQuestionCount: Number,
    correctAnswerCount: Number,
    incorrectAnswerCount: Number,
    blankAnswerCount: Number
}, {
   collection: 'studentBookTests'
});

module.exports = mongoose.model('StudentBookTest', StudentBookTest);