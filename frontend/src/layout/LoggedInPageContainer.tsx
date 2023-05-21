import React, { PropsWithChildren } from 'react'
import Sidebar from '../components/Sidebar'
import LoggedInContentContainer from './LoggedInContentContainer'

const LoggedInPageContainer = ({ children }: PropsWithChildren) => {
    return (
        <div className='background-container w-full h-full flex flex-row justify-between'>
            <Sidebar />
            <LoggedInContentContainer>
                {children}
            </LoggedInContentContainer>
        </div>
    )
}

export default LoggedInPageContainer