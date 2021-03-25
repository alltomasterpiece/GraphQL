const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
//This modal represents Students modal and This modal is dynamic and can be modified as per the requirements by the user.
//The modal represent the students registered and students added by admin both.
//https://trello.com/c/GUfHGPx2/2-login-and-register-for-studentjust-backend
let Student = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    schoolId: String,
    studentMemberTypeId: String,
    membershipStartDate: String,
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
    guideTeacher : [String],
    universityPreferenceList : [ {
        number : Number,
        UniversityId : String
    }],
    classes : [String]
}, {
   collection: 'students'
});

module.exports = mongoose.model('Student', Student);