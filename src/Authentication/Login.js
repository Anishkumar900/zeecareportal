import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../BarComponent/Navbar'
import './Button.css';
import Footer from '../BarComponent/Footer';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Login() {
    const [stopButton, setStopButton] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState({
        userName: '',
        password: '',
    })

    const [passwordVisible, setPasswordVisible] = useState(false);

    const handlePasswordToggle = () => {
        setPasswordVisible(!passwordVisible);

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedValue = name === 'userName' ? value.toLowerCase() : value;

        setLoginForm({
            ...loginForm,
            [name]: updatedValue
        });
    };


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setStopButton(true);
    //     setLoading(true);

    //     if (currentToastId) {
    //         toast.dismiss(currentToastId);
    //     }

    //     currentToastId = toast.promise('Processing your request...', {
    //         position: "top-center",
    //         autoClose: 3000, 
    //         hideProgressBar: false,
    //         closeOnClick: false,
    //         pauseOnHover: true,
    //         draggable: false,
    //         progress: undefined,
    //         theme: "light",
    //         transition: Bounce,
    //     });

    //     // Start the API call
    //     axios.post(`${process.env.REACT_APP_BASE_URL}/login`, loginForm)
    //         .then((response) => {
    //             if (response.data.message === "Login successful") {
    //                 localStorage.setItem('token', response.data.token);
    //                 setTimeout(() => {
    //                     toast.success('Login successful', {
    //                         position: "top-center",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: false,
    //                         draggable: true,
    //                         progress: undefined,
    //                         theme: "light",
    //                         transition: Bounce,
    //                     });
    //                     navigate('/');
    //                 }, 1000);
    //             } else {
    //                 toast.error('Error', {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: false,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                     transition: Bounce,
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             const message = error.response?.data?.message || 'Error';
    //             toast.error(message, {
    //                 position: "top-center",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: false,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //                 transition: Bounce,
    //             });
    //         })
    //     // .finally(() => {
    //     setLoading(false); // Stop loading
    //     setStopButton(false); // Allow button to be clickable again
    //     // });
    // };





    const handleSubmit = (e) => {
        e.preventDefault();
        setStopButton(true);
        // setLoading(true);

        // Show the pending toast and store its ID
        const promiseToastId = toast.promise(
            axios.post(`${process.env.REACT_APP_BASE_URL}/login`, loginForm),
            {
                pending: 'Processing your Login!',
                success: {
                    render({ data }) {
                        if (data.data.message === "Login successful") {
                            localStorage.setItem('token', data.data.token);
                            setTimeout(() => {
                                navigate('/');
                            }, 1000);
                        }
                        return 'Login successful';
                    },
                },
                error: {
                    render({ data }) {
                        return data.response?.data?.message || 'Something went wrong!';
                    },
                },
            },
            {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }
        );

        promiseToastId.then(() => {
            // This will run if the promise resolves
            // setLoading(false); // Stop loading
            setStopButton(false); // Allow button to be clickable again
        }).catch(() => {
            // This will run if the promise rejects
            // setLoading(false); // Stop loading
            setStopButton(false); // Allow button to be clickable again
        });
    };





    return (
        <div className=' bg-neutral-100 min-h-screen'>
            <Navbar />
            {
                !loading ? <div>
                    <div className=' text-center py-8 pt-20'>
                        <p className=' font-bold text-lg'>Sign In</p>
                        <p className=' text-gray-500 py-2'>Please Login To Continue</p>
                        <p className=' text-gray-500 py-1  lg:px-80 md:px-10 px-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo mollitia, hic ducimus magni odit dolorem!</p>
                    </div>
                    <form className="max-w-md mx-auto px-4 pb-4 shadow-md rounded-lg" onSubmit={handleSubmit}>
                        <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">Login</h1>

                        <label className="block text-gray-700 font-medium mb-2">Username</label>
                        <input
                            type="text"
                            name="userName"
                            value={loginForm.userName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none"
                            placeholder="Enter your username"
                            required
                        />

                        <div className="relative">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                onClick={handlePasswordToggle}
                                className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer mt-6"
                            >
                                {passwordVisible ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                            </span>
                        </div>

                        <div className=' flex justify-between'>
                            <div className="mb-4  flex">
                                <Link
                                    to="/Auth/register"
                                    className="text-blue-500 hover:underline"
                                >
                                    Register Now
                                </Link>
                            </div>
                            <div className="mb-4 flex  ">
                                <Link
                                    to="/Auth/forgotpassword"
                                    className="text-blue-500 hover:underline"
                                >
                                    Forget Password
                                </Link>
                            </div>
                        </div>
                        <div className="mx-auto flex justify-center items-center">
                            <button className="button" type="submit" disabled={stopButton}>
                                <div className="text">LogIn</div>
                            </button>
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
                        </div>
                    </form>
                </div> : <Spinner />
            }

            <Footer />

        </div>
    )
}







