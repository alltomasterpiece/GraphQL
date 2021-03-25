const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let ExamSet = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    examId: String,
    categoryId: String,
    title: String,
    publisherId: String,
    publishYear: Number,
    isbn: String,
    level: Number,
    showToUsers: Boolean,
    image: String,
}, {
   collection: 'examSets'
});

module.exports = mongoose.model('ExamSet', ExamSet);