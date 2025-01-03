import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../Global/GlobalProvider';
import axios from 'axios';
import RepoItem from '../../Components/RepoItem/RepoItem';
import { useNavigate } from 'react-router-dom';
import { Mosaic } from 'react-loading-indicators';
import './CompletedTasks.scss'

const CompletedTasks = () => {
  const { globalData } = useContext(GlobalContext);
  const [repoData, setRepoData] = useState({}); // State to store fetched repository data
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // Function to fetch repository data
  const getRepoData = async (url) => {
    try {
      const response = await axios.post('http://localhost:5000/repo_data', { url });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for URL: ${url}`, error);
      return null;
    }
  };

  const handleClick = (graph_data, url) => {

    const parsedUrl = new URL(url);
    const repo = parsedUrl.pathname.slice(1);
    // console.log(graph_data);
    localStorage.setItem('graphData', JSON.stringify(graph_data));

    navigate(`/graphs/${repo}`, { state: { data: graph_data } });
  };

  // Fetch all repository data on component mount
  useEffect(() => {
    setLoading(true)
    const fetchAllRepos = async () => {
      const data = {};
      for (const url of Object.keys(globalData)) {
        const repo = await getRepoData(url); // Fetch data for each URL
        if (repo) {
          data[url] = repo;
        }
      }
      setRepoData(data);
      setLoading(false) // Update state with fetched data
    };

    fetchAllRepos();
  }, [globalData]);

  return (
    <div className='container'>
      {loading ? (

        <div className='loading'>
          <Mosaic color={["#bb9afd", "#c25aeb", "#927cc3", "#a048bb"]} size="large" text="" textColor="" />
        </div>

      ) : (
        Object.entries(repoData).map(([url, data], index) =>
          Array.isArray(data) && data.length > 0 ? (
            <RepoItem
              key={index}
              result={data[0]}
              onClick={() => handleClick(globalData[url], url)}
            />
          ) : null
        )
      )}
    </div>
  );


};

export default CompletedTasks;
