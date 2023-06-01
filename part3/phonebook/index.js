const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
  
const app = express()

app.use(express.json())
app.use(express.static('build'))
morgan.token('content', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(notes)
})

app.get('/api/info', (req, res) => {
  res.send(
    `<p>This phonebook contains ${persons.length} entries
    <p>${new Date()}<p>`
    )
})

const getRandomId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res
      .status(400)
      .json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return res
      .status(400)
      .json({ 
      error: 'number missing' 
    })
  }

  if (persons.some(person => person.name === body.name)) {
    return res
      .status(400)
      .json({ 
      error: 'person already in phonebook' 
    })
  }

  const person = {
    id: getRandomId(1, 10000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})