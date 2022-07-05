const route = require('express').Router()
const upload = require('../middlewares/upload')
const {
    getImages,
    getNews,
    getEvents,
    postImage,
    viewImage,
    createNews
} = require('../controllers/index')
const errors = require('../middlewares/errorhandlers')

// All user can access
route.get('/images',getImages)
route.get('/image/:id',viewImage)
route.get('/news',getNews)
route.get('/events',getEvents)
// Only admin user can access
route.post('/images',upload.array('image'),postImage)
route.post('/news',upload.single('image'),createNews)

/**
 * 
 * ketioka post images sebaiknya buat model baru untuk images agar nnti mengakses fs yg smaa
 * namun id dari model yang berbeda misal image id model news dan event akan berbeda
 * 
 */

route.use(errors)

module.exports = route