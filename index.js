require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())


let notes = [{
    id: 1,
    content: "HTML is easy",
    date: "2020-01-01T17:30:31.098z",
    important: true
},
{
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2020-01-10T18:39:34.091z",
    important: false
},
{
    id: 3,
    content: "GET and POST  are the most important methods of HTTP protocol",
    date: "2020-01-10T19:20:14.298z",
    important: true
}]


let persons = [{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
},
{
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
},
{
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
},
{
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
},
{
    "name": "Sandesh Hyoju",
    "number": "0452177225",
    "id": 5
},
{
    "name": "Sajani Karmacharya",
    "number": "1",
    "id": 6
}]


app.get('/', (req, res) => {
    res.send('<h1>Hello Sandesh')
})

app.get('/api/dates', (req, res) => {
    console.log(new Date())
    res.json(new Date())
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => {
            res.json(savedAndFormattedPerson)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(p => {
            p ? res.json(p) : res.status(404).end()
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))

})


app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

  // handler of requests with unknown endpoint
  app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
