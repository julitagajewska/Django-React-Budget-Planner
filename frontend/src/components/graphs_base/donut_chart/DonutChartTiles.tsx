import { Arc, PieArcDatum, ScaleOrdinal, select } from 'd3'
import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'

type DatasetEntryType = {
    key: string
    value: number
}

type DonutChartTilesProps = {
    dataset: DatasetEntryType[],
    arcs: PieArcDatum<DatasetEntryType>[],
    arc: any
    color: ScaleOrdinal<string, string, never>
}

const DonutChartTiles = ({ dataset, arcs, arc, color }: DonutChartTilesProps) => {

    var ref = useRef(null)

    // useEffect(() => {

    //     console.log(arcs)
    //     if (ref.current) {
    //         select(ref.current)
    //             .selectAll("path")
    //             .data(arcs)
    //             .enter().append("path")
    //             .attr("fill", d => color(d.data.key))

    //             //ts-ignore
    //             .attr("d", arc)
    //             .append("title")
    //             .text(d => `${d.data.key}: ${d.data.value}`);

    //     }
    // }, []);


    return (

        // <g ref={ref}>

        // </g>

        <>
            {dataset.map((dataEntry) => {

                return (
                    <path
                        fill={color(dataEntry.key)}
                        d={arc}
                    />
                )
            })}
        </>
    )
}

export default DonutChartTiles