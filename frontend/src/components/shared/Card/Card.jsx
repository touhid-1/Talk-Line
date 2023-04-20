import React from 'react'

const Card = ({ title, icon, children }) => {
    return (
        <div className="flex justify-center items-center absolute top-0 w-screen h-screen overflow-hidden ">
            <div className="text-white bg-[#051F0B] md:max-w-xl w-[90%] mx-auto px-10 py-20 flex flex-col justify-center items-center rounded-xl space-y-5">
                <div className="flex justify-center items-center">
                    {icon && <img src="https://i.pinimg.com/originals/c2/61/eb/c261eb4f5b4d38cf4f320f9188430c41.png" className="w-10 h-10" alt="logo" />}
                    {title && <h1 className="text-xl font-bold">{title}</h1>}
                </div>
                {children}
            </div>
        </div>
    )
}

export default Card