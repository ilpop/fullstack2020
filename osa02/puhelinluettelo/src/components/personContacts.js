import React from 'react'

const PersonContacts = ( {persons, deletePerson} ) => {
    return (
        <table>
            <tbody>       
            {persons.map(person => <Person key={person.id} 
            person={person} deletePerson={deletePerson}/>)}
            </tbody>
        </table>
        )
}

const Person = ( {person, deletePerson} ) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td> 
            <td><button onClick={() => {deletePerson(person.id)}}>
                delete</button> </td>
        </tr>

          )
        }



export default PersonContacts