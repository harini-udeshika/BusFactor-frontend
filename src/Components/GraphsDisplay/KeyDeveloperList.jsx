// KeyDeveloperList.js
import React from 'react';

const KeyDeveloperList = ({ names, onClick }) => {
    return (
        <div className='key-devs'>
            {names.map((name, index) => (
                <div key={index} onClick={() => onClick(name)}>
                    <span>{name}</span>
                </div>
            ))}
        </div>
    );
};

export default KeyDeveloperList;
