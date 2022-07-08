const {
    File, Chunk, News, Event,Images,Users
} = require('../db/model')
const {
    hasingPass,
    comparePass
} = require('../helpers/securePass')
const getfiles = require('../helpers/getfiles')
const {
    generateToken,
} = require('../helpers/jwt')

const getImages = async (req, res, next) => {
    try {
        const image = await Images.find({})
        res.status(200).json(image)
    } catch (err) {
        console.log(err)
    }
}

const getNews = async (req, res, next) => {
    try {
        const news = await News.find({})
        res.status(200).json(news)
    } catch (err) {

    }
}

const getEvents = async (req, res, next) => {
    try {
        const events = await Event.find({})
        res.status(200).json(events)
    } catch (err) {
        console.log(err)
    }
}

const postImage = async (req, res, next) => {
    const id = req.files.map(el => el.id)
    try {
        const data = await Images.create({files_id:id})
        res.send(data)
    } catch (error) {
        console.log(error, '<<<<')
    }
}

const viewImage = async (req, res, next) => {
    const { id } = req.params
    try {
        const found = await File.findById(id)
        const { filename } = found
        const image = getfiles(filename)
            ; (await image).on('data', data => {
                // const blob = new Blob([data],{type:'image'})
                res.status(200).end(data)
            })
    } catch (err) {
        res.json(err)
    }
}

const createNews = async (req, res, next) => {
    const { id } = req.file
    const { title, content } = req.body
    const buf = Buffer.from(content, 'utf-8')
    const payload = {
        title,
        img: id,
        content: buf
    }
    try {
        await News.create(payload)
        res.status(200).json("Success Added News")
    } catch (err) {
        const message = err.errors.title.properties.message || 'Error'
        await File.deleteOne({ filename })
        await Chunk.deleteOne({ files_id: req.file.id })
        next({
            code: 404,
            message
        })
    }
}

const createEvent = async (req, res, next) => {
    const { id } = req.file
    const { title, content,time } = req.body
    const buf = Buffer.from(content, 'utf-8')
    const payload = {
        title,
        img: id,
        content: buf,
        time
    }
    try {
        await Event.create(payload)
        res.status(200).json("Success Added News")
    } catch (err) {
        const message = err.errors || 'Error'
        await File.deleteOne({ filename })
        await Chunk.deleteOne({ files_id: req.file.id })
        next({
            code: 404,
            message
        })
    }
}

const login = async(req,res,next) => {
    const { email,password } = req.body
    try {
        const findData = await Users.findOne({email})
        if(findData.length === 0){
            throw {
                code : 404,
                message : "Email or password are wrong"
            }
        }else {
            const truePass = comparePass(password,findData.password)
            if(!truePass){
                throw {
                    code : 404,
                    message : "Email or password are wrong"
                }
            }else {
                res.status(200).json(generateToken(email))
            }
        }
    } catch (err) {
        
    }
}

const register = async(req,res,next) => {
    const { email,password } = req.body
    const hass = hasingPass(password)
    const payload = {
        email,
        password : hass,
        role : 'member'
    }
    try {
        const find = await Users.find({email})
        if (find.length !== 0) {
            throw {
                code : 400,
                message : "Data already exits"
            }
        }else {
            const create = await Users.create(payload)
            res.status(201).json('User has been created')
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getImages,
    getNews,
    getEvents,
    postImage,
    viewImage,
    createNews,
    createEvent,
    login,
    register
}