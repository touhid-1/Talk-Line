import React from 'react'

const Button = ({btnText, onClick}) => {
    return (
        <button onClick={onClick} className="bg-gradient-to-t from-[#43E32F] to-[#1FE1BA] bg-[length:100%_100%] hover:bg-[length:100%_125%] px-3 py-1 rounded-full">
            <span className="text-[] text-sm font-semibold tracking-wider">{btnText}</span>
            {/* <img src="" alt="" />  text-[#031404] */}
        </button>
    )
}

export default Button