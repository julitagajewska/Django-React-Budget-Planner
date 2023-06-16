import React, { useEffect, useRef, useState } from 'react'
import { TransactionType } from '../../data/types/Transactions'
import { filterTransactionsByType } from '../../utils/TransactionOperations'
import { filterTransactionsByCategories } from '../../utils/TransactionOperations'
import { CategoryType } from '../../data/types/Index'
import Plot from 'react-plotly.js'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import exp from 'constants'
import { getWalletsCategories } from '../../services/APIRequests'

type TransactionDistributionProps = {
    transactions: TransactionType[],
    usersCategories: CategoryType[]
}

type TransactionDistributionDatasetEntry = {
    key: string
    value: number
}

const TransactionDistribution = ({ transactions }: TransactionDistributionProps) => {

    const [transactionsType, setTransactionsType] = useState("incomes");

    // Categories mock data
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

    // Get categories' names
    const categoryNames = categories.map(category => category.name);

    // Calculate the data and pass it to the child component

    // Filter transactions by type (income/expense)
    const expenses = transactions.filter((transaction) => transaction.transactionTypeID === 2);

    // Group transactions by category
    const filterByCategory = filterTransactionsByCategories(categories);

    // Sum number of transactions for each category
    const expenseTransactionsCount: number[] = filterByCategory(expenses).map((expenseArray) => expenseArray.length);

    // Sum expenses values for each category
    const expenseTransactionsSum: number[] = filterByCategory(expenses).map((expenseArray) => {
        let sum = 0;
        expenseArray.forEach(expense => sum += +expense.value)
        return sum
    });

    // Chart setup

    ChartJS.register(ArcElement, Tooltip, Legend);

    const data = {
        labels: categoryNames,
        datasets: [{
            data: expenseTransactionsSum,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
    };

    return (
        <Doughnut data={data} />
    )
}

export default TransactionDistribution