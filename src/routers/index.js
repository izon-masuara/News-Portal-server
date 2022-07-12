const route = require('express').Router()
const upload = require('../middlewares/upload')
const {
    getImages,
    getNews,
    getEvents,
    postImage,
    viewImage,
    createNews,
    createEvent,
    login,
    register,
    scholarship,
    dataSupport
} = require('../controllers/index')
const errors = require('../middlewares/errorhandlers')

// All user can access
route.get('/images',getImages)
route.get('/image/:id',viewImage)
route.get('/news',getNews)
route.get('/events',getEvents)
route.post('/login',login)

// User with token can access
route.get('/scholarship',scholarship)
route.get('/data/support',dataSupport)

// Only user admin can access
route.post('/images',upload.array('image'),postImage)
route.post('/news',upload.single('image'),createNews)
route.post('/event',upload.single('image'),createEvent)
route.post('/register',register)
// All errors can handler here
route.use(errors)

module.exports = route