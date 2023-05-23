import { axisBottom } from 'd3-axis';
import { ScaleBand } from 'd3-scale';
import { select } from 'd3-selection';
import React, { useEffect, useRef } from 'react'

export type AxisBottomProps = {
    scale: ScaleBand<string>;
    transform: string;
}


const AxisBottom = ({ scale, transform }: AxisBottomProps) => {

    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return (
        <g className="x-axis" ref={ref} transform={transform} />
    );
}

export default AxisBottom