const mongoose = require('mongoose')
const { Schema } = mongoose
const timeFromat = require('../../helpers/time')

const structure = new Schema({
    field : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    img : {
        type : String,
        required : true
    },
    content : {
        type : Buffer
    },
    created_at : {
        type : String,
        default : timeFromat(),
        required : true 
    },
    updated_at : {
        type : String,
        default : Date.now(),
        required : true
    }
})

const Structure = mongoose.model('structure',structure)

module.exports = Structure