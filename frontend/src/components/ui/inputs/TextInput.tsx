import React, { Dispatch, SetStateAction } from 'react'

type TextInputProps = {
    value: string,
    onChange: Dispatch<SetStateAction<string>>,
    placeholder?: string,
    width: string,
    dark?: boolean
}

const TextInput = ({ value, onChange, placeholder, width, dark }: TextInputProps) => {
    return (
        <input
            type="text"
            value={value} onChange={(e) => onChange(e.target.value)}
            className={`${width} ${dark ? 'bg-orange-600 bg-opacity-20 hover:bg-orange-600 hover:bg-opacity-30 focus:bg-orange-600 focus:bg-opacity-30' : 'bg-orange-100 bg-opacity-20'} text-sm  transition duration-200 ease-in-out shadow-md px-4 py-1 rounded-md cursor-pointer hover:bg-orange-100 hover:bg-opacity-30 focus:outline-none focus:bg-orange-100 focus:bg-opacity-30 placeholder:text-black placeholder:text-opacity-40`}
            placeholder={placeholder} />
    )
}

export default TextInput