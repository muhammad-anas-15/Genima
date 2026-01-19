import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';


const Navbar = () => {
    const { user, setShowLogin, logout, credit } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-between w-full py-5 px-6 sm:px-12'>
            
            {/* Logo */}
            <Link to={'/'}>
                <img className='w-32 sm:w-44' src={assets.logo} alt="Logo" />
            </Link>

            <div>
                {user ? (
                    <div className='flex items-center gap-4'>
                        {/* Credits - Clean Dark Pill */}
                        <button onClick={() => navigate('/buy')} className='flex items-center gap-2 bg-blue-100/10 border border-white/20 px-4 py-2 rounded-full hover:bg-white/10 transition-all'>
                            <img className='w-5' src={assets.credit_star} alt="" />
                            <p className='text-sm font-medium text-white'>Credits: {credit}</p>
                        </button>

                        <p className='text-gray-300 max-sm:hidden pl-2 font-medium'>Hi, {user.name}</p>

                        <div className='relative group'>
                            <img className='w-10 h-10 rounded-full object-cover cursor-pointer border border-white/20' src={assets.profile_icon} alt="" />
                            
                            {/* Simple Dropdown */}
                            <div className='absolute hidden group-hover:block top-10 right-0 z-10 pt-4'>
                                <ul className='list-none m-0 p-2 bg-zinc-900 border border-zinc-700 rounded-md text-sm text-white w-32 shadow-lg'>
                                    <li onClick={logout} className='py-2 px-4 cursor-pointer hover:bg-zinc-800 rounded'>Logout</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex items-center gap-8'>
                        {/* Pricing Link - Simple Text */}
                        <p onClick={() => navigate('/buy')} className='cursor-pointer text-gray-300 hover:text-white transition-colors font-normal'>
                            Pricing
                        </p>
                        
                        {/* Login Button - Solid White (Like Imagify screenshot) */}
                        <button onClick={() => setShowLogin(true)} className='bg-white text-black px-8 py-2.5 rounded-full text-base font-medium hover:scale-105 transition-transform duration-300'>
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar;