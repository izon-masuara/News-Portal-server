const bcrypt = require('bcrypt')

const salt = 15

const hasingPass = (password) => {
    return bcrypt.hashSync(password, salt);
}

const comparePass = (planPass,dbPass) => {
    return bcrypt.compareSync(planPass, dbPass)
}

module.exports = {
    hasingPass,
    comparePass
}