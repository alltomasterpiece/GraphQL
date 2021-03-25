const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The modal has been created keeping in mind the notification & annoucements created by the manager for the users.
//https://trello.com/c/NvUBuV89/38-81-send-notifications-and-announcements
let Notification = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String
}, {
   collection: 'notification'
});

module.exports = mongoose.model('Notification', Notification);