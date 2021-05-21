import React from 'react'
import FullCountry from './FullCountry'

const Countries = ({countriesToShow, handleClick, weather}) => {
  if(countriesToShow.length > 10){
    return 'Too many matches, specify another filter'
  }
  if(countriesToShow.length === 1){
    return <FullCountry country={countriesToShow[0]} weather={weather}/>
  }
  return(
    <ul>
        {countriesToShow.map(country => <li key={country.numericCode}>{country.name}<button value={country.name} onClick={handleClick}>show</button></li>)}
    </ul>
  )
}

export default Countries