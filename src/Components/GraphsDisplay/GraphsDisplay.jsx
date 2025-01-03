// GraphSection.js
import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import './GraphsDisplay.scss';
import { useNavigate } from 'react-router-dom';

const GraphsDisplay = ({ fullNetworkData, keyCollaboratorsData, hierarchiesData }) => {
    const navigate = useNavigate();
    const [changeGraph, setChangeGraph] = useState(false);
    const drawGraph = (selector, graphData) => {
        const width = 1000;
        const height = 600;

        const svg = d3
            .select(selector)
            .html('') // Clear previous content
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', [-width / 2, -height / 2, width, height])
            .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')
            .call(
                d3.zoom()
                    .scaleExtent([0.1, 5])
                    .on('zoom', (event) => d3.select(selector).select('g').attr('transform', event.transform))
            )
            .append('g');

        const color = d3.scaleOrdinal(d3.schemeSet2);

        const simulation = d3
            .forceSimulation(graphData.nodes)
            .force('link', d3.forceLink(graphData.edges).id(d => d.id).strength(0.05))
            .force('charge', d3.forceManyBody().strength(-500))
            .force('center', d3.forceCenter(0, 0))
            .force('x', d3.forceX(0).strength(0.3)) // Pulls nodes horizontally toward center
            .force('y', d3.forceY(0).strength(0.3))// Pulls nodes vertically toward center
            .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.size || 1) * 12)); // Adjust radius to fit your graph


        const link = svg
            .append('g')
            .attr('stroke', '#aaa')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(graphData.edges)
            .join('line')
            .attr('stroke-width', d => Math.sqrt(d.weight / 10 || 1));

        const node = svg
            .append('g')
            .attr('stroke', '#bdbdbd')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(graphData.nodes)
            .join('circle')
            .attr('r', d => Math.sqrt(d.size || 1) * 10)
            .attr('fill', d => color(d.class))
            .call(
                d3.drag()
                    .on('start', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on('drag', (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on('end', (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        const labels = svg
            .append('g')
            .selectAll('text')
            .data(graphData.nodes)
            .join('text')
            .attr('dy', 3)
            .attr('x', 8)
            .text(d => d.id)
            .attr('font-size', 10)
            .attr('fill', '#333');

        simulation.on('tick', () => {
            link
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.attr('cx', d => d.x).attr('cy', d => d.y);
            labels.attr('x', d => d.x + 8).attr('y', d => d.y + 3);
        });
    };

    useEffect(() => {
        if (!changeGraph && fullNetworkData) {
            drawGraph('#fullNetwork', fullNetworkData);
        } else if (changeGraph && keyCollaboratorsData) {
            drawGraph('#keyCollaborators', keyCollaboratorsData);
        }
    }, [fullNetworkData, keyCollaboratorsData, changeGraph]);


    const calculateBusFactor = () => {
        let keyDevelopers = [];
        for (let name in keyCollaboratorsData.nodes) {
            if (keyCollaboratorsData.nodes[name].class === 1) {
                keyDevelopers.push(keyCollaboratorsData.nodes[name].id);

            }
        }
        return keyDevelopers.length;
    }

    const getKeyDevNames = () => {
        let keyDevelopers = [];
        for (let name in keyCollaboratorsData.nodes) {
            if (keyCollaboratorsData.nodes[name].class === 1) {
                keyDevelopers.push(keyCollaboratorsData.nodes[name].id);

            }
        }
        return keyDevelopers;
    }
    const fullGraphChange = (e) => {
        setChangeGraph(false);

    }
    const keyGraphChange = (e) => {
        setChangeGraph(true);
    }
    const handleNameClick = (name) => {
        // console.log(graph_data);
        const filedata = hierarchiesData.find(dict => dict.name === name)
        navigate(`/file-contribution/${name}`, { state: { data: filedata } });
    };
    return (
        <div className="outer-container">
            <div className="graph-container">

                <div className="inner-container">
                    <div className="button-container">
                        <div
                            className={`graph-heading ${!changeGraph ? 'active' : 'inactive'}`}
                            onClick={fullGraphChange}
                        >
                            Full Contribution Network
                        </div>
                        <div
                            className={`graph-heading ${changeGraph ? 'active' : 'inactive'}`}
                            onClick={keyGraphChange}
                        >
                            Key Collaborators Network
                        </div>
                    </div>
                    {!changeGraph && <svg id="fullNetwork"></svg>}
                    {changeGraph && <svg id="keyCollaborators"></svg>}
                </div>

            </div>
            <div className="bus-factor">
                <div className='title'>Bus Factor : {calculateBusFactor()}</div>
                <div className="sub-title">
                    Key Developers
                </div>
                <div className='key-devs'>
                    {getKeyDevNames().map((name, index) => (
                        <div key={index} onClick={() => handleNameClick(name)}>
                            <span>{name}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default GraphsDisplay;
