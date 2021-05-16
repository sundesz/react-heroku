const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('<h1>Hello Sandesh')
})

app.get('/api/dates', (req, res) => {
    console.log(new Date())
    res.json(new Date())
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})