const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialList)  
})

describe('Api GET tests', () => {
    
  test('blogs are returned as json', async () => {
  await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('list is of the right length', async () => {
      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialList.length)
  })

  test('check that posts have id field', async () => {
    const response = await api.get('/api/blogs')
    firstId = response.body[0].id
    
    expect(firstId).toBeDefined()
  })
})

describe('Api POST tests', () => {

  test('a valid blog can be added ', async () => {
    const newBlog = {
      _id: "5a422a851b54a676234d1898",
      title: "testing",
      author: "Mr Test",
      url: "https://testsite.com/",
      likes: 9,
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialList.length + 1)
  
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain('testing')
  })

  test ('likes attribute defaults to 0', async () => {
    const noLikesBlog = {
      _id: "5a422a851b54a676234d1898",
      title: "testing",
      author: "Mr Test",
      url: "https://testsite.com/",
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd.every(n => n.likes)).toBeDefined()
  })
  
  test ('url and title are required properties', async () => {
    const noTitleBlog = {
      _id: "5a422a851b54a676234d1898",
      author: "Mr Test",
      url: "https://testsite.com/",
      __v: 0
    }

    const noUrlBlog = {
      _id: "5a422a851b54a676234d1898",
      title: "testing",
      author: "Mr Test",
      __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(noTitleBlog)
      .expect(400)
    
    await api
      .post('/api/blogs')
      .send(noUrlBlog)
      .expect(400)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})