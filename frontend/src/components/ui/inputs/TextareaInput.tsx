import React, { Dispatch, SetStateAction } from 'react';

type TextareaInputProps = {
    value: string,
    onChange: Dispatch<SetStateAction<string>>
}

const TextareaInput = ({ value, onChange }: TextareaInputProps) => {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='textarea-input' />
    )
}

export default TextareaInput