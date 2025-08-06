import { useEffect, useState } from 'react';
import weatherService from '../services/weather';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherService.getWeather(country.capital[0])
      .then(data => setWeather(data));
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>

      <h4>Languages:</h4>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

      {weather && (
        <>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default CountryDetails;
