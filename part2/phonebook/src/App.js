import React, { useState } from 'react'

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

const Persons = ({namesToShow}) => {
  return (
    <div>
      {namesToShow.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}));
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
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App