import React, { useState } from 'react'
import { text } from 'stream/consumers'

type HoverableButtonLargeProps = {
    text: string,
    onClick: () => void,
}

const HoverableButtonLarge = ({ text, onClick }: HoverableButtonLargeProps) => {

    const [hoverActive, setHoverActive] = useState(false);

    return (
        <button
            className='relative overflow-hidden w-fit rounded-full bg-black bg-opacity-10 px-20 py-2 text-lg text-white font-light'
            onMouseEnter={() => setHoverActive(true)}
            onMouseLeave={() => setHoverActive(false)}
            onClick={() => onClick()}>

            <div className={`button-hover-effect w-[13.1rem] h-[4rem] z-10 ${hoverActive ? 'active' : ''}`}></div>
            <p className='relative z-20'>{text}</p>
        </button>
    )
}

export default HoverableButtonLarge