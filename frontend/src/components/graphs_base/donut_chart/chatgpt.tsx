import { Arc, PieArcDatum, ScaleOrdinal, select } from 'd3'
import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'

interface DonutChartProps {
    data: { label: string; value: number }[];
    width: number;
    height: number;
}

const DonutChartTest: React.FC<DonutChartProps> = ({ data, width, height }) => {
    const chartRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const margin = { top: 30, right: 120, bottom: 30, left: 50 };
            const tooltip = { width: 100, height: 100, x: 10, y: -30 };
            const radius = Math.min(width, height) / 2;
            const color = d3.scaleOrdinal<string>()
                .domain(data.map(d => d.label))
                .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

            const pie = d3.pie<{ label: string; value: number }>()
                .sort(null)
                .value(d => d.value);

            const arc = d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
                .innerRadius(radius - 100)
                .outerRadius(radius - 1)
                .cornerRadius(15);

            const arcLabel = () => {
                const labelRadius = radius * 0.8;
                return d3.arc<d3.PieArcDatum<{ label: string; value: number }>>()
                    .innerRadius(labelRadius)
                    .outerRadius(labelRadius);
            };

            const svg = d3.select(chartRef.current)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${(width + margin.left + margin.right) / 2}, ${(height + margin.top + margin.bottom) / 2})`);

            const arcs = pie(data);

            svg.append('g')
                .attr('stroke', 'white')
                .selectAll('path')
                .data(arcs)
                .enter()
                .append('path')
                .attr('fill', d => color(d.data.label))
                .attr('d', arc)
                .append('title')
                .text(d => `${d.data.label}: ${d.data.value}`);

            svg.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 12)
                .attr('text-anchor', 'middle')
                .selectAll('text')
                .data(arcs)
                .enter()
                .append('text')
                .attr('transform', d => `translate(${arcLabel().centroid(d)})`)
                .call(text =>
                    text
                        .append('tspan')
                        .attr('y', '-0.4em')
                        .attr('font-weight', 'bold')
                        .text(d => d.data.label)
                )
                .call(text =>
                    text
                        .filter(d => (d.endAngle - d.startAngle) > 0.25)
                        .append('tspan')
                        .attr('x', 0)
                        .attr('y', '0.7em')
                        .attr('fill-opacity', 0.7)
                        .text(d => d.data.value.toLocaleString())
                );
        }
    }, [data, width, height]);

    return <svg ref={chartRef}></svg>;
};

export default DonutChartTest;
