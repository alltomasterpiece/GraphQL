const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The model Friendship Model for accepting and sending requests
//This Models is not currently Used fully as per capability. (Can be discarded for the future Reference if not required)
let Friend = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    teacherId: String,
    isAccepted: Boolean,
    isSenderAsStudent: Boolean,
}, {
   collection: 'friends'
});

module.exports = mongoose.model('Friend', Friend);