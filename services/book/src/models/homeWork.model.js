const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HomeWork = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teacherId : String,
    student: [String],
    class: [String],
    title: String,
    deadline: String,
    description: String,
    questionBankBook: String,
    bookUnit: String,
    sections: [String],
    tests:[String],
    examSet: String,
    examBooklet: String,
    bookletTests: [String]
}, {
   collection: 'homework'
});

module.exports = mongoose.model('HomeWork', HomeWork);