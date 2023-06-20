import React, { PropsWithChildren } from 'react'

const LoggedInContentContainer = ({ children }: PropsWithChildren) => {
    return (
        <div className='w-full h-screen px-8 py-6 flex flex-col gap-6'>
            {children}
        </div>
    )
}

export default LoggedInContentContainer