import React, { ReactNode, PropsWithChildren, ChangeEvent } from 'react';

type FormInputProps = {
    placeholder: string,
    type: string,
    icon?: ReactNode,
    onChange: (value: string) => void
}

const FormInput = (props: PropsWithChildren<FormInputProps>) => {
    return (
        <div className='relative '>
            <div className='absolute text-sm pt-[0.55rem] pl-2 text-white text-opacity-75'>
                {props.icon}
            </div>
            <input
                type={props.type}
                placeholder={props.placeholder}
                className='pl-8 rounded-md py-1 bg-white bg-opacity-[15%] shadow-md text-white placeholder:text-white placeholder:text-opacity-75 placeholder:font-light focus:outline-none focus:bg-white focus:bg-opacity-10 hover:bg-opacity-20 cursor-pointer transition duration-200 ease-in-out placeholder:text-sm'
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)} />
        </div>
    )
}

export default FormInput