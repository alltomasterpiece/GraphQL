const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GraduateStatus = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    exam: String,
}, { 
    collection: 'GraduateStatus'
});

module.exports = mongoose.model('GraduateStatus', GraduateStatus);