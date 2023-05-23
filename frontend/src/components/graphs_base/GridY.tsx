import { axisLeft } from 'd3-axis';
import { ScaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react'

export type GridYProps = {
    scale: ScaleLinear<number, number, never>;
}

const GridY = ({ scale }: GridYProps) => {

    const ref = useRef<SVGGElement>(null);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;

    useEffect(() => {
        if (ref.current) {
            select(ref.current)
                .call(axisLeft(scale).tickSize(-width).ticks(9));
        }
    }, [scale]);

    return (
        <g ref={ref} className='y-grid' />
    )
}

export default GridY