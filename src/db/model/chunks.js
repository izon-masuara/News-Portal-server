const mongoose = require("mongoose")
const { Schema } = mongoose

const chunks = new Schema({
    files_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    n: {
        type: Number,
    },
    data: {
        type: Buffer,
    },
});

const Chunk = mongoose.model('fs.chunks',chunks)

module.exports = Chunk