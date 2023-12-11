/*
Task 3: Implement pagination for fetched data
Extend the DataFetcher component.
Declare a state variable to store the current page number.
Add buttons or links for navigating between pages.
Use the page number in the API request URL to fetch specific pages of data.
Update the state variable and fetch new data when the user clicks on a page navigation button.
*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 1;

  const fetchPage = () => {
    setIsLoading(true);
    setError(null);

    const myUrl = `https://www.themealdb.com/api/json/v1/1/categories.php?`;

    axios
      .get(myUrl)
      .then((response) => {
        
          setFetchedData(response.data.categories);
          setIsLoading(false);
      })

      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(fetchedData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='categories-meal'>
      {isLoading ? (
        <p className='loading'>Loading...</p>
      ) : error ? (
        <p className='loading'>{error.message}, Try checking your network connection</p>
      ) : fetchedData ? (
        <div className="pages">
        <ul>
          {fetchedData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((category) => (
              <li key={category.idCategory}>
                <img src={category.strCategoryThumb} alt={category.strCategory} />
                <div className="desc-des">
                  <h2>{category.strCategory}</h2>
                  <p>{category.strCategoryDescription}</p>
                </div>
                
              </li>
            ))}
        </ul>
            <div className='pageChange'>
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                )}
                <span>{currentPage} of {totalPages}</span>
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default DataFetcher;
