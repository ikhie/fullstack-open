const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')


const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await Promise.all(helper.users.map(async (user) => {
        await api.post('/api/users').send(user)
    }))
    
})

describe('creating users', () => {
    
    
    test('create user', async() => {

        const atStart = await helper.usersInDb()
        const user = {
            username: "uusi",
            name: "Arto Uusi",
            password: 'salasana1238885'
        }

        const resp = await api.post('/api/users').send(user)
        const users = await helper.usersInDb()
        expect(users).toHaveLength(atStart.length + 1)
    })

    test('username invalid', async() => {
        const user = {
            username: 'ik',
            name: 'Iki Kallio',
            password: 'asdfasdf'
        }

        const resp = await api.post('/api/users').send(user)
        console.log(resp.body)
        expect(resp.status).toBe(400)
    })

    test('password invalid', async() => {
        const user = {
            username: 'iki',
            name: 'Iki Kallio',
            password: 'as'
        }

        const resp = await api.post('/api/users').send(user)
        console.log(resp.body)
        expect(resp.status).toBe(400)
    })

    test('username already in database', async() => {

        const atStart = await helper.usersInDb()

        const user = {
            username: atStart[0].username,
            name: 'Iki Kallio',
            password: 'asasdf'
        }

        const resp = await api.post('/api/users').send(user)
        expect(resp.status).toBe(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

