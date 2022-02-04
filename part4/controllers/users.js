const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const { request, response } = require('express')
const User = require('../models/user')

const userNameUnique = async (username) => {
    const query = User.findOne({username: username})
    const result = await query.exec()
    return result === null
}

const returnMessage = (name) => {
    return `${name} needs to be at least 3 characters long` 
}

usersRouter.post('/', async(request, response) => {

    const body = request.body

    if(body.password.length < 3){
        return response.status(400).json({error: returnMessage('password')})
    }

    if(body.username.length < 3){
        return response.status(400).json({error : returnMessage('username')})
    }


    if(await userNameUnique(body.username)){
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })
    
        const savedUser = await user.save()
    
        response.status(201).json(savedUser)
    }
    else{
        response.status(400).json('username not unique')
    }
})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter
