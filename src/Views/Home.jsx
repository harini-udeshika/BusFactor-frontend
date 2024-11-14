import React, { useState } from 'react'
import SearchBar from '../Components/SearchBar/SearchBar'
import SearchResultsList from '../Components/SearchResultsList/SearchResultsList';
import Navbar from '../Components/Navbar/Navbar';

function Home() {

    const [results, setResults] = useState([]);
    return (

        <>
            <Navbar></Navbar>
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
        </>

    )
}

export default Home