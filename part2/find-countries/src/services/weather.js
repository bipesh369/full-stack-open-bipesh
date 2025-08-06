import axios from 'axios';

const apiKey = import.meta.env.VITE_WEATHER_KEY;

const getWeather = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  return axios.get(url).then(res => res.data);
};

export default { getWeather };
