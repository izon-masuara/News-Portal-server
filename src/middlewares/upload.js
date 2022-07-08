const multer = require('multer')
const { GridFsStorage } = require('multer-gridfs-storage')
require('dotenv').config()

const storage = GridFsStorage({
    url: process.env.URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", 'image/jpg','image/jpeg'];
        if (match.indexOf(file.mimetype) === -1) {
            const message = `file ${file.originalname} do not added because file is not png/jpg`
            throw  ({
                code : 404,
                message
            })
        }
        return {
            bucketName: 'fs',
            filename: `${Date.now()}-${file.originalname}`
        };
    }
})

const upload = multer({ storage })
module.exports = upload