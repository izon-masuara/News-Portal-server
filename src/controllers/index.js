const { default: mongoose } = require("mongoose")
const File = require('../db/model/files')
const Chunk = require('../db/model/chunks')
const getfiles = require('../helpers/getfiles')

const getImages = async (req, res, next) => {
    try {
        const image = await File.find({})
        if(image.length !== 0){
            res.status(200).json(image)
        }
    } catch (err) {
        console.log(err)
    }
}

const getNews = (req, res, next) => {
    res.status(200).json(['News'])
}

const getEvents = (req, res, next) => {
    res.status(200).json(['News'])
}

const getDeteailNews = (req, res, next) => {
    const { id } = req.params
    res.status(200).json({})
}

const getDetailEvents = (req, res, next) => {
    const { id } = req.params
    res.status(200).json({})
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

module.exports = {
    getImages,
    getNews,
    getEvents,
    getDeteailNews,
    getDetailEvents,
    postImage,
    viewImage
}