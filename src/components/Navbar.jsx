import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white p-2 flex justify-between items-center '>
            <div className=' my-container flex justify-between'>
                <div className='text-2xl font-bold'>
                    <span className='text-green-600'>&lt;</span>
                    Pass
                    <span className='text-green-600'>OP/&gt;</span>
                </div>
                <button className='bg-green-700 rounded-full'>
                    <a target='_blank' href="https://github.com/Ronny53">
                        <img className='invert' width={90} src="icons/github-text.png" alt="github logo" /></a>
                </button>
            </div>
        </nav>
    )
}

export default Navbar
