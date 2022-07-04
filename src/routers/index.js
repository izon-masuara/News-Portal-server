const route = require('express').Router()
const upload = require('../middlewares/upload')
const {
    getImages,
    getNews,
    getEvents,
    getDeteailNews,
    getDetailEvents,
    postImage,
    viewImage
} = require('../controllers/index')
const errors = require('../middlewares/errorhandlers')

// All user can access
route.get('/images',getImages)
route.get('/image/:id',viewImage)
route.get('/news',getNews)
route.get('/events',getEvents)
route.get('/news/:id',getDeteailNews)
route.get('/event/:id',getDetailEvents)
// Only admin user can access
route.post('/images',upload.array('image'),postImage)

route.use(errors)

module.exports = route