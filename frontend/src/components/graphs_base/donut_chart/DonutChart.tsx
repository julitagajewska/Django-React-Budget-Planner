import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';
import DonutChartTiles from './DonutChartTiles';
import DonutChartTest from './chatgpt';

type DatasetEntryType = {
    key: string
    value: number
}

type DonutChartProps = {
    dataset: DatasetEntryType[]
}

const DonutChart = ({ dataset }: DonutChartProps) => {

    var ref = useRef(null);

    const width = 150
    const height = 150;
    const margin = { top: 30, right: 40, bottom: 30, left: 40 }

    // Pie generator
    var pie = d3.pie<DatasetEntryType>()
        .sort(null)
        .value(d => d.value);

    // Arc generator
    var arc = d3.arc<DatasetEntryType>()
        .innerRadius(Math.min(width, height) / 2 - 100)
        .outerRadius(Math.min(width, height) / 2 - 1)
        .cornerRadius(15);

    // ???
    var arcLabel = function () {
        const radius = Math.min(width, height) / 2 * 0.8;
        return d3.arc().innerRadius(radius).outerRadius(radius);
    }

    // Function to assign a new color
    var color = d3.scaleOrdinal<string>()
        .domain(dataset.map(d => d.key))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), dataset.length).reverse())

    // Create an array of arcs
    const arcs = pie(dataset);

    // d3.select(ref.current)
    //     .selectAll("path")
    //     .data(arcs)
    //     .enter().append("path")
    //     .attr("fill", d => color(d.data.key))

    //     // @ts-ignore
    //     .attr("d", arc)
    //     .append("title")
    //     .text(d => `${d.data.key}: ${d.data.value}`);

    const data = dataset.map((entry) => {
        return { label: entry.key, value: entry.value }
    })


    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}>

            <DonutChartTest data={data} width={100} height={100} />

            {/* <g ref={ref} transform={`translate(${width / 2}, ${height / 2})`}>
                <DonutChartTiles dataset={dataset} arcs={arcs} arc={arc} color={color} />
            </g> */}

        </svg>
    )
}

export default DonutChart