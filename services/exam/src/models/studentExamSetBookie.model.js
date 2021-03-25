const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let StudentExamSetBookie = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    examSetId: String,
    examSetBookieId: String
}, {
   collection: 'studentExamSetBookies'
});

module.exports = mongoose.model('StudentExamSetBookie', StudentExamSetBookie);