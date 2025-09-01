import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col justify-center items-center bg-slate-800 text-white'>
            <div className='text-2xl font-bold'>
                <span className='text-green-600'>&lt;</span>
                Secure
                <span className='text-green-600'>X/&gt;</span>
            </div>
            <div className='flex gap-1'> 
            Created with  <img width={20} src="icons/heart.png" alt="love" />  by Priyanshu

            </div>
        </div>
    )
}

export default Footer
