import React, { useState, useEffect } from 'react';
import Navbar from '../BarComponent/Navbar';
import Footer from '../BarComponent/Footer';
import ProfileDetail from './ProfileDetail';
import AppointmentDetails from './AppointmentDetails';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';




export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // Initially null instead of false
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [age, setAge] = useState(null);

    // const calculateAge = (dateOfBirthString) => {
    //     const today = new Date();
    //     const birthDate = new Date(dateOfBirthString);
    //     if (isNaN(birthDate.getTime())) {
    //         return null; // Or any other default value or message
    //     }
    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     const monthDifference = today.getMonth() - birthDate.getMonth();
    //     const dayDifference=today.getDate() - birthDate.getDate();

    //     // Check if the birthday has occurred this year
    //     if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }

    //     return age;
    // }


    const calculateAge = (dateOfBirthString) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirthString);

        if (isNaN(birthDate.getTime())) {
            return null; // Or any other default value or message
        }

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        // Adjust days if negative
        if (days < 0) {
            months--;
            // Calculate the number of days in the previous month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += lastMonth.getDate();
        }

        // Adjust months if negative
        if (months < 0) {
            years--;
            months += 12;
        }

        // Format the result based on non-zero values
        let result = '';

        if (years > 0) {
            if (years === 1) {
                result += `${years} year`
            }
            else {
                result += `${years} years`
            }
        }

        if (months > 0) {
            if (months === 1) {
                result += ` ${months} month`
            }
            else {
                result += ` ${months} months`
            }
        }

        if (days > 0) {
            if (days === 1) {
                result += ` ${days} day`
            }
            else {
                result += ` ${days} days`
            }
        }
        // Trim the result and handle the case where the result is empty
        result = result.trim();

        // If all parts are zero, return a meaningful message
        if (result === '') {
            return '0 day'; // Or another default message as needed
        }

        return result;
    };



    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string') return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const capitalizeWords = (sentence) => {
        return sentence.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/authenticate`, { token })
                .then((res) => {
                    const userData = res.data.user;
                    // console.log(userData);
                    setUser(userData);
                    setIsAuthenticated(true);
                    setAge(calculateAge(userData.dateOfBirth));
                })
                .catch((error) => {
                    navigate('/');
                });
        } else {
            navigate('/');
        }
    }, [navigate]);
    const fullName = user ? capitalizeWords(user.firstName + ' ' + user.lastName) : '';
    const gender = user ? capitalizeFirstLetter(user.gender) : '';

    // console.log(user);
    return (

        <div>{

            user ? <div>
                <Navbar isAuthenticated={isAuthenticated} />
                <div className='mt-20 md:grid md:grid-cols-3 lg:gap-4 lg:mx-6'>
                    <div className='md:col-span-1'>
                        <ProfileDetail
                            name={fullName}
                            email={user?.email}
                            phone={user?.phone}
                            gender={gender}
                            age={age}
                            imageFile={user.imageFile}
                        />
                    </div>
                    <div className='col-span-2 md:mx-4 lg:mx-0'>
                        <AppointmentDetails email={user?.email} />
                    </div>
                </div>
                <Footer />
            </div> :
                <Spinner />
        }
        </div>
    );
}
