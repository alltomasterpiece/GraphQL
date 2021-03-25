const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The model is adding and managing point lesson requires in the Point calculation manager services.
let PointLesson = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String, 
    numberOfQuestion: Number, 
    ScoreConstant: Number
}, {
   collection: 'PointLesson'
});

module.exports = mongoose.model('PointLesson', PointLesson);