const createError = (message, code = 500) => {
    return {
        error: message,
        code,
    }
}

module.exports = {
    createError,
}
