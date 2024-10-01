import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MobileNavbarOption.css';

export default function MobileNavOption(props) {
  const navigate = useNavigate();
  const [stopButton, setStopButton] = useState(false);

  const logout = () => {
    setStopButton(true);
    localStorage.removeItem('token');
    setTimeout(() => {
      setStopButton(false);
      navigate('/');
    }, 100);
  };

  return (
    <div className={`fixed top-16 left-0 w-full bg-white shadow-lg z-50 mobile-menu `}>
      <ul className={`flex flex-col items-center py-4 space-y-4 `}>
        <li><Link className='hover:underline text-lg' to="/">HOME</Link></li>
        <li>
          <Link className='hover:underline text-lg' to={props.isAuthenticated ? '/appointment' : '/Auth/login'}>
            APPOINTMENT
          </Link>
        </li>
        <li><Link className='hover:underline text-lg' to="/doctor">AVAILABLE DOCTOR</Link></li>
        <li><Link className='hover:underline text-lg' to="/about">ABOUT</Link></li>

        <li>
          <Link className='hover:underline text-lg' to={props.isAuthenticated ? '/Auth/profile' : '/Auth/login'}>
            {props.isAuthenticated ? 'PROFILE' : 'LOGIN'}
          </Link>
        </li>
        {props.isAuthenticated && (
          <li onClick={logout} disabled={stopButton}>
            <span className='hover:underline text-lg cursor-pointer'>LOGOUT</span>
          </li>
        )}
      </ul>
    </div>
  );
}
