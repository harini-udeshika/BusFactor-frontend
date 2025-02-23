import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import TreeMap from '../../Components/TreeMap/TreeMap';
import './FileContribution.scss';
function FileContribution() {
    const location = useLocation();
    const { data } = location.state;
    const { name } = useParams();

    return (
        <div className='file-contribution'>
            <div className='title'>Contributions by {name}</div>
            <TreeMap data={data} />
        </div>
    )
}

export default FileContribution