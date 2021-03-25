const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let PraticeExam = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    photoId: String,
    title: String,
    category: String,
    exam: String,
    publisher: String,
    isbn: String,
    releaseYear: String,
    level: {
        type: Number,
        default: 1
    },
    showToUser: Boolean
}, {
   collection: 'praticexam'
});

module.exports = mongoose.model('PraticeExam', PraticeExam);