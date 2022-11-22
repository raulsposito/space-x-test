import React, { useState, useEffect } from 'react';
import './launches.css'

import Card from '../card/Card';

function Launches() {

  const [launches, setLaunches] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState([])

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredSearch = launches.filter(launch => launch.rocket.rocket_name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

  useEffect(() => {
    fetch('https://api.spacexdata.com/v3/launches')
        .then((response) => response.json())
        .then((data) => setLaunches(data));
  }, [])

  useEffect(() => {
    const prevSelectedFavorites = JSON.parse(localStorage.getItem('space-x-test'))
    setFavorites(prevSelectedFavorites)
  }, [])
  

  const addFavorite = (card) => {
    if (favorites.includes(card)) {
        setFavorites(favorites);
    }
    else {
        const newFavoritesCopy = [...favorites, card]
        setFavorites(newFavoritesCopy)
        saveToLocalStorage(newFavoritesCopy)
    }
  }

  const handleIsFavorite = (id) => {
    console.log(id)
    const newFavoritesClone = [...favorites]
    const isFav = newFavoritesClone.filter(f => f.flight_number.includes(id))
    if (isFav) {
        return true;
    }
    else if (!isFav) {
        return false;
    }
  }

  const saveToLocalStorage = (favorites) => {
    localStorage.setItem('space-x-test', JSON.stringify(favorites))
  }
  
  return (
    <div className='launchesContainer'>
        <div className='title'>Launches</div>
        <div className='cardWrapper'>
            <div className='searchBar'>
                <p>Total({launches.length})</p>
                <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    </div>
                    <input
                        type="search"
                        name="search"
                        id="search"
                        onChange={editSearchTerm}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="🔍 Search favourites"
                    />
                </div>
            </div>
            {launches && filteredSearch.map((launch, id)=> (
                <Card key={id} id={launch.flight_number} handleFavorites={addFavorite} isFavorite={(launch) => handleIsFavorite(launch.flight_number)} title={launch.rocket.rocket_name} subtitle={launch.mission_name} img={launch.links.mission_patch} date={launch.launch_date_local} />
            ))}
        </div>
    </div>
  )
}

export default Launches