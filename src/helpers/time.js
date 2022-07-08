const timeFormat = () => {
    const date = new Date()
    const dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    return dateString
}

module.exports = timeFormat