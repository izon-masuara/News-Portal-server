const errors = (err,req,res,next) => {
    switch (err.code) {
        case 404:
            res.status(err.code).json(err.message)
            break;
        case 400 :
            res.status(err.code).json(err.message)
            break;
        default:
            break;
    }
}

module.exports = errors