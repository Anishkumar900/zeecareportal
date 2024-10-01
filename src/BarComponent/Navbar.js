import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import MobileNavOption from './MobileNavOption';
import logo from '../Image/logo.png';
import { CgProfile } from 'react-icons/cg';

export default function Navbar({ isAuthenticated }) {
    const [navOption, setNavOption] = useState(false);
    const navigate = useNavigate();

    const toggleNavOption = () => {
        setNavOption(prev => !prev);
    };

    const goToLogin = () => {
        navigate('/Auth/login');
    };

    const goToHome = () => {
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/Auth/profile');
    };

    return (
        <div className='fixed top-0 left-0 w-full bg-white shadow-lg z-50'>
            <div className='flex justify-between py-4 md:px-16 px-10'>
                <button onClick={goToHome}>
                    <img src={logo} alt="ZeeCare Logo" className='w-28 h-10' />
                </button>
                <div className='hidden md:flex my-auto'>
                    <ul className='flex justify-between gap-7 font-semibold'>
                        <Link className='hover:underline' to="/">HOME</Link>
                        <Link className='hover:underline' to="/appointment">APPOINTMENT</Link>
                        <Link className='hover:underline' to="/doctor">AVAILABLE DOCTOR</Link>
                        <Link className='hover:underline' to="/about">ABOUT US</Link>
                    </ul>
                </div>
                <div className='my-auto'>
                    {isAuthenticated ? (
                        <button className='hidden md:block' onClick={goToProfile} aria-label="Go to Profile">
                            <CgProfile size={32} />
                        </button>
                    ) : (
                        <button
                            className='hidden md:block hover:bg-black text-white rounded-2xl bg-slate-700 px-4 font-semibold'
                            onClick={goToLogin}
                            aria-label="Login"
                        >
                            LOGIN
                        </button>
                    )}
                    {navOption ? (
                        <RxCross2 className='block md:hidden' size={24} onClick={toggleNavOption} aria-label="Close menu" />
                    ) : (
                        <FaBars className='block md:hidden' size={24} onClick={toggleNavOption} aria-label="Open menu" />
                    )}
                </div>
            </div>
            {navOption && <MobileNavOption isAuthenticated={isAuthenticated} navOption={navOption}/>}
        </div>
    );
}
