import React from 'react'

const Input = () => {
  return (
    <div className=' flex w-full justify-center items-center'>
    <input type='text' placeholder='Enter City Name...'  className='px-3 py-2 mt-2 bg-[#EEE] shadow-md rounded-sm w-[85%] outline-none border-none '/>
    <button className='w-[10%] ml-2 bg-[#EEE] shadow-lg h-9 mt-2 font-semibold rounded-sm '>Search</button>
    </div>
  )
}

export default Input
