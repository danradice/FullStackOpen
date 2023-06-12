const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const helper = require('./test_helper')

//beforeEach(async () => {
//  await User.deleteMany({})
//  await User.insertMany(helper.initUserList)  
//})

describe('User creation', () => {

    test('fails with short username', async () => {
        const newUser = {
            username: "ro",
            name: "Super",
            password: "sandyboy"
        }
    
        const response = await api.post('/api/users').send(newUser)
        
        expect(response.status).toEqual(400)
        expect(response.body.error).toContain('shorter')
    })

    test('fails with short password', async () => {
        const newUser = {
            username: "rooty",
            name: "Super",
            password: "sa"
        }
    
        const response = await api.post('/api/users').send(newUser)
        
        expect(response.status).toEqual(400)
        expect(response.body.error).toContain('password too short')
    })

    test('fails with non-unique username', async () => {
        const newUser = {
            username: "root",
            name: "Jim",
            password: "sabababa"
        }
    
        await api.post('/api/users').send(newUser)

        const response = await api.post('/api/users').send(newUser)
        
        expect(response.status).toEqual(400)
        expect(response.body.error).toContain('unique')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})