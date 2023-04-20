import React from 'react'

const TextInput = (props) => {
  return (
    <div>
        <input type="text" {...props} className="bg-[#031404] px-4 py-1 rounded-md outline-0 text-white text-md w-full" />
    </div>
  )
}

export default TextInput