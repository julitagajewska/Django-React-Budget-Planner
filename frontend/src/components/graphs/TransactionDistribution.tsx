import React, { useEffect, useRef, useState } from 'react'
import { TransactionType } from '../../data/types/Transactions'
import { filterTransactionsByType } from '../../utils/TransactionOperations'
import { filterTransactionsByCategories } from '../../utils/TransactionOperations'
import { CategoryType, TransactionCategoryType } from '../../data/types/Index'
import Plot from 'react-plotly.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import exp from 'constants'
import { getWalletsCategories } from '../../services/APIRequests'
import * as d3 from 'd3'

type TransactionDistributionProps = {
    transactions: TransactionType[],
    transactionCategories: TransactionCategoryType[],
    operationType: number
}

type TransactionDistributionDatasetEntry = {
    key: string
    value: number
}

type colorRangeInfoType = {
    colorStart: number,
    colorEnd: number,
    useEndAsStart: boolean
};

const TransactionDistribution = ({ transactions, transactionCategories, operationType }: TransactionDistributionProps) => {

    const [transactionsType, setTransactionsType] = useState("incomes");

    // Categories mock data
    // const categories: CategoryType[] = [
    //     {
    //         id: 1,
    //         name: "Education",
    //         typeID: 2
    //     },
    //     {
    //         id: 2,
    //         name: "Food",
    //         typeID: 2
    //     },
    //     {
    //         id: 3,
    //         name: "Entertainment",
    //         typeID: 2
    //     },
    //     {
    //         id: 4,
    //         name: "Transport",
    //         typeID: 2
    //     },
    //     {
    //         id: 5,
    //         name: "category 5",
    //         typeID: 2
    //     },
    //     {
    //         id: 6,
    //         name: "Gifts",
    //         typeID: 2
    //     },
    //     {
    //         id: 7,
    //         name: "Health",
    //         typeID: 2
    //     },
    // ]

    // Get categories' names

    const categoryNames = transactionCategories.map(category => category.name);

    // Calculate the data and pass it to the child component

    // Filter transactions by type (income/expense)
    const expenses = transactions.filter((transaction) => transaction.operationTypeID === operationType);

    // Group transactions by category
    const filterByCategory = filterTransactionsByCategories(transactionCategories);

    // Sum number of transactions for each category
    const expenseTransactionsCount: number[] = filterByCategory(expenses).map((expenseArray) => expenseArray.length);

    // Sum expenses values for each category
    const expenseTransactionsSum: number[] = filterByCategory(expenses).map((expenseArray) => {
        let sum = 0;
        expenseArray.forEach(expense => sum += +expense.value)
        return sum
    });

    // Generate chart colors
    const colorScale = operationType === 1 ? d3.interpolateYlOrRd : d3.interpolateYlGnBu;

    const colorRangeInfo: colorRangeInfoType = {
        colorStart: 0.2,
        colorEnd: 0.75,
        useEndAsStart: false,
    };

    const calculatePoint = (i: number, intervalSize: number, colorRangeInfo: colorRangeInfoType) => {
        var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
        return (useEndAsStart
            ? (colorEnd - (i * intervalSize))
            : (colorStart + (i * intervalSize)));
    }
    const interpolateColors = (dataLength: number, colorScale: (t: number) => string, colorRangeInfo: colorRangeInfoType) => {
        var { colorStart, colorEnd } = colorRangeInfo;
        var colorRange = colorEnd - colorStart;
        var intervalSize = colorRange / dataLength;
        var i, colorPoint;
        var colorArray = [];

        for (i = 0; i < dataLength; i++) {
            colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
            colorArray.push(colorScale(colorPoint));
        }

        return colorArray;
    }
    var COLORS = interpolateColors(expenseTransactionsSum.length, colorScale, colorRangeInfo);

    const setOppacity = (colors: string[], opacity: number) => {
        var colorsWithOpacity = colors.map((color) => {
            let colorArray = color.split('')
            colorArray.splice(0, 4)
            colorArray.splice(-1)
            let colorString = colorArray.join('')
            let rgbArray = colorString.split(', ')
            rgbArray.push(opacity.toString())
            let colorWithOpacity = `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${rgbArray[3]})`;
            return colorWithOpacity
        })

        return colorsWithOpacity
    }

    // Chart setup
    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: categoryNames,
        datasets: [{
            data: expenseTransactionsSum,
            backgroundColor: setOppacity(COLORS, 0.6),
            hoverBackgroundColor: setOppacity(COLORS, 1),
            borderColor: setOppacity(COLORS, 0.6),
            hoverBorderColor: setOppacity(COLORS, 1),
            hoverOffset: 4,
            cutout: '80%'
        }],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
            },
        },
        elements: {
            arc: {
                opacity: 0.2,
                borderRadius: 50,
                borderOpacity: 0.7
            },
        },
    };

    return (
        <Doughnut data={data} options={options} />
    )
}

export default TransactionDistribution