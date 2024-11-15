// GraphSection.js
import React, { useEffect } from 'react';
import * as d3 from 'd3';
import './GraphsDisplay.scss';
const GraphsDisplay = ({ fullNetworkData, keyCollaboratorsData }) => {
    const drawGraph = (selector, graphData) => {
        const width = 1000;
        const height = 800;

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

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const simulation = d3
            .forceSimulation(graphData.nodes)
            .force('link', d3.forceLink(graphData.edges).id(d => d.id).strength(0.05))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(0, 0));

        const link = svg
            .append('g')
            .attr('stroke', '#aaa')
            .attr('stroke-opacity', 0.6)
            .selectAll('line')
            .data(graphData.edges)
            .join('line')
            .attr('stroke-width', d => Math.sqrt(d.weight/10 || 1));

        const node = svg
            .append('g')
            .attr('stroke', '#74499c')
            .attr('stroke-width', 1.5)
            .selectAll('circle')
            .data(graphData.nodes)
            .join('circle')
            .attr('r', d => Math.sqrt(d.size || 1) * 10)
            .attr('fill', '#c98fff')
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
        if (fullNetworkData) {
            drawGraph('#fullNetwork', fullNetworkData);
        }
        if (keyCollaboratorsData) {
            drawGraph('#keyCollaborators', keyCollaboratorsData);
        }
    }, [fullNetworkData, keyCollaboratorsData]);

    return (
        <div className="graph-container">
            <div className="graph-heading">Full Contribution Network</div>
            <svg id="fullNetwork"></svg>
            <div className="graph-heading">Key Collaborators Network</div>
            <svg id="keyCollaborators"></svg>
        </div>
    );
};

export default GraphsDisplay;
