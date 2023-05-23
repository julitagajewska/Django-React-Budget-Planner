import { axisBottom, axisLeft } from 'd3-axis';
import { ScaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react'
import GridY from './GridY';

export type AxisLeftProps = {
    scale: ScaleLinear<number, number, never>;
    transform: string;
}


const AxisLeft = ({ scale, transform }: AxisLeftProps) => {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current)
                .call(axisLeft(scale).ticks(9));
        }


    }, [scale]);

    return (
        <>
            <GridY scale={scale} />
            <g ref={ref} transform={transform} className='x-axis' />
        </>
    )
}

export default AxisLeft