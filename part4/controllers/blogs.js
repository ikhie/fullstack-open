const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})
    response.json(allBlogs)
  })
  
blogsRouter.post('/', async (request, response) => {


    let newBlog = request.body

    if(isNaN(newBlog.likes) || newBlog.likes === ''){
      newBlog.likes = 0
    }

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
      return response.status(401).json({error: 'token missing or invalid'})
    }

    
    const blog = new Blog({
        title: newBlog.title,
        url: newBlog.url,
        likes: newBlog.likes,
        user: decodedToken.id
    })
    
    if(blog.title && blog.url){
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }else{
      response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body


    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
