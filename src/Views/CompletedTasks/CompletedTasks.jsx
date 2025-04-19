import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../../Global/GlobalProvider';
import axios from 'axios';
import RepoItem from '../../Components/RepoItem/RepoItem';
import { useNavigate } from 'react-router-dom';
import { Mosaic } from 'react-loading-indicators';
import './CompletedTasks.scss';

const CompletedTasks = () => {
  const { globalData, completedTasksData, setCompletedTasksData } = useContext(GlobalContext);
  const [repoData, setRepoData] = useState(completedTasksData || {});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getRepoData = async (url) => {
    try {
      const cachedData = sessionStorage.getItem(url);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
      const response = await axios.post('http://localhost:5000/repo_data', { url });
      sessionStorage.setItem(url, JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error(`Error fetching data for URL: ${url}`, error);
      return null;
    }
  };

  const handleClick = (graph_data, url) => {
    const parsedUrl = new URL(url);
    const repo = parsedUrl.pathname.slice(1);
    localStorage.setItem('graphData', JSON.stringify(graph_data));
    navigate(`/graphs/${repo}`, { state: { data: graph_data } });
  };

  useEffect(() => {
    if (Object.keys(completedTasksData).length === Object.keys(globalData).length) {
      setRepoData(completedTasksData);
      return;
    }

    setLoading(true);
    const fetchMissingRepos = async () => {
      const updatedData = { ...completedTasksData };

      for (const url of Object.keys(globalData)) {
        if (!updatedData[url]) {
          const repo = await getRepoData(url);
          if (repo) {
            updatedData[url] = repo;
          }
        }
      }

      setRepoData(updatedData);
      setCompletedTasksData(updatedData);
      setLoading(false);
    };

    fetchMissingRepos();
  }, [globalData, completedTasksData, setCompletedTasksData]);

  return (
    <div className='container'>
      {loading ? (
        <div className='loading'>
          <Mosaic color={['#bb9afd', '#c25aeb', '#927cc3', '#a048bb']} size='large' text='' textColor='' />
        </div>
      ) : (
        Object.entries(repoData).map(([url, data], index) =>
          Array.isArray(data) && data.length > 0 ? (
            <RepoItem key={index} result={data[0]} onClick={() => handleClick(globalData[url], url)} />
          ) : null
        )
      )}
    </div>
  );
};

export default CompletedTasks;
