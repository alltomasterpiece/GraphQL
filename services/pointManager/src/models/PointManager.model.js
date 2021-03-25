const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The model is for the Point Manager requires in the Point calculation manager services
let PointManager = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pointConstant: Number
}, {
   collection: 'PointManager'
});

module.exports = mongoose.model('PointManager', PointManager);