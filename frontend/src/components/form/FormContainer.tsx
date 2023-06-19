import React, { ReactNode, PropsWithChildren } from 'react'

type FormContainerProps = {
    children: ReactNode
}

const FormContainer = (props: PropsWithChildren<FormContainerProps>) => {
    return (
        <div className='form-container w-fit h-fit flex flex-col items-center gap-6 px-8 py-8 bg-opacity-25 rounded-2xl shadow-xl'>
            {props.children}
        </div>
    )
}

export default FormContainer