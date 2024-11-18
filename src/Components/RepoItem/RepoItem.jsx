import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import './RepoItem.scss'; // Optional: Add styling for the RepoItem if needed

const RepoItem = ({ result, onClick }) => {
  let stars = result.stargazers_count;
  if (stars > 1000) {
    stars = (result.stargazers_count / 1000).toFixed(1) + 'k'; // Format stars
  }

  return (
    <div className="search-result" onClick={() => onClick(result)}>
      <div className="repo-main">
        <div className="repo-avatar"><img src={result.avatar_url} alt="" /></div>
        <div className="repo-name">{result.full_name}</div>
      </div>
      <div className="repo-desc">{result.description}</div>
      {result.topics.length !== 0 && (
        <div className="repo-topics">
          {result.topics.map((topic, id) => (
            <div className="topics" key={id}>
              {topic.trim()}
            </div>
          ))}
        </div>
      )}
      <div className="repo-lang">
        {result.language && <div>{result.language}</div>}
        <div><FaRegStar id="star-icon" />{stars}</div>
      </div>
    </div>
  );
};

export default RepoItem;
