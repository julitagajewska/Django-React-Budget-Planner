import React, { Dispatch, SetStateAction } from 'react'

type TextInputProps = {
    value: string,
    onChange: Dispatch<SetStateAction<string>>,
    placeholder?: string,
    width: string
}

const TextInput = ({ value, onChange, placeholder, width }: TextInputProps) => {
    return (
        <input
            type="text"
            value={value} onChange={(e) => onChange(e.target.value)}
            className={`${width} text-sm bg-orange-100 bg-opacity-20 transition duration-200 ease-in-out shadow-md px-4 py-1 rounded-md cursor-pointer hover:bg-orange-100 hover:bg-opacity-30 focus:outline-none focus:bg-orange-100 focus:bg-opacity-30 placeholder:text-black placeholder:text-opacity-40`}
            placeholder={placeholder} />
    )
}

export default TextInput