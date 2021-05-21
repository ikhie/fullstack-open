import React, { useState, userEffect, useEffect } from 'react'
import pbService from './services/phonebook.js'
import Filter from './components/Filter.js'
import Person from './components/Person.js'
import PersonForm from './components/PersonForm.js'
import Notification from './components/Notification.js'


const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ notification, setNotification] = useState('notification')

  useEffect(() => {
    pbService
      .getAll()
        .then(initialBook => {
        setPersons(initialBook)
      })
    }, [])

  const deleteEntry = id => {
    const name = persons.find(n => n.id === id).name
    const confirm = window.confirm(`delete ${name}?`)
    if(confirm){
      pbService
        .deleteEntry(id)
        .then(request => {
          setErrorMessage(`Deleted ${name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
      })
    }
  }
    
  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const update = (id, personObject) => {
      const confirm = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
      if(confirm){
        pbService
          .update(id, personObject)
          .then(updatedItem => {
            setPersons(persons.map(person => person.id !== id ? person : updatedItem))
            setNotification('notification')
            setErrorMessage(`Updated ${personObject.name}`)
        }).catch(error => {
          setNotification('error')
          setErrorMessage(`${personObject.name} already removed from the server`)
          setPersons(persons.filter(n =>n.id !== id))
        })
      }
    }

    const addPersonObject = personObject => {
      pbService
      .create(personObject)
        .then(returnedPerson => {
          setNotification('notification')
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${personObject.name} to phonebook`)
        })
    }

    const person = persons.find(n => n.name === personObject.name)
    person === undefined ? addPersonObject(personObject) : update(person.id, personObject)

    setNewName('')
    setNewNumber('')

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilter = (event) => {setNewFilter(event.target.value)}
  
  const personsToShow = newFilter !== '' ? persons.filter(({name}) => name.toLowerCase().startsWith(newFilter.toLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} error={notification}/>
      <Filter newFilter={newFilter} handleFilter={handleFilter}/>
      <PersonForm newName={newName} 
          handleNameChange={handleNameChange} 
          newNumber={newNumber} 
          handleNumberChange={handleNumberChange} 
          addPerson={addPerson}/>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person 
          key={person.name} 
          name={person.name} 
          number={person.number} 
          deleteEntry={() => deleteEntry(person.id)}/>)}
    </div>
  )

}

export default App