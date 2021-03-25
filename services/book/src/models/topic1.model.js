const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Topic1 = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    lessonId: String,
    title: String,
}, {
   collection: 'topics1'
});

module.exports = mongoose.model('Topic1', Topic1);