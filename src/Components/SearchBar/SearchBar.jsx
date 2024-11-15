import React, { useState, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './SearchBar.scss';

const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState('');
    const debounceTimeout = useRef(null); // Ref to store the timeout ID

    const fetchData = (value) => {
        axios.get('http://localhost:5000/search', {
            params: { value: value }
        })
        .then((response) => {
            setResults(response.data); // Set results to the returned data
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    };

    const handleChange = (value) => {
        
        setInput(value);

        // Clear results immediately if the input is empty and clear any existing debounce timeout
        if (!value.trim()) {
            setResults([]); // Clear results if input is empty
            clearTimeout(debounceTimeout.current);
            return;
        }

        // Clear the previous timeout if it exists
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        // Set a new timeout to call fetchData after a delay only if there is input
        debounceTimeout.current = setTimeout(() => {
            fetchData(value);
        }, 500); // Adjust delay as needed
    };
    

    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder="Search a GitHub repository..."
                value={input}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
