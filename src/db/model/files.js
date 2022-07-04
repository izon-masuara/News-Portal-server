const mongoose = require('mongoose')
const { Schema } = mongoose

const fileModel = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    length: {
        type: Number
    },
    chunkSize: {
        type: Number
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    filename: {
        type: String
    },
    contentType: {
        type: String
    }
})

const File = mongoose.model('fs.files', fileModel)

module.exports = File