import React, { useEffect, useRef } from 'react'
import { TransactionType } from '../../data/types/Transactions'
import { filterTransactionsByType } from '../../utils/TransactionOperations'
import { filterTransactionsByCategories } from '../../utils/TransactionOperations'
import { CategoryType } from '../../data/types/Index'
import Plot from 'react-plotly.js'
import { scaleOrdinal } from 'd3-scale'
import { select } from 'd3-selection'
import { arc, pie } from 'd3'

type ExpenseDistributionProps = {
    transactions: TransactionType[]
}

const ExpenseDistribution = ({ transactions }: ExpenseDistributionProps) => {

    // -------- Dataset -------- Plotly.js -------- //

    // TransactionCount: [1, 2, 3]
    // CategoryName: ['Category_1', 'Category_2']

    // Get all transactions
    // Filter - get only expenses
    const getExpenses = filterTransactionsByType(2);
    const expenses = getExpenses(transactions);

    // Get wallet's categories - endpoint

    // Group transactions by category [][]
    const categories: CategoryType[] = [
        {
            id: 1,
            name: "Education",
            typeID: 2
        },
        {
            id: 2,
            name: "Food",
            typeID: 2
        },
        {
            id: 3,
            name: "Entertainment",
            typeID: 2
        },
        {
            id: 4,
            name: "Transport",
            typeID: 2
        },
        {
            id: 5,
            name: "category 5",
            typeID: 2
        },
        {
            id: 6,
            name: "Gifts",
            typeID: 2
        },
        {
            id: 7,
            name: "Health",
            typeID: 2
        },
    ]

    const filterByCategory = filterTransactionsByCategories(categories);
    const groupedExpenses = filterByCategory(expenses);
    console.log(groupedExpenses)

    // Count transactions for each category
    const expenseTransactionsCount: number[] = []
    groupedExpenses.forEach((expenseArray) => expenseTransactionsCount.push(expenseArray.length))

    const categoryNames: string[] = categories.map((category) => category.name);





    // Create dataset entry: ExpenseDistributionDatasetEntry[] - FOR D3
    //  key: 'category name'
    //  value: transactionCount: number

    type ExpenseDistributionDatasetEntry = {
        key: string
        value: number
    }

    const d3Dataset: ExpenseDistributionDatasetEntry[] = [];

    for (let i = 0; i < expenseTransactionsCount.length; i++) {
        let datasetEntry: ExpenseDistributionDatasetEntry = {
            key: categories[i].name,
            value: expenseTransactionsCount[i]
        }
        d3Dataset.push(datasetEntry);
    }

    console.log(d3Dataset);

    // D3

    var svgRef = useRef(null);

    // Dimentions
    var width = 300;
    var height = 300;
    var margin = { top: 30, right: 120, bottom: 30, left: 50 }
    var radius = Math.min(width, height) / 2;

    useEffect(() => {
        if (svgRef) {
            let svg = select(svgRef.current)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr("background-color", "blue")
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            // var pieChart = pie(d3Dataset)
            // .sort(null)
            // .value( => d.population);

            var arcElement = arc()
                .innerRadius(Math.min(width, height) / 2 - 100)
                .outerRadius(Math.min(width, height) / 2 - 1)
                .cornerRadius(15);
        }
    }, [transactions])

    return (
        // <Plot
        //     data={[
        //         {
        //             values: expenseTransactionsCount,
        //             labels: categoryNames,
        //             hole: .4,
        //             type: 'pie',
        //         }
        //     ]}
        //     layout={{ width: 320, height: 240, title: 'A Fancy Plot' }} />
        <div ref={svgRef}>

        </div>
    )
}

export default ExpenseDistribution