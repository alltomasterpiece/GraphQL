const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let School = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    cityId: String,
    districtId: String,
    name: String,
}, { 
    collection: 'schools'
});

module.exports = mongoose.model('School', School);