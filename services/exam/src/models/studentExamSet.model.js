const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let StudentExamSet = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    examSetId: String
}, {
   collection: 'studentExamSets'
});

module.exports = mongoose.model('StudentExamSet', StudentExamSet);