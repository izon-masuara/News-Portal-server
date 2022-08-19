const mongoose = require('mongoose')
const timeFromat = require('../../helpers/time')
const { Schema } = mongoose

const comment = new Schema({
    comment: {
        type: String,
        required : true
    },
    created_at: {
        type: String,
        default: timeFromat(),
        required: true
    },
    updated_at : {
        type : String,
        default : Date.now(),
        required: true
    }
})

const Comment = mongoose.model('comment',comment)

module.exports = Comment