import React, { useState }from 'react'
import './SearchResultsList.scss'
import { FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import  {Mosaic} from 'react-loading-indicators'
import { useNavigate } from 'react-router-dom';
const SearchResultsList = ({ results }) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (repo_url) => {
    setLoading(true);
    axios.post('http://localhost:5000/generate_graphs', {
        url: repo_url
      })
      .then((response) => {

        console.log(response.data);
        navigate('/graphs', { state: { data: response.data } });

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the request finishes
    });
  };
  
  return (
    <div className="results-list">
       {loading && (
           <div className="loading-indicator">
               <Mosaic color="#bb9afd" size="medium" text="" textColor="" />
           </div>
            )}
      {!loading &&
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