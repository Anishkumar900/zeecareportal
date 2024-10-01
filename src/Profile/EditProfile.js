import React, { useEffect, useState } from 'react';
import Navbar from '../BarComponent/Navbar';
import Footer from '../BarComponent/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Authentication/Button.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Spinner/Spinner';


export default function EditProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [user, setUser] = useState({});
    const [formData, setFormData] = useState({
        dateOfBirth: '',
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            if (location.state && location.state.email) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/edit-profile`, { email: location.state.email })
                    .then(response => {
                        const userData = response.data.user || {};
                        // setUser(userData);
                        setFormData({
                            dateOfBirth: userData.dateOfBirth ? formatDate(userData.dateOfBirth) : '',
                            firstName: userData.firstName || '',
                            lastName: userData.lastName || '',
                            gender: userData.gender || '',
                            phone: userData.phone || '',
                        });
                        setLoading(false);
                    })
                    .catch(error => {
                        navigate('/');
                        // console.error('Error fetching user data:', error);
                    });
            } else {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }, [navigate, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Form Data:', formData);
        const nowDate = new Date();
        nowDate.setHours(0, 0, 0, 0);
        const userData = { ...formData, email: location.state.email };
        if (nowDate < new Date(formData.dateOfBirth)) {
            alert('Invalid date of birth');
            return;
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/editUpdated-profile`, userData)
            .then(response => {
                if (response.data.success) {
                    toast.success('Update successful! Redirecting...', {
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
                    setTimeout(() => {
                        navigate('/Auth/profile');
                    },0);
                }
                else {
                    toast.error('Update failed!', {
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
            })
            .catch(error => {
                // console.error('Error updating user data:', error);
                toast.error('Something went wrong', {
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
            });

    }


    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className='bg-slate-50'>
            <Navbar isAuthenticated={isAuthenticated} />
            {
                !loading ?
                    <div className='pt-20 '>
                        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-6 text-center text-red-600 hover:underline shadow-lg">Edit Profile</h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                                            placeholder="First Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input
                                            id="dateOfBirth"
                                            name="dateOfBirth"
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                                            placeholder="123-456-7890"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-1 sm:col-span-2">
                                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none"
                                            required
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mx-auto flex justify-center items-center">
                                    <button className="button" type="submit">
                                        <div className="text">Save</div>
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
                        </div>
                    </div> : <Spinner />
            }
            <Footer />
        </div>
    );
}
