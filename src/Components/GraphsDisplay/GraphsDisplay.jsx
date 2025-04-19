// GraphsDisplay.js
import React, { useEffect, useState } from 'react';
import './GraphsDisplay.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../Global/GlobalProvider';
import GraphCanvas from './GraphCanvas';
import KeyDeveloperList from './KeyDeveloperList';
import ProjectGuideButton from './ProjectGuideButton';
import { Mosaic } from 'react-loading-indicators';

const GraphsDisplay = ({ fullNetworkData, keyCollaboratorsData, hierarchiesData }) => {
    const [changeGraph, setChangeGraph] = useState(false);
    const location = useLocation();
    const repo = location.pathname.replace("/graphs/", "");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState("");


    const { documentationData, setDocumentationData } = useMyContext();

    const handleNameClick = (name) => {
        const filedata = hierarchiesData.find(dict => dict.name === name);
        navigate(`/file-contribution/${name}`, { state: { data: filedata } });
    };

    const calculateBusFactor = () => {
        return keyCollaboratorsData.nodes.filter(n => n.class === 1).length;
    };

    const getKeyDevNames = () => {
        return keyCollaboratorsData.nodes
            .filter(n => n.class === 1)
            .map(n => n.id);
    };


    return (
        <>
            {loading && (
                <div className="overlay-loader">
                    <Mosaic color={["#bb9afd", "#c25aeb", "#927cc3", "#a048bb"]} size="large" />
                    <p>{progress}</p>
                </div>
            )}

        {!loading &&(
                <div className="outer-container">
                <div className="graph-container">
                    <div className="inner-container">
                        <div className="button-container">
                            <div
                                className={`graph-heading ${!changeGraph ? 'active' : 'inactive'}`}
                                onClick={() => setChangeGraph(false)}
                            >
                                Full Contribution Network
                            </div>
                            <div
                                className={`graph-heading ${changeGraph ? 'active' : 'inactive'}`}
                                onClick={() => setChangeGraph(true)}
                            >
                                Key Collaborators Network
                            </div>
                            <ProjectGuideButton
                                repo={repo}
                                documentationData={documentationData}
                                setDocumentationData={setDocumentationData}
                                loading={loading}
                                setLoading={setLoading}
                                progress={progress}
                                setProgress={setProgress}
                            />
                        </div>

                        {!changeGraph && fullNetworkData && (
                            <GraphCanvas selector="#fullNetwork" graphData={fullNetworkData} />
                        )}
                        {changeGraph && keyCollaboratorsData && (
                            <GraphCanvas selector="#keyCollaborators" graphData={keyCollaboratorsData} />
                        )}
                    </div>
                </div>

                <div className="bus-factor">
                    <div className='title'>Bus Factor : {calculateBusFactor()}</div>
                    <div className="sub-title">Key Developers</div>
                    <KeyDeveloperList names={getKeyDevNames()} onClick={handleNameClick} />
                </div>
            </div>
        )
        }
        </>
    );
};

export default GraphsDisplay;
