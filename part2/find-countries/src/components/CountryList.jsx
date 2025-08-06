const CountryList = ({ countries, onShow }) => {
  if (countries.length > 10) return <p>Too many matches, specify another filter</p>;
  if (countries.length === 0) return <p>No matches</p>;

  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onShow(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
