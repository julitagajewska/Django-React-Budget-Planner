import React, { useEffect, useRef, useState } from 'react'
import { IncomesVsExpensesDatasetEntryType } from '../../data/types/GraphTypes';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
import { MonthAndYearType } from '../../data/types/MonthAndYearType';
import * as d3 from 'd3';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

type GroupedBarChartProps = {
    dataset: IncomesVsExpensesDatasetEntryType[],
}

const GroupedBarChart = ({ dataset }: GroupedBarChartProps) => {

    // Datasets
    const [incomes] = useState(dataset.map((entry) => entry.incomeSum));
    const [expenses] = useState(dataset.map((entry) => entry.expenseSum));
    const [months] = useState(dataset.map((entry) => entry.month))
    const svgRef = useRef(null);

    // Obseerve data change
    useEffect(() => {
        // Set up svg container
        // Graph size
        const width = 550;
        const height = 250;
        const margin = {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }

        // Refenrence the DOM object
        const svg = select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .attr('overflow', 'visible')

        const subgroups = ['incomes', 'expenses'];

        // Set scaling
        const xScale = scaleBand()
            .domain(months)
            .range([0, width])
            .padding(0.2)

        const yScale = scaleLinear()
            .domain([0, height])
            .range([height, 0])

        // Set axes
        const xAxis = axisBottom(xScale)
            .ticks(months);

        const yAxis = axisLeft(yScale)
            .ticks(10)

        const xGroups = scaleBand()
            .domain(subgroups)
            .range([0, xScale.bandwidth()])
            .padding(0.5)

        // Colors
        const colors = scaleOrdinal<string>()
            .domain(['incomes', 'expenses'])
            .range(['#2C8649', '#C02C2B'])
            .unknown("grey");

        svg.append('g')
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)

        svg.append('g')
            .call(yAxis)

        // Draw the svg
        // svg.append('g')
        //     .selectAll('bar')
        //     .data(dataset)
        //     .enter()
        //     .append('g')
        //     .attr("transform", function (d) { return "translate(" + xScale(d.month) + ",0)"; })
        //     .selectAll("rect")
        //     .data((d) => subgroups.map((group) => {
        //         if (group === 'incomes') {
        //             return {
        //                 key: group,
        //                 value: d['incomeSum']
        //             }
        //         }
        //         return {
        //             key: group,
        //             value: d['expenseSum']
        //         }
        //     }
        //     ))
        //     .enter()
        //     .join("rect")
        //     .attr("x", (d) => xGroups(d.key)!)
        //     .attr('y', (d) => yScale(d.value)!)
        //     .attr("width", xGroups.bandwidth())
        //     .attr("height", function (d) { return height - yScale(d.value); })
        //     .attr("fill", (d) => colors(d.key));

        console.log(yScale(650))

        svg.selectAll('.bar')
            .data(dataset)
            .join('rect')
            .attr('x', (d) => xScale(d.month)!)
            .attr('y', (d) => yScale(d.incomeSum))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d.incomeSum))

    }, [incomes, expenses])

    // Data accessors
    const getIncomeSum = (d: IncomesVsExpensesDatasetEntryType) => d.incomeSum
    const getExpenseSum = (d: IncomesVsExpensesDatasetEntryType) => d.expenseSum

    // Datasets
    // const incomes = dataset.map((entry) => entry.incomeSum);
    // const expenses = dataset.map((entry) => entry.expenseSum);
    // const months = dataset.map((entry) => entry.month);

    const getMaxSum = (incomes: number[], expenses: number[]): number => {
        return Math.max(
            Math.max(...incomes),
            Math.max(...expenses)
        )
    }

    // // Graph size
    // const width = 400;
    // const height = 300;
    // const margin = {
    //     top: 20,
    //     bottom: 20,
    //     left: 20,
    //     right: 20
    // }

    // const xMax = width - margin.right - margin.left;
    // const yMax = height - margin.top - margin.bottom;

    // Scales
    // const incomesScale = scaleLinear()
    //     .domain(incomes)

    // const expensesScale = scaleLinear()
    //     .domain(expenses)

    // const yScale = scaleLinear()
    //     .domain([0, getMaxSum(incomes, expenses)])

    // const xScale = scaleBand()
    //     .domain(months)

    // yScale.rangeRound([0, yMax]);
    // incomesScale.rangeRound([0, xScale.bandwidth()])
    // expensesScale.rangeRound(([0, xScale.bandwidth()]))

    // Refs

    return (
        <svg ref={svgRef} className='ml-9 mt-4'>

        </svg>
    )
}

export default GroupedBarChart