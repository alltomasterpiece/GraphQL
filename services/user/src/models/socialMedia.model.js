const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//The model refers to the social media links to be added by the admin.
//https://trello.com/c/RDtNi0iu/34-61-whatsapp-link
//https://trello.com/c/uW8TwnEB/40-add-social-media-links
let SocialMedia = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    link: String
}, {
   collection: 'socialmedia'
});

module.exports = mongoose.model('SocialMedia', SocialMedia);