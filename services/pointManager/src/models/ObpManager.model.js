const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The model is for the ObpConstant requires in the Point calculation manager services
let ObpManager = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    obpConstant: Number,
}, {
   collection: 'PointManager'
});

module.exports = mongoose.model('ObpManager', ObpManager);