import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div> filter shown with <input value={props.nameFilter} onChange={props.handleFilterChange}/></div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div> name: <input value={props.newName} onChange={props.handleNameChange}/></div>
      <div> number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({namesToShow, persons, setPersons, setErrorMessage}) => {

  const handleNameRemove = (deletedPerson) => {
    const result = window.confirm(`Delete ${deletedPerson.name} ?`);
    if (result) {
      personService.remove(deletedPerson.id)
      .then(() => setPersons(persons.filter(person => person.id !== deletedPerson.id)))
      .catch(() => {
        setErrorMessage(`Information of ${deletedPerson.name} has already been removed from the server`)
        setPersons(persons.filter(n => n.id !== deletedPerson.id))
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
    }
  }

  return (
    <div>
      {namesToShow.map(person => 
        <p key={person.id}>{person.name} {person.number} <button onClick={() => handleNameRemove(person)}>delete</button></p>
      )}
    </div>
  )
}

const SuccessNotification = ({message}) => {
  if (message === null) {
    return null
  }

  const successMessageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={successMessageStyle}>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }

  const errorMessageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div style={errorMessageStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')
  const [ successMessage, setSuccessMessage] = useState(null);
  const [ errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll()
     .then(allPersons => setPersons(allPersons)) }, [])

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        const person = persons.find(person => person.name === newName);
        personService.update(person.id, {name: newName, number: newNumber })
         .then(response => {
           setPersons(persons.map(x => x.id !== person.id ? x : response))
           setSuccessMessage(`Updated ${newName}! `)
           setTimeout(() => { setSuccessMessage(null) }, 5000)
         })
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      personService.create(newPerson)
       .then(response => { setPersons(persons.concat(response)) 
        setSuccessMessage(`Added ${newName}! `)
        setTimeout(() => { setSuccessMessage(null) }, 5000)
      })
      .catch(error => {
        setErrorMessage(error)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const namesToShow = persons.filter(person => person.name.toLowerCase().startsWith(nameFilter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <ErrorNotification message={errorMessage}/>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons namesToShow={namesToShow} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

export default App