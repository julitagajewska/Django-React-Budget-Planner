import React from 'react';

type ButtonWithChildrenProps = {
    onClick: () => void
}

const ButtonWithChildren = ({ children, onClick }: React.PropsWithChildren<ButtonWithChildrenProps>) => {
    return (
        <button className='bg-orange-600 h-7 text-sm text-black text-opacity-50 hover:text-opacity-80 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out' onClick={() => onClick()}>
            {children}
        </button>
    )
}

export default ButtonWithChildren