import moment from 'moment';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { NewTransactionType, TransactionCategoryType } from '../../data/types/Index';
import TextInput from '../ui/inputs/TextInput';

type CreateTransactionOverlayProps = {
    setOverlayVisibility: Dispatch<SetStateAction<boolean>>,
    categories: TransactionCategoryType[],
    handleCreateTransaction: (transaction: NewTransactionType) => void,
    walletID: number | undefined
}

const CreateTransactionOverlay = ({ setOverlayVisibility, categories, handleCreateTransaction, walletID }: CreateTransactionOverlayProps) => {

    // Name
    const [name, setName] = useState<string>('');
    const [nameError, setNameError] = useState<string>('');


    // Recipient
    const [recipient, setRecipient] = useState<string>('');
    const [recipientError, setRecipientError] = useState<string>('');

    // Description
    const [description, setDescription] = useState<string>('');

    // Category
    const [categoryID, setCategoryID] = useState<number>(0);
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState<boolean>(false);
    const [categoryError, setCategoryError] = useState<string>('');

    // Date
    const [date, setDate] = useState<Date>(moment().toDate());

    // Value
    const [value, setValue] = useState<string>('');
    const [valueError, setValueError] = useState<string>('');


    // Operation type
    const [operationTypeID, setOperationTypeID] = useState<number>();
    const [operationTypeDropdownVisible, setOperationTypeDropdownVisible] = useState<boolean>(false);

    let category = categories.filter(category => category.id === categoryID)[0]

    let expenseCategories: TransactionCategoryType[] = categories.filter(category => category.operationTypeId === 1);
    let incomeCategories: TransactionCategoryType[] = categories.filter(category => category.operationTypeId === 2);

    const handleCreate = () => {
        if (name === '') {
            setNameError('Transaction name cannot be empty')
            return
        }
        setNameError('')

        if (recipient === '') {
            setRecipientError('Recipient cannot be empty')
            return
        }
        setRecipientError('')

        if (operationTypeID === undefined || !(category !== undefined && operationTypeID === category.operationTypeId)) {
            console.log(operationTypeID)
            console.log(category)
            setCategoryError('Choose category')
            return
        }
        setCategoryError('')

        var regex = new RegExp("^^\\d+(\\.\\d{2})?$");
        if (value !== undefined)
            if (!regex.test(value) || value === '') {
                setValueError('Enter correct value')
                return
            }
        setValueError('')

        if (walletID !== undefined) {
            let newTransaction: NewTransactionType = {
                name: name,
                value: value.toString(),
                description: description,
                recipient: recipient,
                date: date,
                walletID: walletID,
                categoryID: categoryID,
                operationTypeID: operationTypeID
            }

            handleCreateTransaction(newTransaction)
            setOverlayVisibility(false)
        }

    }

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 backdrop-blur-md flex flex-col justify-center items-center text-black'>

            <div className='overlay-container py-6 px-9 rounded-lg shadow-lg flex flex-col justify-center items-center'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-black font-bold opacity-75'>New transaction</p>
                    </div>
                    <button onClick={(e) => setOverlayVisibility(false)} className='bg-orange-600 text-black text-opacity-25 hover:text-opacity-50 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out'>
                        <RxCross2 />
                    </button>
                </div>

                <div className='w-full flex flex-col gap-4 pt-4'>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Name</p>
                        <TextInput value={name} onChange={setName} />
                        {nameError !== '' ? <span className='text-red-800 text-sm'>{nameError}</span> : <></>}
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Recipient</p>
                        <TextInput value={recipient} onChange={setRecipient} />
                        {recipientError !== '' ? <span className='text-red-800 text-sm'>{recipientError}</span> : <></>}
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Description</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='textarea-input' />
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Operation type</p>
                        <div className='relative'>
                            <button className='flex flex-row justify-center items-center w-48 bg-orange-100 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setOperationTypeDropdownVisible(!operationTypeDropdownVisible)}>
                                <span className='overflow-hidden truncate'>{operationTypeID === undefined ? '-' : operationTypeID === 1 ? 'Expense' : 'Income'}</span>
                                <BiChevronDown className={`${operationTypeDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                            </button>
                            <ul className={`${operationTypeDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} shadow-md overflow-hidden text-ellipsis w-48 transition duration-150 ease-in-out absolute left-0 top-10 z-20 dropdown-background bg-orange-100 bg-opacity-50 flex flex-col justify-center items-center rounded-xl gap-2 py-2 px-2`}>
                                <div className='absolute w-full h-full z-30 bg-white bg-opacity-10'>
                                </div>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-100 z-40 bg-opacity-0 hover:bg-opacity-30 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => {
                                        setOperationTypeID(1);
                                        setOperationTypeDropdownVisible(false);
                                    }}>
                                    Expense
                                </li>
                                <li
                                    className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-100 bg-opacity-0 z-40 hover:bg-opacity-30 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                    onClick={() => {
                                        setOperationTypeID(2);
                                        setOperationTypeDropdownVisible(false);
                                    }}>
                                    Income
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Category</p>
                        <div className='relative'>
                            <button className='flex flex-row justify-center items-center w-48 bg-orange-100 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setCategoryDropdownVisible(!categoryDropdownVisible)}>
                                <span className='overflow-hidden truncate'>{category !== undefined && operationTypeID === category.operationTypeId ? category.name : 'Select category ...'}</span>
                                <BiChevronDown className={`${categoryDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                            </button>
                            {categoryError !== '' ? <span className='text-red-800 text-sm'>{categoryError}</span> : <></>}
                            <ul className={`${categoryDropdownVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} dropdown-background shadow-md overflow-hidden text-ellipsis w-48 transition duration-150 ease-in-out absolute left-0 top-10 z-20 bg-opacity-30 flex flex-col justify-center items-center rounded-xl gap-2 py-2 px-2`}>
                                <div className='absolute w-full h-full z-30 bg-white bg-opacity-10'></div>

                                {operationTypeID === 1 ?

                                    expenseCategories.map((element) =>
                                        <li
                                            className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-100 bg-opacity-0 hover:bg-opacity-30 z-40 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                            onClick={() => {
                                                setCategoryID(element.id);
                                                setCategoryDropdownVisible(false);
                                            }}>
                                            {element.name}
                                        </li>)

                                    :

                                    incomeCategories.map((element) =>
                                        <li
                                            className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-100 bg-opacity-0 hover:bg-opacity-30 z-40 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                                            onClick={() => {
                                                setCategoryID(element.id);
                                                setCategoryDropdownVisible(false);
                                            }}>
                                            {element.name}
                                        </li>)

                                }

                            </ul>
                        </div>
                    </div>

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Date</p>
                        <div className='flex flex-row justify-start items-center gap-4'>
                            <input type='date'
                                className='datePickerLight'
                                value={moment(date).format('yyyy-MM-DD').toString()}
                                onChange={(e) => setDate(moment(e.target.value).toDate())} />
                            <input type='time'
                                className='datePickerLight'
                                value={moment(date).format('HH:mm').toString()}
                                onChange={(e) => {
                                    let inputArray = e.target.value.split(':')
                                    let newDate = moment(date);
                                    newDate.hour(+inputArray[0]);
                                    newDate.minute(+inputArray[1]);
                                    setDate(newDate.toDate())
                                }} />
                        </div>
                    </div>

                    <div className='flex flex-row justify-between items-end w-full'>
                        <div className='flex flex-col'>
                            <p className='opacity-50 text-sm'>Value</p>
                            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} min={0} step='0.01' className='text-input' />
                            {valueError !== '' ? <span className='text-red-800 text-sm'>{valueError}</span> : <></>}
                        </div>

                        <button onClick={(e) => handleCreate()} className='bg-orange-600 w-[8.75rem] text-black text-opacity-25 hover:text-opacity-50 bg-opacity-20 hover:bg-opacity-30 py-1 shadow-sm rounded-md transition duration-200 ease-in-out'>
                            Create
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CreateTransactionOverlay