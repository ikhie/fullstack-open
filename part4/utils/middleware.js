const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')



const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        request.token = authorization.substring(7)
    }else{
        request.token = null;
    }
    next()
}

const userExtractor = async(request, response, next) => {
    if(request.token){
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        request.user = decodedToken.id.length > 0 ? await User.findById(decodedToken.id) : null
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}
