import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Home = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=63efd9188bac8d389c3e7acead2c0ad2&units=metric`);
      setData(response.data);
      setShowContent(false);
      setTimeout(() => setShowContent(true), 300);
    } catch (error) {
      alert("ERROR: " + error.message);
      setData(null);
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  useEffect(() => {
    if (showContent) {
      document.querySelector('.weather-content').classList.add('show');
    }
  }, [showContent]);

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        .weather-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .weather-content.show {
          opacity: 1;
          transform: translateY(0);
        }
        .search-input {
          transition: all 0.3s ease;
        }
        .search-input:focus {
          box-shadow: 0 0 0 3px rgba(255,255,255,0.5);
        }
        .search-button {
          transition: all 0.3s ease;
        }
        .search-button:hover {
          transform: scale(1.05);
        }
        .loading {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
      `}</style>
      <div className='bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-full min-h-screen flex justify-center items-center p-4 sm:p-6'>
        <div className='bg-white/10 backdrop-blur-md w-full max-w-5xl rounded-3xl shadow-lg flex flex-col overflow-hidden'>
          <div className='p-4 sm:p-6'>
            <div className='flex items-center bg-white/20 rounded-full overflow-hidden shadow-lg'>
              <input
                type="text"
                placeholder="Search for a city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                className='search-input flex-grow bg-transparent text-white placeholder-white/70 px-4 py-2 sm:px-6 sm:py-3 focus:outline-none'
              />
              <button 
                onClick={fetchWeather} 
                className='search-button bg-white text-purple-600 px-4 py-2 sm:px-6 sm:py-3 font-semibold hover:bg-purple-100 transition-colors duration-300'
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          {data && (
            <div className='weather-content flex flex-col lg:flex-row gap-4 p-4 sm:p-6'>
              <div className='flex-1 bg-white/20 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col justify-between'>
                <div>
                  <h2 className='text-3xl sm:text-4xl font-light text-white mb-2 truncate'>{data.name}</h2>
                  <p className='text-lg sm:text-xl text-white/80 font-light'>{data.weather && data.weather[0].description}</p>
                </div>
                <div className='flex items-center justify-center flex-grow my-4'>
                  <img src={`http://openweathermap.org/img/wn/${data.weather && data.weather[0].icon}@2x.png`} alt="weather icon" className='w-24 sm:w-32 mr-4'/>
                  <span className='text-6xl sm:text-8xl font-thin text-white'>{Math.round(data.main.temp)}°</span>
                </div>
                <div className='grid grid-cols-2 gap-2 sm:gap-4 text-white/80 mt-4'>
                  <div className='truncate'>
                    <p className='font-semibold'>Wind</p>
                    <p className='font-light'>{data.wind.speed} km/h</p>
                  </div>
                  <div className='truncate'>
                    <p className='font-semibold'>Humidity</p>
                    <p className='font-light'>{data.main.humidity}%</p>
                  </div>
                  <div className='truncate'>
                    <p className='font-semibold'>Pressure</p>
                    <p className='font-light'>{data.main.pressure} hPa</p>
                  </div>
                  <div className='truncate'>
                    <p className='font-semibold'>Visibility</p>
                    <p className='font-light'>{data.visibility / 1000} km</p>
                  </div>
                </div>
              </div>
              <div className='flex-1 bg-white/20 rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col'>
                <h3 className='text-xl sm:text-2xl font-light text-white mb-4'>Feels Like</h3>
                <div className='flex items-center justify-center flex-grow'>
                  <span className='text-7xl sm:text-9xl font-thin text-white'>{Math.round(data.main.feels_like)}°</span>
                </div>
                <div className='grid grid-cols-2 gap-2 sm:gap-4 text-white/80 mt-4'>
                  <div className='truncate'>
                    <p className='font-semibold'>Min Temp</p>
                    <p className='font-light'>{Math.round(data.main.temp_min)}°</p>
                  </div>
                  <div className='truncate'>
                    <p className='font-semibold'>Max Temp</p>
                    <p className='font-light'>{Math.round(data.main.temp_max)}°</p>
                  </div>
                  <div className='truncate'>
                    <p className='font-semibold'>Sunrise</p>
                    <p className='font-light'>{new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                  </div>
                  <div className='truncate'>
                    <p className='font-semibold'>Sunset</p>
                    <p className='font-light'>{new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home