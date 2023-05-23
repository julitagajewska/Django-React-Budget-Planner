import React, { useState } from 'react'
import { AxisLeftProps } from './AxisLeft';
import { AxisBottomProps } from './AxisBottom';
import { BarChartProps } from './BarChart';
import { select, selector } from 'd3-selection';

type BarChartEntry = {
    key: string,
    value: number
}

export type BarsProps = {
    data: BarChartEntry[],
    height: number,
    scaleX: AxisBottomProps["scale"],
    scaleY: AxisLeftProps["scale"],
    r: string,
    g: string,
    b: string,
    a: string,
    transactionType: string
}

const Bars = ({ data, height, scaleX, scaleY, r, g, b, a, transactionType }: BarsProps) => {

    const [fillColor, setFillColor] = useState(`rgba(${r}, ${g}, ${b}, ${a})`)


    const rx = 6;
    const ry = 6;

    const setFill = (e: any, fill: string) => {
        const element = e.target as HTMLDivElement
        element.style.fill = fill
    }

    return (
        <>
            {data.map((entry) => (
                <path
                    className='reansition duration-200 ease-in-out cursor-pointer shadow-lg'
                    key={`bar-${entry.key}`}
                    d={entry.value == 0 ?
                        ``
                        :
                        `
                        M${scaleX(entry.key)},${scaleY(entry.value)}
                        a${rx},${ry} 0 0 1 ${rx},${-ry}
                        h${scaleX.bandwidth() - 2 * rx}
                        a${rx},${ry} 0 0 1 ${rx},${ry}
                        v${height - scaleY(entry.value)}
                        h${-(scaleX.bandwidth())}Z`
                    }
                    fill={fillColor}
                    onMouseOver={(e) => setFill(e, `rgba(${r}, ${g}, ${b}, 1)`)}
                    onMouseLeave={(e) => setFill(e, `rgba(${r}, ${g}, ${b}, ${a})`)} />
            ))}
        </>
    );
}

export default Bars