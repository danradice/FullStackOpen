import { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import Form from './components/Form'

import personService from './services/Persons'

const App = () => {

// State hooks for the app

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilter] = useState('')
  const [currentMessage, setErrorMessage] = useState({message:'', type:'none'})
  let messageType = ''

// Effect hook for fetching data from json server

  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

// Event handlers and other functions

  const newNotification = (message, type) => {
    setErrorMessage(
      { message, type }
    )
    setTimeout(() => {
      setErrorMessage({})
    }, 5000)
  }

  const addPerson = (event) => {

    const check = persons.find(person => person.name === newName) 
    event.preventDefault()
    if (check !== undefined) {
      if (window.confirm(`${check.name} is already in the phonebook. Replace the old number with the new one?`)) {
        const editedPerson = { ...check, number: newNumber }
  
        personService
          .update(check.id, editedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== check.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            newNotification(`${newName} was successfully updated`, 'yes')
          })
          .catch(error => {
            newNotification(`${newName} has been removed from the server`, 'no')
            setPersons(persons.filter(n => n.id !== check.id))
          })
        }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          newNotification(`${newName} was successful added`, 'yes')
        })
    }
  }

  const deletePerson = person => {
    if (window.confirm(`delete ${person.name}`)) {
      personService
        .deleteIt(person.id)
        setPersons(persons.filter(n => n.id !== person.id))
        newNotification(`${person.name} was successfully deleted`, 'yes')
    }
  }

  const Notification = ({ message, type }) => {
    const successStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    
    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    
    if (type === 'none') {
      return null
    }

    if (type === 'no') {
      return (
        <div style={errorStyle}>
          {message}
        </div>
      )
    }
    if (type === 'yes') {
      return (
        <div style={successStyle}>
          {message}
        </div>
      )
    }
  }

  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))

// Rendering of webpage

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={currentMessage.message} type={currentMessage.type} />
      
      <Filter value={filterString} changeHandler={handleFilterChange} />
      
      <h2>Add number</h2>
      
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <ul>
        <ul>
          {personsToShow.map(person => 
            <Person key={person.name} person={person} deleteEntry={() => deletePerson(person)} />
          )}
        </ul>
      </ul>
    </div>
  )
}

export default App