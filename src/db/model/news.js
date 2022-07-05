const mongoose = require('mongoose')
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

const News = mongoose.model('news',news)

module.exports = News