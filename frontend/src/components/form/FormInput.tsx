import React, { ReactNode, PropsWithChildren, ChangeEvent } from 'react';

type FormInputProps = {
    placeholder: string,
    type: string,
    icon?: ReactNode,
    onChange: (value: string) => void
}

const FormInput = (props: PropsWithChildren<FormInputProps>) => {
    return (
        <div className='relative'>
            <div className='absolute text-sm pt-[0.55rem] pl-2'>
                {props.icon}
            </div>
            <input
                type={props.type}
                placeholder={props.placeholder}
                className='pl-8 rounded-md py-1'
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChange(e.target.value)} />
        </div>
    )
}

export default FormInput