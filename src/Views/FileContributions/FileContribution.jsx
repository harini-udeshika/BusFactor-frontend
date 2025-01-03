import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import TreeMap from '../../Components/TreeMap/TreeMap';
import './FileContribution.scss';
function FileContribution() {
    const location = useLocation();
    const { data } = location.state;
    const { name } = useParams();

    return (
        <div>
            <h1>Unique file contributions by {name}</h1>
            <TreeMap data={data} />
        </div>
    )
}

export default FileContribution