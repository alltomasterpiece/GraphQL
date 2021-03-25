const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let BookletTestAnswer = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    topic : String,
    subtopic : String,
    bookletTestId: String,
    answer: [String]
}, {
   collection: 'booklettestanswer'
});

module.exports = mongoose.model('BookletTestAnswer', BookletTestAnswer);