const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//This field is defined for the Exams Required in the point Calculation Manager.
let ExamField = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    lessonId: [String],
    splintConstant: Number
}, {
   collection: 'ExamField'
});

module.exports = mongoose.model('ExamField', ExamField);