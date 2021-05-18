const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: mode mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://sandesh:${password}@cluster0.xu9kp.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(p => {
            console.log(`${p.name} ${p.number}`)
        })
        mongoose.connection.close()
    })

} else {

    const newName = process.argv[3]
    const newPhone = process.argv[4]
    const person = new Person({
        name: newName,
        number: newPhone
    })

    person.save().then(result => {
        console.log(`added ${newName} number ${newPhone} to phonebook`)
        mongoose.connection.close()
    })
}

// Person.find({}).then(result => {
//     result.forEach(person => {
//         console.log(person)
//     })

//     mongoose.connection.close()
// })