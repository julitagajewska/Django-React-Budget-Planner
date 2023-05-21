import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from '../context/AuthContext';
import { getUsersWallets, getRecentTransactions, getWalletsTransactions } from '../services';
import PageContainer from '../layout/PageContainer';
import Sidebar from '../components/Sidebar';
import LoggedInPageContainer from '../layout/LoggedInPageContainer';

import { BiChevronDown, BiPlus } from 'react-icons/bi'
import { WalletType } from '../context/WalletContext';
import { TransactionType } from '../data/types/Transactions';
import moment from 'moment';
import { getExpenses, getIncomes, getTotalExpensesValue, getTotalIncomesValue } from '../utils/Index';

const Home = () => {

    const { user, authTokens, logout } = useContext(AuthContext) as AuthContextType;

    const [wallets, setWallets] = useState<WalletType[]>([]);
    const [selectedWallet, setSelectedWallet] = useState<WalletType>();
    const [walletsDropdownVisible, setWalletsDropdownVisible] = useState(false);
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [incomesTotal, setIncomesTotal] = useState<number>(0);
    const [expensesTotal, setExpensesTotal] = useState<number>(0);

    useEffect(() => {
        getUsersWallets(authTokens.accessToken, logout)
            .then((response) => {
                setWallets(response);
                setSelectedWallet(response[0])

                getWalletsTransactions(authTokens.accessToken, response[0].id, logout)
                    .then((response) => {
                        setIncomesTotal(getTotalIncomesValue(getIncomes(response)));
                        setExpensesTotal(getTotalExpensesValue(getExpenses(response)));
                    })

                getRecentTransactions(authTokens.accessToken, response[0].id, logout)
                    .then((response) => {
                        setTransactions(response)
                    });
            })
    }, [])

    useEffect(() => {
        if (selectedWallet) {
            getWalletsTransactions(authTokens.accessToken, selectedWallet.id, logout)
                .then((response) => {
                    setIncomesTotal(getTotalIncomesValue(getIncomes(response)));
                    setExpensesTotal(getTotalExpensesValue(getExpenses(response)));
                })
            getRecentTransactions(authTokens.accessToken, selectedWallet.id, logout)
                .then((response) => {
                    setTransactions(response)
                });
        }


    }, [selectedWallet])

    return (
        <LoggedInPageContainer>
            {/* TOP SECTION */}
            <div className='h-10 flex flex-row justify-between items-center text-black text-opacity-60'>
                <div className='flex flex-row gap-10 items-center'>
                    <h1 className='font-semibold'>Main Dashboard</h1>
                    <div className='relative'>
                        <button className='flex flex-row justify-center items-center bg-orange-600 bg-opacity-20 cursor-pointer rounded-full pl-6 pr-4 pt-1 gap-2' onClick={() => setWalletsDropdownVisible(!walletsDropdownVisible)}>
                            <span>{selectedWallet?.name}</span>
                            <BiChevronDown className={`${walletsDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                        </button>
                        <ul className={`${walletsDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition duration-150 ease-in-out absolute left-0 top-10 backdrop-blur-md bg-orange-600 bg-opacity-20 flex flex-col justify-center items-center w-full rounded-xl gap-2 py-2`}>
                            {wallets.map((element) =>
                                <li
                                    className='cursor-pointer'
                                    onClick={() => {
                                        setSelectedWallet(element);
                                        setWalletsDropdownVisible(false);
                                    }}>
                                    {element.name}
                                </li>)}
                        </ul>
                    </div>
                </div>

                <div>
                    Date selection
                </div>

                <div>
                    <div className='flex flex-row items-center gap-5'>
                        <span>{user.username}</span>
                        <div className='bg-slate-500 w-10 h-10 rounded-full'></div>
                    </div>
                </div>
            </div>

            {/* GRID */}
            <div className='main-dashboard-grid grid grid-cols-6 w-full h-full gap-4 text-white'>

                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 flex flex-col justify-center'>
                    <span className='text-sm'>Total funds</span>
                    <h1 className='font-bold text-xl text-opacity-90'>{selectedWallet?.balance} $</h1>
                </div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 flex flex-col justify-center'>
                    <span className='text-sm'>Total incomes</span>
                    <h1 className='font-bold text-xl text-opacity-90 text-green-700'>+ {incomesTotal} $</h1>
                </div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 flex flex-col justify-center'>
                    <span className='text-sm'>Total expenses</span>
                    <h1 className='font-bold text-xl text-opacity-90 text-red-700'>- {expensesTotal} $</h1>
                </div>

                <div className='h-full w-full flex flex-col shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-7 py-5 col-span-3 row-span-4'>
                    <div className='w-ful flex flex-row justify-between items-center mb-4'>
                        <h1 className='font-bold text-xl text-opacity-90'>Recent transactions</h1>
                        <button className='bg-orange-600 bg-opacity-20 hover:bg-opacity-30 transition duration-200 ease-in-out cursor-pointer shadow-md flex flex-row items-center gap-2 w-fit px-4 py-1 rounded-md'>
                            <BiPlus />
                            <span className='font-medium text-sm text-opacity-90'>New Transaction</span>
                        </button>
                    </div>
                    <ul className='flex flex-col h-full gap-2'>
                        {transactions.map(transaction =>
                            <div className='rounded-sm text-sm bg-orange-600 bg-opacity-0 hover:bg-opacity-10 cursor-pointer transition duration-200 ease-in-out w-full h-10 flex flex-row justify-between items-center gap-4 px-2'>
                                <div className='flex flex-col'>
                                    <span className='w-44 font-medium text-sm truncate text-ellipsis'>{transaction.description}</span>
                                    <span className='w-44 text-xs truncate text-ellipsis'>{transaction.recipient}</span>

                                </div>
                                <span className='w-20'>{transaction.categoryID}</span>
                                <span className='w-30'>{(moment(transaction.date)).format('DD MMM YYYY')}</span>
                                <span className='w-30'>{(moment(transaction.date)).format('h:mm')}</span>
                                <span className={`w-20 text-right ${transaction.transactionTypeID === 1 ? 'text-green-600 ' : 'text-red-600'}`}>
                                    {transaction.transactionTypeID === 1 ? '+ ' : '- '}
                                    {transaction.value}
                                </span>
                            </div>
                        )}
                    </ul>

                </div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 col-span-3 row-span-3'>Expense history</div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 col-span-4 row-span-4'>Incomes vs expenses</div>
                <div className='h-full w-full shadow-md bg-white bg-opacity-10 rounded-md text-black text-opacity-50 px-4 py-2 col-span-2 row-span-4'>Expenses distribution</div>

            </div>
        </LoggedInPageContainer>
    )
}

export default Home