import React from 'react'

const NavBar = () => {
    return (
        <nav className='flex justify-between items-center bg-indigo-900 text-white py-2'>
            <div className="logo flex items-center">
                <img src="logo.png" alt="logo" className='w-[60px] h-[60px] mx-3 invert'/>
                <span className="font-bold text-xl">TickIt</span>
            </div>
            <ul className='flex gap-8 mx-8'>
                <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
            </ul>
        </nav>
    )
}

export default NavBar