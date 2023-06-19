import React from 'react'

type TextButtonProps = {
    text: string,
    onClick: () => void
}


const TextButton = ({ children, text, onClick }: React.PropsWithChildren<TextButtonProps>) => {
    return (
        <button onClick={(e) => onClick()} className='bg-orange-600 w-20 text-sm text-black text-opacity-50 hover:text-opacity-80 bg-opacity-20 hover:bg-opacity-30 px-2 py-1 shadow-sm rounded-md transition duration-200 ease-in-out'>
            {text}
        </button>
    )
}

export default TextButton