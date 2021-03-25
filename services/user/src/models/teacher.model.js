const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//This modal represents Teacher modal and This modal is dynamic and can be modified as per the requirements by the user.
//The modal represent the Teacher registered and Teacher added by admin both.
//https://trello.com/c/bQYJy7VY/1-login-and-register-for-admin-teacherbackend-and-frontend
let Teacher = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    schoolId: String,
    roleId: String,
    name: String,
    surname: String,
    dateOfBirth: String,
    password: String,
    gsm: String,
    school: String,
    schoolBranch: [String],
    city: String,
    district: String,
    email: String,
    confirmationKey: Number,
    isConfirmed: Boolean,
    registrationDate: String,
    facebook: String,
    instagram: String,
    twitter: String,
    youtube : String,
    image: String,
    token: String,
    friends: [String],
    friendRequests: [String],
    students: [String]
}, {
   collection: 'teachers'
});

module.exports = mongoose.model('Teacher', Teacher);