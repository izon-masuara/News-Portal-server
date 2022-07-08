const mongoose = require('mongoose')
const { Schema } = mongoose

// create validation on model

const users = new Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now(),
        required : true
    },
    updated_at : {
        type : Date,
        default : Date.now(),
        required : true
    },
    role : {
        type : String,
        required : true
    }
})



const Users = mongoose.model('users',users)

module.exports = Users