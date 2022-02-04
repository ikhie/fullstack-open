const { application } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')





const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    await Promise.all(helper.users.map(async (user) => {
        await api.post('/api/users').send(user)
    }))
})

describe('fetching blogs', () => {
    test('return all blogs', async() => {

        const resp = await api.get('/api/blogs')
        expect(resp.body).toHaveLength(helper.initialBlogs.length)
    })
    
    test('returned blogs id is correct', async() => {
        const resp = await api.get('/api/blogs')
        expect(resp.body[0].id).toBeDefined()
    })
})

describe('adding blogs', () => {

    test('add a new blog', async() => {
        const response = await api.post('/api/login').send({username: 'hellas', password: 'salasana1234545'})
        const token = response.body.token
        await api.post('/api/blogs').set("authorization", "bearer " + token).send(helper.oneBlog)
        const resp = await api.get('/api/blogs')
        expect(resp.body).toHaveLength(helper.initialBlogs.length + 1)
    })
    
    test('set 0 for likes, if no value', async() => {
        const blogWithNoLikesSet = {
            _id: '5a4b54a676234caf7ba76623',
            title: 'This is a blog',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: '',
            __v: 0
        }
        const response = await api.post('/api/login').send({username: 'hellas', password: 'salasana1234545'})
        const token = response.body.token
        const blog = await api.post('/api/blogs').set("authorization", "bearer " + token).send(blogWithNoLikesSet)
        expect(blog.body.likes).toBe(0)
    })
    
    test('if title and url not set expect response status 400', async() => {
        const oneBlogNoTitleAndUrl = {
            _id: '5a4b54a676234dba7ba77623',
            author: 'Edsger W. Dijkstra',
            likes: 2,
            __v: 0
        }
        const response = await api.post('/api/login').send({username: 'hellas', password: 'salasana1234545'})
        const token = response.body.token
        const resp = await api.post('/api/blogs').set("authorization", "bearer " + token).send(oneBlogNoTitleAndUrl)
        expect(resp.status).toBe(400)
    })

})

describe('removing blogs', () => {

    test('return 204, if blog deleted', async() => {
        const blogs = helper.initialBlogs;
        const blogToDelete = blogs[0]
        const response = await api.post('/api/login').send({username: 'hellas', password: 'salasana1234545'})
        const token = response.body.token

        await api.delete(`/api/blogs/${blogToDelete._id}`).set("authorization", "bearer " + token).expect(204)
    })

    test('blog not found from db after deletion', async() => {
        const blogs = helper.initialBlogs;
        const blogToDelete = blogs[0]

        await api.delete(`/api/blogs/${blogToDelete._id}`)

        const resp = await api.get('/api/blogs')

        expect(resp.body).not.toContain(blogToDelete)
    })
})

describe('updating blogs', () => {
    test('return 200, if blog updated', async() => {
        const blogs = helper.initialBlogs;
        let blogToUpdate = JSON.parse(JSON.stringify(blogs[0]))
        blogToUpdate.likes++
        await api.put(`/api/blogs/${blogToUpdate._id}`).send(blogToUpdate).expect(200)
    })

    test('likes increased after update', async() => {
        const blogs = helper.initialBlogs;
        let blogToUpdate = JSON.parse(JSON.stringify(blogs[0]))
        blogToUpdate.likes++
        const resp = await api.put(`/api/blogs/${blogToUpdate._id}`).send(blogToUpdate)
        expect(resp.body.likes).toBe(blogs[0].likes + 1)
    })
})


afterAll(() => {
    mongoose.connection.close()
})
