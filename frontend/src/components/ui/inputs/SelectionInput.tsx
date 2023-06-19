import React, { useState } from 'react';
import { BiChevronDown, BiPlus } from 'react-icons/bi';

type SelectionInputProps = {
    select: React.Dispatch<React.SetStateAction<number>>,
    selectedItemID: number,
    items: SelectionItem[]
}

export type SelectionItem = {
    id: number,
    name: string
}

const SelectionInput = ({ select, items, selectedItemID }: SelectionInputProps) => {

    const [isSelectionVisible, setIsSelectionVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(items.find(item => item.id === selectedItemID) === undefined ? '-' : items.filter(a => a.id === selectedItemID)[0].name);

    console.log(items)
    console.log(selectedItemID)

    return (
        <div className='relative'>
            <button className='flex flex-row justify-center items-center w-48 bg-orange-100 hover:bg-opacity-30 transition duration-200 ease-in-out shadow-md bg-opacity-20 cursor-pointer rounded-md pl-6 pr-4 pt-1 pb-1 gap-2' onClick={(e) => setIsSelectionVisible(!isSelectionVisible)}>
                {selected}
                <BiChevronDown className={`${isSelectionVisible ? '-rotate-180' : ''} transition duration-150 ease-in-out`} />
            </button>

            <ul className={`${isSelectionVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} dropdown-background shadow-md overflow-hidden text-ellipsis w-48 transition duration-150 ease-in-out absolute left-0 top-10 z-20 bg-opacity-30 flex flex-col justify-center items-center rounded-xl gap-2 py-2 px-2`}>
                <div className='absolute w-full h-full z-30 bg-white bg-opacity-10'></div>
                {
                    items.map((item) =>
                        <li className='cursor-pointer overflow-hidden truncate w-full text-center bg-orange-100 bg-opacity-0 hover:bg-opacity-30 z-40 transition duration-200 ease-in-out py-1 px-2 rounded-lg'
                            onClick={() => {
                                select(item.id);
                                setSelected(item.name)
                                setIsSelectionVisible(false)
                            }}>
                            {item.name}
                        </li>)
                }
            </ul>
        </div>
    )
}

export default SelectionInput