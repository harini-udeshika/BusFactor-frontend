import React from 'react'
import './SearchResultsList.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FaRegStar } from 'react-icons/fa';
import axios from 'axios';
const SearchResultsList = ({ results }) => {

  const handleClick = (repo_url) => {
    axios.post('http://localhost:5000/generate_graphs', {
        url: repo_url
      })
      .then((response) => {
        console.log(response.data); // Handle the server response as needed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  
  return (
    <div className="results-list">
      {
        results.map((result, id) => {
          let stars = result.stargazers_count;
          if (stars > 1000) {
            stars = result.stargazers_count / 1000;
            stars = stars + 'k';
          }

          return <div className="search-result" key={id} onClick={() => { handleClick(result.url) }}>
            <div className="repo-main">
              <div className="repo-avatar"><img src={result.avatar_url} alt="" /></div>
              <div className="repo-name">{result.full_name}</div>
            </div>
            <div className="repo-desc">{result.description}</div>
            {result.topics.length !== 0 && <div className="repo-topics">{
              result.topics.map((topic, id) => {
                return <div className="topics">
                  {topic.trim()}
                </div>
              })}
            </div>}
            <div className="repo-lang">
              {result.language && <div>{result.language}</div>}
              <div> <FaRegStar id="star-icon" />{stars}</div>
            </div>
          </div>;
        }
        )}
    </div>
  )
}

export default SearchResultsList