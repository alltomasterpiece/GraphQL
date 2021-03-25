const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnswerKeyEditorQuestion = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin: String,
    book: String,
    BookUnit: [String],
    BookUnitSection: [String],
    tests: [String],
    role: [String],
}, { 
    collection: 'AnswerKeyEditorQuestion'
});

module.exports = mongoose.model('AnswerKeyEditorQuestion', AnswerKeyEditorQuestion);