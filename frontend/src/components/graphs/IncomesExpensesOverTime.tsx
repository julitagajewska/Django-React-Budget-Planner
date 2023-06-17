import React from 'react'
import { TransactionType } from '../../data/types/Index'
import { Moment } from 'moment'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Chart } from 'react-chartjs-2';
import moment from 'moment';

type IncomesExpensesOverTimeProps = {
    transactions: TransactionType[],
    startDate: Moment,
    endDate: Moment,
    dataType: string
}

type TimelineEntryType = {
    month: number,
    year: number
}


const IncomesExpensesOverTime = ({ transactions, startDate, endDate, dataType }: IncomesExpensesOverTimeProps) => {

    // Months between dates
    let month = startDate.month()
    let year = startDate.year()
    let timelineEntries: TimelineEntryType[] = [];

    while (1) {
        let entry: TimelineEntryType = {
            month: month,
            year: year
        }

        timelineEntries.push(entry)


        if (year === endDate.year() && month === endDate.month()) {
            break
        }

        if (month === 11) {
            month = 0
            year++
        } else {
            month++
        }
    }


    // Split transactions into incomes and expenses
    var expenses: TransactionType[] = transactions.filter((transaction) => transaction.operationTypeID === 1);
    var incomes: TransactionType[] = transactions.filter((transaction) => transaction.operationTypeID === 2);

    // Group transactions by months
    const expensesByMonths: TransactionType[][] = [];
    const incomesByMonths: TransactionType[][] = [];

    timelineEntries.forEach((entry) => {
        expensesByMonths.push(expenses.filter((expense) => moment(expense.date).month() === entry.month && moment(expense.date).year() === entry.year));
        incomesByMonths.push(incomes.filter((income) => moment(income.date).month() === entry.month && moment(income.date).year() === entry.year));
    })

    const expensesDataset: number[] = [];
    const incomesDataset: number[] = [];

    expensesByMonths.forEach((expenseArray) => {
        if (dataType === 'Sum') {
            expensesDataset.push(expenseArray.reduce((partialSum, transaction) => partialSum + +transaction.value, 0))
        }

        if (dataType === 'Count') {
            expensesDataset.push(expenseArray.length)
        }
    })

    incomesByMonths.forEach((incomeArray) => {
        if (dataType === 'Sum') {
            incomesDataset.push(incomeArray.reduce((partialSum, transaction) => partialSum + +transaction.value, 0))
        }

        if (dataType === 'Count') {
            incomesDataset.push(incomeArray.length)
        }
    })

    // Month and year label
    const labels: string[] = [];
    timelineEntries.forEach((entry) => labels.push(`${moment.monthsShort()[entry.month]} ${entry.year}`))

    // Create line chart
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend)

    const data = {
        labels,
        datasets: [
            {
                label: 'Incomes',
                data: incomesDataset,
                borderColor: 'rgba(102, 175, 125, 1)',
                pointBackgroundColor: 'rgba(102, 175, 125, 1)',
                backgroundColor: 'rgba(102, 175, 125, 0.5)'
            },
            {
                label: 'Expenses',
                data: expensesDataset,
                borderColor: 'rgba(192, 44, 43, 1)',
                pointBackgroundColor: 'rgba(192, 44, 43, 1)',
                backgroundColor: 'rgba(192, 44, 43, 0.5)'
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    }


    return (
        <Line data={data} options={options} />
    )
}

export default IncomesExpensesOverTime