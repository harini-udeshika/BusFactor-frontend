import React, { useState } from 'react'
import SearchBar from '../Components/SearchBar/SearchBar'
import SearchResultsList from '../Components/SearchResultsList/SearchResultsList';


function Home() {

    const [results, setResults] = useState([]);
    return (

        <>
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
        </>

    )
}

export default Home