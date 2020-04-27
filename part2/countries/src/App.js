import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
  return (
    <div> find countries <input value={props.nameFilter} onChange={props.handleFilterChange}/></div>
  )
}

const Countries = (props) => {
  const showOneCountry = (country) => {
    return () => props.setNameFilter(country);
  }

  if (props.countriesToShow.length > 9) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (props.countriesToShow.length === 1) {
    return (
      <Country country={props.countriesToShow[0]}/>
    )
  } else if (props.countriesToShow.length === 0) {
    return (
      <p>No country matched the search!</p>
    )
  }

  return (
    <div>
        {props.countriesToShow.map(country =>
        <p key={country.name} >{country.name} <button onClick={showOneCountry(country.name)}>show</button></p>
      )}
    </div>
  )
}

const Country = ({country}) => {

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.capital}</p>
      <ul>
        {country.languages.map(language =>
          <li key={language.name}>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} height={200}/>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, [])

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()));

  return (
    <div>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow} nameFilter={nameFilter} setNameFilter={setNameFilter}/>
    </div>
  )
}

export default App
