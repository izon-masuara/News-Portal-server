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
    destroyStructure,
    order,
    editStatus,
    getOrder,
    comment,
    getComment
} = require('../controllers/index')
const errors = require('../middlewares/errorhandlers')

// All user can access
route.get('/images',getImages)
route.get('/image/:id',viewImage)
route.get('/news',getNews)
route.get('/events',getEvents)
route.get('/order',getOrder)
route.get('/comments',getComment)
route.post('/login',login)
route.post('/order',order)
route.post('/comment',comment)

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
route.patch('/status/:id',editStatus)

route.delete('/news/:id',destroyData)
route.delete('/image/:id',destroyImage)
route.delete('/event/:id',destroyEvent)
route.delete('/data/structure/:id',destroyStructure)

/**
 * 
 *  Register
 *  order clothes and convert to exel
 *  input comentar forbiden to ll user execpt sekertaris jendral
 *  #3A67B0
 * 
 */

// All errors can handler here
route.use(errors)

module.exports = route