// GraphCanvas.js
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const GraphCanvas = ({ selector, graphData }) => {
    useEffect(() => {
        const width = 1000;
        const height = 600;

        const svg = d3
            .select(selector)
            .html('')
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
            .force('x', d3.forceX(0).strength(0.3))
            .force('y', d3.forceY(0).strength(0.3))
            .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.size || 1) * 12));

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
    }, [selector, graphData]);

    return <svg id={selector.replace('#', '')}></svg>;
};

export default GraphCanvas;
