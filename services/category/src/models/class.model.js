const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Class = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    isPrivate: Boolean,
    isPublished: Boolean,
    studentsId: [String],
    classCode: String,
    teacherId: String,
}, { 
    collection: 'class'
});

module.exports = mongoose.model('Class', Class);