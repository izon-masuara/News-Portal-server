const {
    File,Chunk,News
} = require('../db/model')
const getfiles = require('../helpers/getfiles')

const getImages = async (req, res, next) => {
    try {
        const image = await File.find({})
        res.status(200).json(image)
    } catch (err) {
        console.log(err)
    }
}

const getNews = async(req, res, next) => {
    try {
        const news = await News.find({})
        res.status(200).json(news)
    } catch (err) {
        
    }
}

const getEvents = (req, res, next) => {
    res.status(200).json(['News'])
}

const postImage = async (req, res, next) => {
    try {
        const data = await File.find({})
        res.send(data)
    } catch (error) {
        console.log(error,'<<<<')
    }
}

const viewImage = async(req,res,next) => {
    const { id } = req.params
    try {
        const found = await File.findById(id)
        const { filename } = found
        const image = getfiles(filename)
        ;(await image).on('data',data => {
            res.status(200).end(data)
        })
    } catch (err) {
        res.json(err)
    }
}

const createNews = async(req,res,next) => {
    const { filename } = req.file
    const { title,content } = req.body
    const buf = Buffer.from(content,'utf-8')
    const payload = {
        title,
        img : filename,
        content : buf
    }
    try {
        await News.create(payload)
        res.status(200).json("Success Added News")
    } catch (err) {
        const message = err.errors.title.properties.message || 'Error'
        await File.deleteOne({filename})
        await Chunk.deleteOne({files_id:req.file.id})
        next({
            code : 404,
            message
        })
    }
}

module.exports = {
    getImages,
    getNews,
    getEvents,
    postImage,
    viewImage,
    createNews
}