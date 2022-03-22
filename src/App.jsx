import React from 'react';

import Cards from './Components/Cards';
import Nav from './Components/Nav';
import Ciudad from './Components/Ciudad';
import About from './Components/About';
import  { useState } from 'react'; 
import { Route } from 'react-router-dom';

export default function App() {
  const [cities, setCities] = useState([]);
  let apiKey = '8640a414e9524d503120d15be988d7d6'
  //http://api.openweathermap.org/data/2.5/weather?q=lima&appid=4ae2636d8dfbdc3044bede63951a019b&units=metric

  function onSearch(ciudad) {

    console.log(cities )
    cities.includes(ciudad) 
    
    
    ? (console.log("la ciudad ya se encuentra")):
    (fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`)
      .then(r => r.json())
      .then((recurso) => {
        if(recurso.main !== undefined){
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon
          };
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      }))

    }

  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }


  return (
    <div className="App">
      <Route path = "/" >
        <Nav onSearch={onSearch}/>
      </Route>

      <div>
        <Route path = "/" exact>
          <Cards cities={cities} onClose={onClose} />
        </Route>

        <Route path = "/about" exact >
          <About/>
        </Route>
        <Route path = "/ciudad/:ciudadId" exact  render={ ( {match})=> {
          const city=cities.find( c  => c.id === Number(match.params.ciudadId)) 
          return <Ciudad city = {city}/>
        }}/>

        
      </div>
    </div>
  );
}
