import { Data } from 'plotly.js';
import React, { useEffect, useRef } from 'react'
import { IncomesVsExpensesDatasetEntryType } from '../../data/types/Index';
import AxisBottom from './AxisBottom';
import { scaleBand, scaleLinear } from 'd3-scale';
import AxisLeft from './AxisLeft';
import Bars from './Bars';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

export type BarChartProps = {
    dataset: IncomesVsExpensesDatasetEntryType[]
}

const BarChart = ({ dataset }: BarChartProps) => {

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 190 - margin.top - margin.bottom;

    // X Axis
    const xScale = scaleBand()
        .domain(dataset.map((entry: IncomesVsExpensesDatasetEntryType) => entry.month))
        .range([0, width])
        .padding(0.75)

    const xScaleIncomes = scaleBand()
        .domain(dataset.map((entry: IncomesVsExpensesDatasetEntryType) => entry.month))
        .range([0, width])
        .padding(0.75)

    const xScaleExpenses = scaleBand()
        .domain(dataset.map((entry: IncomesVsExpensesDatasetEntryType) => entry.month))
        .range([0, width])
        .padding(0.75)

    // Y Axis
    const yScale = scaleLinear()
        .domain([0, Math.max(...dataset.map((entry) => entry.incomeSum))])
        .range([height, 0]);


    type BarChartEntry = {
        key: string,
        value: number
    }

    const incomeEntries: BarChartEntry[] = dataset.map((entry) => {
        let barChartEntry: BarChartEntry = {
            key: entry.month,
            value: entry.incomeSum
        }

        return barChartEntry
    })

    const expenseEntries: BarChartEntry[] = dataset.map((entry) => {
        let barChartEntry: BarChartEntry = {
            key: entry.month,
            value: entry.expenseSum
        }

        return barChartEntry
    })



    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}>

            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom scale={xScale} transform={`translate(8, ${height})`} />
                <AxisLeft scale={yScale} transform={`translate(0, 0)`} />
                <Bars data={expenseEntries} height={height} scaleX={xScaleExpenses} scaleY={yScale} r={'192'} g={'44'} b={'43'} a={'0.5'} transactionType='expensesSum' />
            </g>

            <g transform={`translate(${margin.left + 15}, ${margin.top})`}>
                <Bars data={incomeEntries} height={height} scaleX={xScaleIncomes} scaleY={yScale} r={'102'} g={'175'} b={'125'} a={'0.5'} transactionType='incomesSum' />
            </g>

        </svg>
    )
}

export default BarChart