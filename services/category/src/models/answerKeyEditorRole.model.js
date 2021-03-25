const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnswerKeyEditorPraticeExam = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin: String,
    role: [String],
    practiceExamSet: [String],
    bookletTest: [String]
}, { 
    collection: 'AnswerKeyEditorPraticeExam'
});

module.exports = mongoose.model('AnswerKeyEditorPraticeExam', AnswerKeyEditorPraticeExam);