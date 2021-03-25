const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema

// Book which is added by a certain student
let StudentBook = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    bookId: String
}, {
   collection: 'studentBooks'
});

module.exports = mongoose.model('StudentBook', StudentBook);