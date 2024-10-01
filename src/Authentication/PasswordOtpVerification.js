import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../BarComponent/Navbar';
import Footer from '../BarComponent/Footer';
import Spinner from '../Spinner/Spinner'; // Import Spinner component

export default function PasswordOtpVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const [otpPasswordFrom, setOtpPasswordFrom] = useState({
        otp: '',
        email: '',
        ForgetPasswordToken: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOtpPasswordFrom((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Ensure loading state is set

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/verify-otp`, otpPasswordFrom);
            // console.log(response);
            if (response.data.message === 'OTP verified successfully') {
                toast.success('OTP verified successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
                navigate('/Auth/reset-password', { state: { email: otpPasswordFrom.email, otp: otpPasswordFrom.otp } });
                // setTimeout(() => {
                //     navigate('/Auth/reset-password', { state: { email: otpPasswordFrom.email, otp: otpPasswordFrom.otp } });
                // }, 2500);
                // Navigate to password reset page
            } else {
                toast.error('Invalid OTP or expired OTP', {
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
                    case 'Invalid OTP':
                        errorMessage = 'Invalid OTP';
                        break;
                    case 'OTP expired':
                        errorMessage = 'OTP expired';
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
            setLoading(false); // Ensure loading state is reset
        }
    };

    useEffect(() => {
        const ForgetPasswordToken = localStorage.getItem('ForgetPasswordToken');
        const email = location.state?.email;

        if (ForgetPasswordToken && email) {
            setOtpPasswordFrom((prev) => ({
                ...prev,
                email: email,
                ForgetPasswordToken: ForgetPasswordToken
            }));
        } else {
            navigate('/Auth/forgotpassword');
        }
    }, [location.state, navigate]);

    return (
        <div className='bg-neutral-100 min-h-screen'>
            <Navbar />
            {
                !loading?
                <div>
                <div className='text-center py-8 pt-20'>
                    <p className='font-bold text-lg'>Verify OTP</p>
                    <p className='text-gray-500 py-2'>Enter the OTP sent to your email</p>
                </div>
                <form className="max-w-md mx-auto px-4 pb-4 shadow-md rounded-lg" onSubmit={handleSubmit}>
                    <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">OTP Verification</h1>

                    <label className="block text-gray-700 font-medium mb-2">OTP</label>
                    <input
                        type="text"
                        name="otp"
                        value={otpPasswordFrom.otp}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none"
                        placeholder="Enter your OTP"
                        required
                    />

                    <div className="mx-auto flex justify-center items-center">
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 transition duration-300 ease-in-out" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </div>
                </form>
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
            </div>:<Spinner/>
            }
            
            <Footer />
        </div>
    );
}
