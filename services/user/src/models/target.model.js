const mongoose = require('mongoose');
const bookCategoryModel = require('../../../exam/src/models/bookCategory.model');
const Schema = mongoose.Schema;


let Target = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    studentId: String,
    name: String,
    targetedTime: Number,
    startTime: String,
    reachedTime: {
        type: String,
        enum: ['Today', 'Tomorrow', 'Special'],
        default: 'Today'
    },
    reachedStartTime: {type: String, default: null},
    reachedEndTime: {type: String, default: null},
    studyDay: [Number],
    color: String,
    ranking: Number,
    created_at: String,
    focusingLetter: String,
    studiedHours: Number,
    percentageOfCompletion: Number,
    studiedDates: [{
        startDate: {type: Date, default: null},
        endDate: {type: Date, default: null}
    }],                           // each start time for target is registered by user clicking start-stop button (82 p of app guide)
    studiedTimes: [Number],
    breakCount: Number,
    givenBreakCount: Number,
    score: Number,
    emegencyBreakCount: Number,
    lastStartTime: Date,
    lastEndTime: Date,
    ranking: Number
}, {
   collection: 'target'
});

module.exports = mongoose.model('Target', Target);