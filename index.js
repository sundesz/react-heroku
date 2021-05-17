const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))

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
    res.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
