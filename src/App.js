import React, { useState } from 'react';
import Pagination from "react-js-pagination";

import './App.css';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1); // TODO: have page come from query string

  const handleChangeSearchTerm = e => {
    e.preventDefault();
    e.stopPropagation();
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm) {
      getData(newSearchTerm, page);
    } else {
      clearData();
    }
  };

  const handleChangePage = page => {
    setPage(page);
    getData(searchTerm, page);
  }

  const clearData = () => {
    setData([]);
    setTotalResults(0);
  };

  const getData = (searchTerm, page) => {
    clearData();
    fetch(`http://localhost:3001/?search=${searchTerm}&page=${page}`)
      .then(response => response.json())
      .then(data => {
        setData(data.data);
        setTotalResults(data.totalResults);
      })
      .catch(e => {
        console.error(e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Search</h1>
        <div>
          <input
            placeholder="Search..."
            onChange={handleChangeSearchTerm}
            value={searchTerm}
          />
        </div>
      </header>
      <article>
        {data.map((row, index) => {
          return (
            <div key={`row-${index}`}>
              {row}
            </div>
          );
        })}
        <Pagination
          activePage={page}
          totalItemsCount={totalResults}
          itemsCountPerPage={100}
          pageRangeDisplayed={10}
          onChange={handleChangePage}
        />
      </article>
    </div>
  );
}

export default App;
