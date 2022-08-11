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
    dataSupport,
    destroyData,
    editData,
    destroyImage,
    editEvent,
    destroyEvent,
    dataStructure,
    createStructure,
    destroyStructure
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
route.get('/data/structure', dataStructure)

// Only user admin can access
route.post('/images',upload.single('image'),postImage)
route.post('/news',upload.single('image'),createNews)
route.post('/event',upload.single('image'),createEvent)
route.post('/register',register)
route.post('/data/structure',upload.single('image'),createStructure)

route.patch('/news/:id',editData)
route.patch('/event/:id',editEvent)

route.delete('/news/:id',destroyData)
route.delete('/image/:id',destroyImage)
route.delete('/event/:id',destroyEvent)
route.delete('/data/structure/:id',destroyStructure)

// input comentar forbiden to ll user execpt sekertaris jendral
// notification
// color
// order clothes and convert to exel

// All errors can handler here
route.use(errors)

module.exports = route