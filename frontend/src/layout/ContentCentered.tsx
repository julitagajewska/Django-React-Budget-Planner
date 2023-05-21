import React, { ReactNode, PropsWithChildren } from 'react'

type ContentCenteredProps = {
    children: ReactNode
}

const ContentCentered = (props: PropsWithChildren<ContentCenteredProps>) => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center px-[10%]'>
            {props.children}
        </div>
    )
}

export default ContentCentered