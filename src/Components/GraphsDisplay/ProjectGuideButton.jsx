// ProjectGuideButton.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from "socket.io-client";


const ProjectGuideButton = ({
    repo,
    documentationData,
    setDocumentationData,
    loading,
    setLoading,
    progress,
    setProgress
}) => {

    const navigate = useNavigate();
    const repo_url = `https://github.com/${repo}`;
    const socketRef = React.useRef(null);

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

    const handleClick = async () => {
        setLoading(true);
        setProgress("Connecting to server...");
        if (documentationData[repo_url]) {
            setLoading(false);
            console.log("Using cached documentation data.");
            if (socketRef.current) {
                socketRef.current.disconnect();
            }

            setTimeout(() => {
                navigate(`/documentation`, { state: { data: documentationData[repo_url] } });
            }, 300);

            return;
        }


        try {
            const response = await axios.post("http://localhost:5000/process_repo", { repo_url });

            setDocumentationData(prevDocs => ({
                ...prevDocs,
                [repo_url]: response.data,
            }));

            if (socketRef.current) {
                socketRef.current.disconnect();
            }

            // Give React time to show loading state before navigating
            setTimeout(() => {
                navigate(`/documentation`, { state: { data: response.data } });
            }, 300);
        } catch (error) {
            console.error("Error fetching documentation:", error);
        }
        finally {
            setLoading(false);
            setProgress("");
        }
    };

    return (
        <div className="graph-heading-new" onClick={handleClick}>
            Project guide
        </div>
    );
};

export default ProjectGuideButton;
