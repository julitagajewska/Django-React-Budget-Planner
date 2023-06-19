import React from 'react'

const OverlayContainer = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-25 backdrop-blur-md flex flex-col justify-center items-center text-black`}>
            {children}
        </div>
    )
}

export default OverlayContainer