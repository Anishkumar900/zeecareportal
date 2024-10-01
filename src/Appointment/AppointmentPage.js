import React, { useState, useEffect } from 'react';
import Navbar from '../BarComponent/Navbar';
import Footer from '../BarComponent/Footer';
import HeroAnother from '../Home/HeroAnother';
import AppointmentFrom from './AppointmentFrom';
import { useNavigate } from 'react-router-dom';
import signin from '../Image/signin.png';
import vector from '../Image/Vector.png';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';

export default function AppointmentPage() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/authenticate`, { token })
                .then((res) => {
                    setUser(res.data.user);

                    setIsAuthenticated(true);
                })
                .catch(() => {
                    // Clear token and redirect to login if authentication fails
                    localStorage.removeItem('token');
                    navigate('/Auth/login');
                })
                .finally(() => {
                    setLoading(false); // Set loading to false after the request
                });
        } else {
            navigate('/Auth/login');
            setLoading(false); // Set loading to false if no token
        }
    }, [navigate]);

    if (loading) {
        return <Spinner />;
    }
    // console.log(user.email,"test");

    return (
        <div className='bg-neutral-100'>
            <Navbar isAuthenticated={isAuthenticated} />
            <HeroAnother
                title='Schedule Your Appointment | ZeeCare Medical Institute'
                heroImage={signin}
                VectorImage={vector}
            />
            <AppointmentFrom email={user.email}/>
            <Footer />
        </div>
    );
}
