const mongoose = require('mongoose')
const timeFromat = require('../../helpers/time')
const { Schema } = mongoose

const news = new Schema({
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

const News = mongoose.model('news',news)

module.exports = News