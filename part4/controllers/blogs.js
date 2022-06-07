const blogsRouter = require('express').Router()
const { request, response } = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const user = require('../models/user')



blogsRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({}).populate('user', ['username', 'name'])
    response.json(allBlogs)
  })
  
blogsRouter.post('/', async (request, response) => {

    let newBlog = request.body

    if(isNaN(newBlog.likes) || newBlog.likes === ''){
      newBlog.likes = 0
    }
    
    if(!request.token || !request.user){
      return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = request.user
    const blog = new Blog({
        author: newBlog.author,
        title: newBlog.title,
        url: newBlog.url,
        likes: newBlog.likes,
        user: user._id
    })
    
    if(blog.title && blog.url){
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    }else{
      response.status(400).end()
    }
})

blogsRouter.delete('/:id', async (request, response) => {
 
  if(!request.token || !request.user){
      return response.status(401).json({error: 'token missing or invalid'})
  }

  const user = request.user
  await Blog.findOneAndRemove({id: {$eq:request.params.id}, user: {$eq:request.user._id}})
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: body.user
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
