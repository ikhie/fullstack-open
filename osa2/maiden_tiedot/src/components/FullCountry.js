import React from 'react'

const FullCountry = ({country, weather}) => {

    return (
        <div>
            <div>
                <h1>{country.name}</h1>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
            </div>
            <div>
                <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>
            </div>
            <div>
                <img style={{width: 200}} src={country.flag}/>
            </div>
            <div>
                <h2>Weather in {country.capital}</h2>
                <div><strong>temperature</strong>: {weather.current.temperature} Celsius</div>
                <img src={weather.current.weather_icons[0]}/>
                <div><strong>wind</strong>:{weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
            </div>
        </div>
    )
}

export default FullCountry