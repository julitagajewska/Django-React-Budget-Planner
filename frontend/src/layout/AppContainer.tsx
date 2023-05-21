import React, { PropsWithChildren, ReactNode } from 'react';
import Background from '../components/Background';

type AppContainerProps = {
    isLoggedIn: boolean
}

const AppContainer = ({ children, isLoggedIn }: PropsWithChildren<AppContainerProps>) => {

    if (isLoggedIn) {
        return (
            <>
                <div className='absolute w-screen h-screen scroll-smooth flex flex-col p-0 m-o z-10 overflow-x-hidden'>
                    {children}

                </div>
                <Background />
            </>

        )
    }

    return (
        <div className='w-screen h-screen flex flex-col p-0 m-o bg-cyan-900'>
            {children}
        </div>
    )
}

export default AppContainer