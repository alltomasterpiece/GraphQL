const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GraduateField = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String
}, { 
    collection: 'graduateField'
});

module.exports = mongoose.model('GraduateField', GraduateField);