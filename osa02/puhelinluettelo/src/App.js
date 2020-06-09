import React, { useState} from 'react';
import { unstable_batchedUpdates } from 'react-dom';

const Person = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Nuf Nuf', number: '040 444 666'},
    { name: 'Nalle Puh', number: '999-666' },
    { name: 'Kooky', number: '666-0999'},
    { name: 'Superman', number: '69-69696969'},
    { name: 'Batman', number: '1234-1234567890'}
  ]) 
  const [ newName, setNewName ] = useState(' add new name')

  const [ newNumber, setNewNumber ] = useState('add new number')

  const [ filterAll, setFilter ] = useState('')

  const numbersToShow = persons.filter(person => 
    person.name.includes(filterAll))

  


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.includes(newName)) {
      return (alert(`${newName} is already added to phonebook!`))}
    



    console.log('button clicked', event.target)    
    const personObject = {
      name : newName,
      number: newNumber,
      id: persons.length +1,
    }

    setPersons(persons.concat(personObject))

    setNewName(' ')
    setNewNumber(' ')
  }

  

  const handleChange = (event) => {
    console.log(event.target.value)

    
    console.log('persons are: ' , persons);
    console.log('what is happening', event.target.value);

    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log('filter by', event.target.value);
    
    setFilter(event.target.value)
  }

  return (
    <div>   
      <h2>Phonebook</h2>
      
        <form>
        <div>
          filter shown with: <input value={filterAll}
           onChange={handleFilter}/>
           </div>
      </form>


      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleChange}/>
          </div>
          <div>
          number: <input value={newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {numbersToShow.map((persons, id) =>
      <Person key={id} name= {persons.name} number= {persons.number}/>
      )}

      <div>debug: {newName} {newNumber}</div>
    </div>
  )

}

export default App;
