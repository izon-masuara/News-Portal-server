const mongoose = require('mongoose')
const { Schema } = mongoose

const event = new Schema({
    title: {
        type: String,
        required : true
    },
    img: {
        type: String,
        required : true
    },
    content : {
        type : Buffer,
        required: true
    },
    time : {
        type : String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updated_at : {
        type : Date,
        default : Date.now(),
        required: true
    }
})

const Event = mongoose.model('events',event)

module.exports = Event