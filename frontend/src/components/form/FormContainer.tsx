import React, { ReactNode, PropsWithChildren } from 'react'

type FormContainerProps = {
    children: ReactNode
}

const FormContainer = (props: PropsWithChildren<FormContainerProps>) => {
    return (
        <div className='w-fit h-fit flex flex-col items-center gap-6 px-6 py-8 bg-slate-300'>
            {props.children}
        </div>
    )
}

export default FormContainer