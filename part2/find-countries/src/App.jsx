import { useEffect, useState } from 'react';
import countriesService from './services/countries';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then(data => setAllCountries(data));
    
  }, []);
 console.log(allCountries)
  const handleFilterChange = (e) => {
    setFilter(e.target.value.trim());
    setSelectedCountry(null);
  };

  const filtered = allCountries.filter(c =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Country Finder</h1>
      <input
        value={filter}
        onChange={handleFilterChange}

      />

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filtered.length === 1 ? (
        <CountryDetails country={filtered[0]} />
      ) : (
        <CountryList countries={filtered} onShow={setSelectedCountry} />
      )}
    </div>
  );
};

export default App;
