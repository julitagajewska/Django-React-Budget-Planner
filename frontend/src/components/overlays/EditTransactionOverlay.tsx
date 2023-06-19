import React, { Dispatch, SetStateAction, useState } from 'react'
import OverlayWindowContainer from '../ui/containers/OverlayWindowContainer';
import OverlayContainer from '../ui/containers/OverlayContainer';
import TextButton from '../ui/buttons/TextButton';
import { CategoryType, TransactionCategoryType, TransactionType } from '../../data/types/Index';
import TextInput from '../ui/inputs/TextInput';
import TextareaInput from '../ui/inputs/TextareaInput';
import ButtonWithChildren from '../ui/buttons/ButtonWithChildren';
import { RxCross2 } from 'react-icons/rx';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import SelectionInput from '../ui/inputs/SelectionInput';
import moment from 'moment';


type EditTransactionOverlayProps = {
    categories: TransactionCategoryType[],
    transaction: TransactionType,
    setVisibility: Dispatch<SetStateAction<boolean>>,
    setDetailsOverlayVisibility: Dispatch<SetStateAction<boolean>>,
    handleEdit: (transaction: TransactionType) => void
}

const EditTransactionOverlay = ({ categories, transaction, setVisibility, setDetailsOverlayVisibility, handleEdit }: EditTransactionOverlayProps) => {

    // User data
    const [name, setName] = useState<string>(transaction.name);
    const [nameError, setNameError] = useState<string>('');

    const [recipient, setRecipient] = useState<string>(transaction.recipient);
    const [recipientError, setRecipientError] = useState<string>('');

    const [description, setDescription] = useState<string>(transaction.description);
    const [operationTypeID, setOperationTypeID] = useState<number>(transaction.operationTypeID);
    const [categoryID, setCategoryID] = useState<number>(transaction.categoryID);
    const [date, setDate] = useState<Date>(transaction.date);

    const [value, setValue] = useState<string>(transaction.value);
    const [valueError, setValueError] = useState<string>('');

    const [operationTypeDropdownVisible, setOperationTypeDropdownVisible] = useState<boolean>(false);

    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState<boolean>(false);
    const [categoryError, setCategoryError] = useState<string>('');

    let expenseCategories: TransactionCategoryType[] = categories.filter(category => category.operationTypeId === 1);
    let incomeCategories: TransactionCategoryType[] = categories.filter(category => category.operationTypeId === 2);

    let category = categories.filter(category => category.id === categoryID)[0]

    const handleCancel = () => {
        setVisibility(false);
        setDetailsOverlayVisibility(true);
    }

    const handleSave = () => {
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

        if (operationTypeID !== category.operationTypeId) {
            setCategoryError('Choose category')
            return
        }
        setCategoryError('')

        var regex = new RegExp("^[a-zA-Z0-9]+$");
        if (!regex.test(value)) {
            setValueError('Enter correct value')
            return
        }
        setValueError('')

        let newTransaction: TransactionType = {
            id: transaction.id,
            name: name,
            value: value.toString(),
            description: description,
            recipient: recipient,
            date: date,
            walletID: transaction.walletID,
            categoryID: categoryID,
            operationTypeID: operationTypeID
        }

        handleEdit(newTransaction);
        setVisibility(false);
        setDetailsOverlayVisibility(true);
    }

    const handleExit = () => {
        setVisibility(false);
    }

    const handleTransactionTypeSelect = (transactionId: number) => {

    }

    const handleCategorySelect = (categoryName: string) => [
    ]

    return (
        <OverlayContainer>
            <OverlayWindowContainer>

                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex flex-row gap-2 items-center'>
                        <p className='text-black font-bold opacity-75'>Edit transaction</p>
                        <TextButton text='Cancel' onClick={handleCancel} />
                        <TextButton text='Save' onClick={handleSave} />
                    </div>
                    <div>
                        <ButtonWithChildren onClick={handleExit}>
                            <RxCross2 />
                        </ButtonWithChildren>
                    </div>
                </div>

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
                    <TextareaInput value={description} onChange={setDescription} />
                </div>

                {/* <div className='flex flex-col justify-center items-start'>
                    <p className='opacity-50 text-sm'>Operation type</p>
                    <SelectionInput select={setTransactionTypeID} selectedItemID={transactionTypeID} items={transationTypesItems} />
                </div> */}

                <div className='flex flex-col justify-center items-start'>
                    <p className='opacity-50 text-sm'>Operation type</p>
                    <div className='relative'>
                        <button className='flex flex-row justify-center items-center w-48 bg-orange-100 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={() => setOperationTypeDropdownVisible(!operationTypeDropdownVisible)}>
                            <span className='overflow-hidden truncate'>{operationTypeID === 1 ? 'Expense' : 'Income'}</span>
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
                            <span className='overflow-hidden truncate'>{operationTypeID === category.operationTypeId ? category.name : 'Select category ...'}</span>
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

                {/* <div className='flex flex-col justify-center items-start'>
                    <p className='opacity-50 text-sm'>Category</p>
                    <SelectionInput select={setCategoryID} selectedItemID={categoryID} items={categryItems} />
                </div> */}

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

                <div className='flex flex-col justify-center items-start'>
                    <p className='opacity-50 text-sm'>Value</p>
                    <input type="number" value={value} onChange={(e) => setValue(e.target.value)} min={0} className='text-input' />
                    {valueError !== '' ? <span className='text-red-800 text-sm'>{valueError}</span> : <></>}
                </div>

            </OverlayWindowContainer>
        </OverlayContainer>

    )
}

export default EditTransactionOverlay