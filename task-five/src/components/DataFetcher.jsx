/*
Handle cleanup in the useEffect hook
Extend the DataFetcher component.
Use the useEffect hook to fetch data from an API endpoint when the component mounts.
Return a cleanup function from the useEffect hook to cancel any ongoing API requests if the component unmounts before the response is received.
Test the cleanup functionality by quickly unmounting the component while a request is in progress.

*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 1;

  useEffect(() => {
    
    // Create a cancel token source for the Axios request
    const cancelTokenSource = axios.CancelToken.source();

    const fetchPage = async () => {
      setIsLoading(true);
      setError(null);

      const myUrl = `https://www.themealdb.com/api/json/v1/1/categories.php?`;

      try {
        const response = await axios.get(myUrl, {
          cancelToken: cancelTokenSource.token, // Set the cancel token for this request
        });

        setFetchedData(response.data.categories);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          // This error occurs when the request was canceled (component unmounted)
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching data:', error);
          setError(error);
          setIsLoading(false);
        }
      }
    };

    fetchPage(); // Initiate the data fetch

    // Return a cleanup function to cancel the ongoing request when the component unmounts
    return () => {
      cancelTokenSource.cancel('Request canceled due to component unmount');
    };
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
