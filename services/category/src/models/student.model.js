const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Student = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    schoolId: String,
    studentMemberTypeId: String,
    name: String,
    gender : String,
    surname: String,
    dateOfBirth: String,
    password: String,
    gsm: String,
    email: String,
    username: String,
    trIdentityno: String,
    graduatefield: String, 
    exam: String, 
    examfield: String,
    city: String, 
    district: String, 
    school: String, 
    secondarySchool: String,
    confirmationKey: Number,
    isConfirmed: Boolean,
    registrationDate: String,
    facebook: String,
    instagram: String,
    twitter: String,
    image: String,
    token: String,
    universityPreferenceList : [String],
    classes : [String]
}, {
   collection: 'students'
});

module.exports = mongoose.model('Student', Student);