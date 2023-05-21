import React, { useState } from 'react'
type HoverableButtonSmallProps = {
    text: string,
    onClick: () => void,
}

const HoverableButtonSmall = ({ text, onClick }: HoverableButtonSmallProps) => {

    const [hoverActive, setHoverActive] = useState(false);

    return (
        <button
            className='relative overflow-hidden w-fit rounded-full  px-6 py-[0.1rem] text-base text-white font-thin'
            onMouseEnter={() => setHoverActive(true)}
            onMouseLeave={() => setHoverActive(false)}
            onClick={() => onClick()}>

            <div className={`button-hover-effect w-[6rem] h-[2.5rem] z-10 ${hoverActive ? 'active' : ''}`}></div>
            <p className='relative z-20'>{text}</p>
        </button>
    )
}

export default HoverableButtonSmall