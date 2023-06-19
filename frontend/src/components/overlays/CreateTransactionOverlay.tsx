import moment from 'moment';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { TransactionCategoryType } from '../../data/types/Index';
import TextInput from '../ui/inputs/TextInput';

type CreateTransactionOverlayProps = {
    setOverlayVisibility: Dispatch<SetStateAction<boolean>>,
    categories: TransactionCategoryType[]
}

const CreateTransactionOverlay = ({ setOverlayVisibility, categories }: CreateTransactionOverlayProps) => {

    // Name
    const [name, setName] = useState<string>();

    // Recipient
    const [recipient, setRecipient] = useState<string>();

    // Description
    const [description, setDescription] = useState<string>();

    // Category
    const [categoryID, setCategoryID] = useState<number>();
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState<boolean>(false);

    // Date
    const [date, setDate] = useState<Date>(moment().toDate());

    // Value
    const [value, setValue] = useState<number>();

    // Operation type
    const [operationTypeID, setOperationTypeID] = useState<number>(1);
    const [operationTypeDropdownVisible, setOperationTypeDropdownVisible] = useState<boolean>(false);


    let expenseCategories: TransactionCategoryType[] = categories.filter(category => category.operationTypeId === 1);
    let incomeCategories: TransactionCategoryType[] = categories.filter(category => category.operationTypeId === 2);

    const handleCreate = () => {

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

                    {/* <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Name</p>
                        <TextInput value={name} onChange={setName} />
                    </div> */}

                    {/* <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Recipient</p>
                        <TextInput value={recipient} onChange={setRecipient} />
                    </div> */}

                    <div className='flex flex-col justify-center items-start'>
                        <p className='opacity-50 text-sm'>Description</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='textarea-input' />
                    </div>

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
                                <span className='overflow-hidden truncate'>{categoryID === undefined ? 'Select category ...' : categories.find(category => category.id === categoryID)?.name} </span>
                                <BiChevronDown className={`${categoryDropdownVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
                            </button>
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
                        <div className='flex flex-row gap-4'>
                            <input type='month'
                                value={`${moment(date).year()}-${String(moment(date).month()).padStart(2, '0')}`}
                                onChange={(e) => setDate(moment(e.target.value).toDate())}
                                className='datePickerLight' />
                            <input type="time" value={`${String(moment(date).hours()).padStart(2, '0')}:${String(moment(date).minutes()).padStart(2, '0')}`} className='datePickerLight' />
                        </div>
                    </div>

                    <div className='flex flex-row justify-between items-end w-full'>
                        <div className='flex flex-col'>
                            <p className='opacity-50 text-sm'>Value</p>
                            <input type="number" value={value} onChange={(e) => setValue(+e.target.value)} className='text-input' />
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