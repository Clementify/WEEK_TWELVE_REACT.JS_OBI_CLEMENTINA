/*
Display loading and error states while fetching data
Extend the previous DataFetcher component.
Declare two additional state variables: isLoading and error.
Set isLoading to true before making the API request and false after receiving the response.
Handle any errors that occur during the API request and update the error state accordingly.
Conditionally render a loading spinner or an error message based on the isLoading and error states.

*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [fetchedData, setFetchedData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
   
    const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    setIsLoading(true);

    axios
      .get(apiUrl)
      .then((response) => {

        setFetchedData(response.data.categories);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false); 
      });
  }, []);

  return (
    <div className='categories-meal'>
      {isLoading ? (  <p className='loading'>Loading...</p>) : error ? ( <p  className='loading'>{error.message}, Try check your network connection</p>
      ) : fetchedData ? (
        <ul>
          {fetchedData.map((category) => (
            <li key={category.idCategory}>
                <img src={category.strCategoryThumb} alt={category.strCategory} />
                <div className="desc-des">
                  <h2>{category.strCategory}</h2>
                  <p>{category.strCategoryDescription}</p>
                </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default DataFetcher;
