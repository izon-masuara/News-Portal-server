const jwt = require('jsonwebtoken')

const secret = 'shhhh'

const generateToken = (payload) => {
    return jwt.sign(payload,secret)
}

const decodeToken = (token) => {
    return jwt.decode(token,secret)
}

module.exports = {
    generateToken,
    decodeToken
}