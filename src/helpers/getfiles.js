const mongoose = require("mongoose")

const getImages = async (id) => {
    const bucket = new mongoose.mongo.GridFSBucket(
        mongoose.connection.db, {
        bucketName: 'fs'
    }
    )
    let file = bucket.openDownloadStreamByName(id)
    return file
}

module.exports = getImages