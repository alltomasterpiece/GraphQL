const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let ExamTest = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    examSetId: String,                              // Appended by backend developer(handsomedev19)
    examSetBookieId: String,    
    title: String,
    sequence: {type: Number, default: 0},
    questionCount: {type: Number, default: 0}
}, {
   collection: 'examTests'
});

module.exports = mongoose.model('ExamTest', ExamTest);