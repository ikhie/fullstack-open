import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.js'
import Countries from './components/Countries.js'

const App = () => {

  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [weather, setWeather] = useState([])
  const [capital, setNewCapital] = useState('')
  // api_key given in start
  const api_key = process.env.REACT_APP_API_KEY

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const getCurrentWeather = () => {
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
    .then(response => {
      setWeather(response.data)
    })
  } 
  
  
  useEffect(getCurrentWeather, [capital])
  useEffect(hook, [])

  const handleFilter = (event) => {setNewFilter(event.target.value)}

  const countriesToShow = () => {
    let list = newFilter !== '' ? countries.filter(({name}) => name.toLowerCase().includes(newFilter.toLowerCase())) : []
    if(list.length === 1 && !capital.match(list[0].capital)){
      setNewCapital(list[0].capital)
    }
    return list
  }    


  const handleClick = event =>{
    setNewFilter(event.target.value)
  }  

  return(
    <div>
      <Filter newFilter={newFilter} handleFilter={handleFilter}/>
      <Countries countriesToShow={countriesToShow()} weather={weather} handleClick={handleClick}/>
    </div>
  )

}

export default App;
