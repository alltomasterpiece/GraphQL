const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
//This modal refers to user Privacy statements to be added by the Admin at the admin panel.
//https://trello.com/c/Cz3LXw5J/4-privacy-and-user-agreement
let Userprivacy = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statement: String,
    identifier: Number 
}, {
   collection: 'userprivacy'
});

module.exports = mongoose.model('Userprivacy', Userprivacy);