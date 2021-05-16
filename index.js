const express = require('express')
const app = express()

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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})