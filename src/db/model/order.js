const mongoose = require('mongoose')
const timeFromat = require('../../helpers/time')
const { Schema } = mongoose

const order = new Schema({
    name: {
        type: String,
        required : true
    },
    nim: {
        type: String,
        required : true
    },
    university : {
        type : String,
        required: true
    },
    status : {
        type : String,
        default : false,
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

const Order = mongoose.model('order',order)

module.exports = Order