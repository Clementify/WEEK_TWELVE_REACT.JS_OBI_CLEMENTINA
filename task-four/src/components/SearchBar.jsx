/*
Task 4: Implement debouncing for API requests

Create a functional component called "SearchBar" in a separate file.
Declare a state variable to store the search query.
Use the useEffect hook with a dependency on the search query state variable.
Implement a debouncing mechanism using setTimeout to delay API requests after the user stops typing.
Cancel and restart the timeout whenever the search query changes within a specified delay.
Fetch data from the API using Axios when the debouncing timeout completes.

*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState([]);

  const delay = 500; 

  useEffect(() => {
    let timeoutId;

    const fetchResults = async () => {
      try {
        const response = await axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchQuery}`
        );

        setSearch(response.data.meals || []);    
      } 
      
      catch (error) {
        console.error('Error fetching data:', error);
        setSearch([]);
      }
    };

    const debounceSearch = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchResults, delay);
    };

    if (searchQuery !== '') {
      debounceSearch();
    } else {
      setSearch([]); 
    }

    
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='searchbar-bar' >
      <input
        type="text"
        placeholder="Search for meals by first letter..."
        value={searchQuery}
        onChange={handleInputChange}
      />

      <ul>
        {search.map((meal) => (
          <li key={meal.idMeal}>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h5>{meal.strMeal} </h5>   
          </li>
        ))}
      </ul>

    </div>
  );
};

export default SearchBar;
