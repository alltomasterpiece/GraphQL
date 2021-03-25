const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let PracticeExamBooklet = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    examSet: String,
    title: String
}, {
   collection: 'practiceexambooklet'
});

module.exports = mongoose.model('PracticeExamBooklet', PracticeExamBooklet);