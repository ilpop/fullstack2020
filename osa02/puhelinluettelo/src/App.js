import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/filter';
import PersonContacts from './components/personContacts';
import PersonForm from './components/personForm';
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('add new name')
  const [ newNumber, setNewNumber ] = useState('add new number')
  const [ search, setSearch ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
    })
      
    }, [])

    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name : newName,
        number: newNumber
     
      }
  
      if (persons.every(person => person.name !== newName)) {
      personService
      .create(personObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson))
      })
     

        setSuccessMessage(
          `Added ${personObject.name}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)


    } else { 

      if(window.confirm(`Are you sure you want to change the number of ${personObject.name}?`)) {
        const person = persons.find(p => p.name === personObject.name)
        personService
          .update(person.id, personObject) 
          .then(returnedPerson => { 
            setPersons(persons.map(p=>p.id !== person.id ? p : returnedPerson))
        
          }) 

          .catch(error => {
            setSuccessMessage(
              `the information of '${personObject.name}' is already been removed from server`
            )
            setTimeout(()=> {
              setSuccessMessage(null)
            }, 5000)
          })

          
          
          setSuccessMessage(
            `Number of ${personObject.name} is changed.`
          )

          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
            
      }
    }
    
   
        setNewName('')
        setNewNumber('')   
   
  }

const deletePerson = (id) => {
  const deletePerson = persons.find(p => p.id === id)
  if (window.confirm('Are you sure you want to delete this number?')) {
  personService
    .deleteObject(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    setSuccessMessage(
      `The number of ${deletePerson.name} is deleted.`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
}

}


  const numbersToShow = search === '' 
    
    ? persons
    : persons.filter(person => 
      person.name.toUpperCase().includes(search.toUpperCase()))
  


  
  const handleChange = (event) => {
    console.log(event.target.value)

    
    console.log('persons are: ' , persons);
    console.log('what is happening', event.target.value);

    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearch = (event) => {
    console.log('filter by', event.target.value);  
    setSearch(event.target.value)
  }  

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return (
    <div>   
      <h2>Phonebook</h2>

      <Notification message = {successMessage}/>

      <Filter search = {search} handleSearch = {handleSearch}/>

      <h2> Add a new: </h2>

      
      <PersonForm addPerson ={addPerson} 
                  newName = {newName}
                  handleChange = {handleChange}
                  newNumber = {newNumber} 
                  handleNumberChange = {handleNumberChange} />

      <h2>Numbers</h2>

      <PersonContacts persons = {numbersToShow} 
                      deletePerson={deletePerson}/>
    

      <div>debug: {newName} {newNumber}</div>
    </div>
  )

  }

export default App
