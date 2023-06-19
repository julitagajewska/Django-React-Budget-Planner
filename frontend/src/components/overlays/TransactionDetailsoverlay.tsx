import React, { Dispatch, SetStateAction, useState } from 'react';

import { RxCross2 } from 'react-icons/rx';
import { AiFillEdit } from 'react-icons/ai';
import { BiChevronDown, BiPlus } from 'react-icons/bi';

import { TransactionType } from '../../data/types/Transactions';
import { TransactionCategoryType } from '../../data/types/Index';
import moment, { Moment } from 'moment';

type TransactionDetailsoverlayProps = {
    transaction: TransactionType,
    categories: TransactionCategoryType[],
    setVisibility: Dispatch<SetStateAction<boolean>>,
    setDeleteOverlayVisibility: Dispatch<SetStateAction<boolean>>,
    setEditOverlayVisibility: Dispatch<SetStateAction<boolean>>,
}

const TransactionDetailsoverlay = ({ transaction, categories, setVisibility, setDeleteOverlayVisibility, setEditOverlayVisibility }: TransactionDetailsoverlayProps) => {

    return (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 backdrop-blur-md flex flex-col justify-center items-center text-black`}>
            <div className={`overlay-container bg-opacity-50 w-[30rem] h-fit px-9 py-6 rounded-lg shadow-lg transition duration-200 ease-in-out`}>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-black font-bold opacity-75'>Transaction details</p>
                        <button onClick={(e) => setEditOverlayVisibility(true)} className='bg-orange-600 text-black text-opacity-25 hover:text-opacity-50 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out'>
                            <p className='text-sm font-semibold'>Edit</p>
                        </button>
                        <button onClick={(e) => setDeleteOverlayVisibility(true)} className='bg-orange-600 text-black text-opacity-25 hover:text-opacity-50 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out'>
                            <p className='text-sm font-semibold'>Delete</p>
                        </button>
                    </div>
                    <button onClick={(e) => setVisibility(false)} className='bg-orange-600 text-black text-opacity-25 hover:text-opacity-50 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out'>
                        <RxCross2 />
                    </button>
                </div>

                <div className='w-full flex flex-col gap-4 pt-4'>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Name</p>
                        <h2 className='opacity-75'>{transaction?.name}</h2>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Recipient</p>
                        <h2 className='opacity-75'>{transaction?.recipient}</h2>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Description</p>
                        <h2 className='opacity-75'>{transaction?.description}</h2>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Kategoria</p>
                        <h2 className='opacity-75'>{categories.find(category => category.id === transaction.categoryID)?.name}</h2>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Data</p>
                        <h2 className='opacity-75'>{(moment(transaction.date)).format('DD MMM YYYY')} {(moment(transaction.date)).format('HH:mm')}</h2>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Value</p>
                        <h2 className='opacity-75'>{transaction.value} $</h2>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Operation type</p>
                        <h2 className='opacity-75'>{transaction.operationTypeID === 1 ? 'Expense' : 'Income'}</h2>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TransactionDetailsoverlay