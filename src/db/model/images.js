const mongoose = require('mongoose')
const { Schema } = mongoose

const images = new Schema({
    uploadDate: {
        type: Date,
        default: Date.now
    },
    files_id: {
        type: []
    }
})

const Images = mongoose.model('images', images)

module.exports = Images