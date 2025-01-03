import React, { useState, useEffect } from 'react';
import './SearchResultsList.scss';
import { FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { Mosaic } from 'react-loading-indicators';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { useMyContext } from '../../Global/GlobalProvider';
import RepoItem from '../RepoItem/RepoItem';

const SearchResultsList = ({ results }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const navigate = useNavigate();
  const socketRef = React.useRef(null);
  const { setGlobalData } = useMyContext();

  // Use a ref to track the socket connection

  useEffect(() => {
    // Establish the WebSocket connection
    socketRef.current = io.connect("http://localhost:5000/progress", { transports: ["websocket", "polling"] });

    socketRef.current.on("progress", (data) => {
      console.log("Progress received:", data.message);
      setProgress(data.message); // Update progress messages
    });

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      // if (socketRef.current) {
      //   socketRef.current.disconnect();
      // }
    };
  }, []);

  const handleClick = (repo_url) => {
    setLoading(true);
    setProgress("Connecting to server...");

    axios
      .post('http://localhost:5000/generate_graphs', { url: repo_url })
      .then((response) => {

        console.log(response.data);

        setGlobalData((prevData) => ({
          ...prevData,
          [repo_url]: response.data, // Use the URL as the key
        }));

        // Disconnect the WebSocket before navigating to /graphs
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
        const parsedUrl = new URL(repo_url);
        const repo = parsedUrl.pathname.slice(1);
        navigate(`/graphs/${repo}`, { state: { data: response.data } });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
        setProgress(""); // Clear progress messages
      });
  };

  return (
    <div className="results-list">
      {loading && (
        <div className="loading-indicator">
          <Mosaic color={["#bb9afd", "#c25aeb", "#927cc3", "#a048bb"]} size="large" text="" textColor="" />
          <p>{progress}</p>
        </div>
      )}
      {!loading &&
        results.map((result, id) => {
          return (
            <RepoItem key={id} result={result} onClick={(result) => handleClick(result.url)} />
          );
        })}
    </div>
  );
};

export default SearchResultsList;
