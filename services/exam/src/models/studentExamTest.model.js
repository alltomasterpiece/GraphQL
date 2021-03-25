const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let StudentExamTest = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    examSetId: String,                             
    examSetBookieId: String,
    examTestId: String,    
    date: Date,
    timeSpent: String,
    solvedQuestionCount: Number,
    correctAnswerCount: Number,
    incorrectAnswerCount: Number,
    blankAnswerCount: Number
}, {
   collection: 'studentExamTests'
});

module.exports = mongoose.model('StudentExamTest', StudentExamTest);