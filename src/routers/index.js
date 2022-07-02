const route = require('express').Router()
const { getImages } = require('../controllers')

route.get('/images',getImages)

module.exports = route