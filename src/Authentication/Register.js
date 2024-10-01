import React, { useState } from 'react';
import Navbar from '../BarComponent/Navbar';
import { Link } from 'react-router-dom';
import './Button.css';
import Footer from '../BarComponent/Footer';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Register() {
    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: '',
        dateOfBirth: '',
        password: '',
        confirmPassword: '',
        imageFile :null,
    });
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handlePasswordToggle = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert the email to lowercase if the field name is 'email'
        const updatedValue = name === 'email' ? value.toLowerCase() : value;

        setRegisterForm({
            ...registerForm,
            [name]: updatedValue
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        // setRegisterForm(pre => ({
        //     ...pre,
        //     email: registerForm.email.toLowerCase()
        // }))
        const nowDate = new Date(); // Current date and time
        const date = new Date(nowDate.toISOString().slice(0, 10)); // Convert to date without time
        const dob = new Date(registerForm.dateOfBirth);
        const isFutureDate = dob < date;
        // console.log(registerForm.email.toLowerCase());
        // console.log(registerForm);
        if (registerForm.password === registerForm.confirmPassword && isFutureDate) {
            setLoading(true); // Start loading spinner
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/registetion`, registerForm);
                if (response.data.success) {
                    toast.success('Registration successful! Redirecting...', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    // navigate('/Auth/login');
                    setTimeout(() => {
                        navigate('/Auth/login');
                    }, 1500);
                } else {
                    toast.error('Registration failed', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } catch (err) {
                // console.log(err);
                if (err.response.data.message === "Please enter a valid phone number") {
                    toast.error('Please enter a valid phone number', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else if (err.response.data.message === "Please enter a valid email") {
                    toast.error('Please enter a valid email', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else if (err.response.data.message === "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, one special character, and no spaces") {
                    toast.error('Please enter a strong password,at least 6 characters', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
                else if (err.response.data.message === "Email already registered. Please use a different email address.") {
                    toast.error('Email already registered', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
                else {
                    toast.error('Enter valid input', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                }
            } finally {
                setLoading(false); // Stop loading spinner
            }
        } else {
            // console.log(isFutureDate)
            if (!isFutureDate) {
                toast.error('Please enter a valid date of birth', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            else {
                toast.error('Passwords do not match', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
            setLoading(false);
        }

    };




    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (registerForm.password === registerForm.confirmPassword) {
    //         setLoading(true);
    //         await axios.post("http://localhost:4000/api/v1/registetion", registerForm)
    //             .then((response) => {
    //                 // console.log(response.data.success);
    //                 if (response.data.success === true) {
    //                     toast.success('Message Send Successfully!', {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                         transition: Bounce,
    //                     });
    //                     // setTimeout(() => {
    //                     //     navigate('/Auth/login');
    //                     // }, 3000); 
    //                 }
    //                 else {
    //                     toast.error('Registration failed', {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                         transition: Bounce,
    //                     });
    //                 }

    //             })
    //             .catch((err) => {
    //                 // console.log(err.response.data.message);
    //                 if (err.response.data.message === "Please enter a valid phone number") {
    //                     toast.error('Please enter a valid phone number', {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                         transition: Bounce,
    //                     });
    //                 }
    //                 else if (err.response.data.message === "Please enter a valid email") {
    //                     toast.error('Please enter a valid email', {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                         transition: Bounce,
    //                     });
    //                 }
    //                 else if (err.response.data.message === "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one digit, one special character, and no spaces") {
    //                     toast.error('Please enter a valid password', {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                         transition: Bounce,
    //                     });
    //                 }
    //                 else {
    //                     toast.error('Enter valid input', {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: true,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                         transition: Bounce,
    //                     });
    //                 }
    //             })
    //         // console.log(registerForm);   
    //     }
    //     else {
    //         toast.error('Passwords do not match', {
    //             position: "top-center",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: Bounce,
    //         });
    //     }
    // };

    return (

        <div className='bg-neutral-100 min-h-screen'>
            <Navbar />
            <div className='text-center pb-4'>
                <p className='pt-20 text-xl font-bold'>Sign Up</p>
                <p className='text-gray-600 py-2'>Please Sign Up To Continue</p>
                <p className='text-gray-600'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis enim optio veritatis, odio, quod magni.</p>
            </div>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <Spinner />
                </div>
            ) : (
                <form className="max-w-lg mx-auto p-8 shadow-md rounded-lg space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="relative">
                            <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={registerForm.firstName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={registerForm.lastName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={registerForm.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={registerForm.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="gender" className="block text-gray-700">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={registerForm.gender}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="relative">
                        <label htmlFor="dateOfBirth" className="block text-gray-700">Date Of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={registerForm.dateOfBirth}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            value={registerForm.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            required
                        />
                        <span
                            onClick={handlePasswordToggle}
                            className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer mt-6"
                        >
                            {passwordVisible ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                        </span>
                    </div>

                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={registerForm.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                            required
                        />
                        <span
                            onClick={handleConfirmPasswordToggle}
                            className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer mt-6"
                        >
                            {confirmPasswordVisible ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                        </span>
                    </div>

                    <div className='flex justify-between'>
                        <Link to="/Auth/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                        <Link to="/Auth/forgotpassword" className="text-blue-500 hover:underline">
                            Forgot Password
                        </Link>
                    </div>
                    <div className="mx-auto flex justify-center items-center">
                        <button type="submit" className="button">
                            <div className="text">Sign Up</div>
                        </button>
                    </div>
                </form>
            )}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Footer />
        </div>
    );
}
