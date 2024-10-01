import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../BarComponent/Navbar';
import Footer from '../BarComponent/Footer';
import { useLocation } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Spinner from '../Spinner/Spinner';

export default function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [resetPasswordForm, setResetPassword] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResetPassword({ ...resetPasswordForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (resetPasswordForm.password !== resetPasswordForm.confirmPassword) {
            toast.error('Passwords do not match', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/reset-password`, {
                email: resetPasswordForm.email,
                password: resetPasswordForm.password
            });
            toast.success(response.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                transition: Bounce,
            });
            localStorage.removeItem('ForgetPasswordToken');
            navigate('/Auth/login'); // Redirect to login page
        } catch (error) {
            let errorMessage = 'An error occurred';

            if (error.response) {
                const { message } = error.response.data;
                switch (message) {
                    case 'Email and password are required':
                        errorMessage = 'Email and password are required';
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

    useEffect(() => {
        const ForgetPasswordToken = localStorage.getItem('ForgetPasswordToken');
        const email = location.state?.email;
        if (ForgetPasswordToken && email) {
            setResetPassword((prev) => ({
                ...prev,
                email: email
            }));
        } else {
            navigate('/Auth/forgotpassword');
        }
    }, [location.state, navigate]);

    const handlePasswordToggle = () => {
        setPasswordVisible(!passwordVisible);
    }

    const handleConfirmPasswordToggle = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    }

    return (
        <div className='bg-neutral-100 min-h-screen'>
            <Navbar />

            {
                !loading ?
                <div>
                <div className='text-center py-8 pt-20'>
                     <p className='font-bold text-lg'>Reset Password</p>
                     <p className='text-gray-500 py-2'>Enter your new password</p>
                 </div>
                 <form className="max-w-md mx-auto px-4 pb-4 shadow-md rounded-lg relative" onSubmit={handleSubmit}>
                     <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">Reset Password</h1>
     
                     <div className="relative mb-4">
                         <label htmlFor="password" className="block text-gray-700 font-medium mb-2">New Password</label>
                         <input
                             type={passwordVisible ? "text" : "password"}
                             id="password"
                             name="password"
                             value={resetPasswordForm.password}
                             onChange={handleChange}
                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                             placeholder="Enter new password"
                             required
                         />
                         <span
                             onClick={handlePasswordToggle}
                             className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 cursor-pointer"
                         >
                             {passwordVisible ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                         </span>
                     </div>
     
                     <div className="relative mb-4">
                         <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                         <input
                             type={confirmPasswordVisible ? "text" : "password"}
                             id="confirmPassword"
                             name="confirmPassword"
                             value={resetPasswordForm.confirmPassword}
                             onChange={handleChange}
                             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                             placeholder="Confirm new password"
                             required
                         />
                         <span
                             onClick={handleConfirmPasswordToggle}
                             className="absolute inset-y-0 right-0 flex items-center px-3 mt-6 cursor-pointer"
                         >
                             {confirmPasswordVisible ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                         </span>
                     </div>
     
                     <div className="flex justify-center items-center space-x-4">
                         <button
                             type="submit"
                             className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 transition duration-300 ease-in-out"
                             disabled={loading}
                         >
                             {loading ? 'Resetting...' : 'Reset Password'}
                         </button>
                     </div>
     
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
                 </form>
                </div>:<Spinner/>
            }
          
            <Footer />
        </div>
    );
}
