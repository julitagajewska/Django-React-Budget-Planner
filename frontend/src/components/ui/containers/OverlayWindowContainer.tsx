import React from 'react'

const OverlayWindowContainer = ({ children }: React.PropsWithChildren) => {
    return (
        <div className={`overlay-container bg-opacity-50 w-[30rem] h-fit px-9 py-6 rounded-lg shadow-lg transition duration-200 ease-in-out flex flex-col gap-4`}>
            {children}
        </div>
    )
}

export default OverlayWindowContainer