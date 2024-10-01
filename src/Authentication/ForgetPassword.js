import React, { useState } from 'react';
import Navbar from '../BarComponent/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../BarComponent/Footer';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner'; // Import Spinner component

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUsername(e.target.value.toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forgot-password`, { username });

            if (response.data.message === 'Password reset instructions sent to your email.') {
                localStorage.setItem('ForgetPasswordToken', response.data.ForgetPasswordToken);
                toast.success('Password reset instructions sent to your email.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
                navigate('/Auth/password/otp', { state: { email: response.data.user.email } });
                // setTimeout(() => {
                //     navigate('/Auth/password/otp', { state: { email: response.data.user.email } });
                // }, 3000);
            } else {
                toast.error('Unexpected response from the server.', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error) {
            let errorMessage = 'An error occurred';

            if (error.response) {
                const { message } = error.response.data;
                switch (message) {
                    case 'Email is required':
                        errorMessage = 'Email is required';
                        break;
                    case 'User not found':
                        errorMessage = 'User not found';
                        break;
                    case 'Server error':
                        errorMessage = 'Server error';
                        break;
                    default:
                        errorMessage = 'Unexpected error occurred';
                }
            }

            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-neutral-100 min-h-screen'>
            <Navbar />


            {
                !loading ? <div> 
                <div className='text-center py-8 pt-20'>
                    <p className='font-bold text-lg'>Forget Password</p>
                    <p className='text-gray-500 py-2'>Continue to reset your password</p>
                </div>
                <form className="max-w-md mx-auto px-4 pb-4 shadow-md rounded-lg" onSubmit={handleSubmit}>
                    <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">Forget Password</h1>
    
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none"
                        placeholder="Enter your username"
                        required
                    />
    
                    <div className='flex justify-between'>
                        <div className="mb-4 flex">
                            <Link to="/Auth/register" className="text-blue-500 hover:underline">Register Now</Link>
                        </div>
                        <div className="mb-4 flex">
                            <Link to="/Auth/login" className="text-blue-500 hover:underline">Login</Link>
                        </div>
                    </div>
                    <div className="mx-auto flex justify-center items-center">
                        <button type="submit" className="button" disabled={loading}>
                            Continue
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
                </div>:<Spinner/>
            }
            <Footer />
        </div>
    );
}
