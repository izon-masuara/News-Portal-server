const getImages = (req,res) => {
    res.status(200).json(['Images'])
}

module.exports = {
    getImages
}