
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()

const Person = require('./models/person')

const cors = require('cors')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors())

app.get('/info', (_request, response) => {
  const lkm = Number(Person.find({}).then(persons => {
    response.json(persons.length)
  })
  )
  const date = new Date()
  response.end(`Phonebook has info for ${lkm} people 
    
    ${date}`)
})


app.get('/api/persons', (_request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {

        response.json(person)

      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line no-unused-vars
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body


  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON)
  })

    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person)
    .then(updatePerson => {
      response.json(updatePerson)
    })
    .catch(error => next(error))

})

const errorHandler = (error, _request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})