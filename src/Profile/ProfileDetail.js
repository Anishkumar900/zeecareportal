import React, { useEffect, useRef, useState } from 'react';
import { TbPhotoCirclePlus } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileDetail.css';
import '../Authentication/Button.css';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


export default function ProfileDetail(props) {
    const inputRef = useRef();
    const [showOptions, setShowOptions] = useState(false);
    const [imageFile, setImageFile] = useState('');

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const editProfile = () => {
        navigate('/Auth/edit-profile', { state: { email: props.email } });
    };

    const handleImageChange = (event) => {
        const image = event.target.files[0];

        if (image) {
            // Check if the file size is less than 1MB
            if (image.size > 1048576) {
                toast.error('File size is too large. Maximum allowed size is 1MB.', {
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
                return;
            }

            // Create a FormData object and append the image file
            const formData = new FormData();
            formData.append('image', image);
            formData.append('email', props.email);

            axios.post(`${process.env.REACT_APP_BASE_URL}/profilePhoto-update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    // console.log(response.data);
                    toast.success('Profile photo updated successfully', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        pauseOnFocusLoss: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    // console.log(response.data);
                })
                .catch((error) => {
                    // console.log(error);
                    toast.error('Error updating profile photo', {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        pauseOnFocusLoss: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    // console.error('Error updating profile photo:', error);
                });

            // Update the state with the image file and reset the input
            setImageFile(URL.createObjectURL(image));
            inputRef.current.value = '';
            setShowOptions(false);
        }
    };



    const handleImageClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        if (props.imageFile && props.imageFile !== '') {
            setImageFile(props.imageFile);
        }

    }, [props])




    const handleProfileRemove = () => {

        axios.post(`${process.env.REACT_APP_BASE_URL}/profilePhoto-remove`, {
            imageFile: null,
            email: props.email
        })
            .then((res) => {
                toast.success('Profile photo updated successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    pauseOnFocusLoss: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((err) => {
                toast.error('Error updating profile photo', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    pauseOnFocusLoss: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })




        setImageFile(null);
        setShowOptions(false);
        // Implement profile removal logic here
        // alert('Profile removed');
    };



    const handleProfileUpdate = () => {
        setShowOptions(!showOptions);
    }

    const fullDivProfileUpdate = () => {
        if (showOptions === true) {
            setShowOptions(false);
        }

    }


    return (
        <div className='border bg-slate-100 flex flex-col items-center justify-center p-6' onClick={handleProfileUpdate}>
            <h1 className='text-3xl font-semibold gradient-animated-text mb-4'>Profile Detail</h1>
            <button className='mb-4' >
                {(imageFile && imageFile !== '') ? (
                    <div className='relative border-2 rounded-full p-2 border-blue-600 inline-block'>
                        <img src={imageFile} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
                        <div className='absolute bottom-0 right-0 mb-1 mr-1'>
                            <TbPhotoCirclePlus size={24} className='text-blue-600 bg-white p-1 rounded-full border border-blue-600 cursor-pointer' onMouseEnter={handleProfileUpdate} />
                            {showOptions && (
                                <div className='absolute top-8 left-2 bg-white border border-blue-600 rounded shadow-lg p-2'>
                                    <button onClick={handleImageClick} className='flex items-center gap-2 p-2 hover:bg-gray-100'>
                                        <FaEdit size={18} className='text-blue-600' />
                                        <span>Photo Update</span>
                                    </button>
                                    <button onClick={handleProfileRemove} className='flex items-center gap-2 p-2 hover:bg-gray-100'>
                                        <MdDelete size={18} className='text-red-600' />
                                        <span>Photo Remove</span>
                                    </button>
                                </div>
                            )}
                            {/* <input type='file' ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} /> */}
                        </div>
                    </div>



                ) : (
                    <TbPhotoCirclePlus size={80} onClick={handleImageClick} />
                )}
                <input type='file' ref={inputRef} onChange={handleImageChange} style={{ display: "none" }} />
            </button>
            <p className='mb-1 text-lg font-medium'>{props.name}</p>
            <p className='mb-1'>
                {props.phone ? (
                    <span className='flex items-center'>
                        <span className='mr-2 text-gray-900 font-semibold'>Phone Number:</span>
                        <span className='text-gray-800'>{props.phone}</span>
                    </span>
                ) : (
                    <button className='flex gap-2 items-center group'>
                        <p className='text-red-600 opacity-80 text-sm'>Phone Number Not Updated</p>
                        <div className='my-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <FiEdit size={16} />
                        </div>
                    </button>
                )}
            </p>
            <p className='mb-1'>
                {props.age ? (
                    <span className='flex items-center'>
                        <span className='mr-2 text-gray-900 font-semibold'>Age:</span>
                        <span className='text-gray-800'>{props.age}</span>
                    </span>
                ) : (
                    <button className='flex gap-2 items-center group'>
                        <p className='text-red-600 opacity-80 text-sm'>Age Not Available</p>
                        <div className='my-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <FiEdit size={16} />
                        </div>
                    </button>
                )}
            </p>
            <p className='mb-1'>
                {props.gender ? (
                    <span className='flex items-center'>
                        <span className='mr-2 text-gray-900 font-semibold'>Gender:</span>
                        <span className='text-gray-800'>{props.gender}</span>
                    </span>
                ) : (
                    <button className='flex gap-2 items-center group'>
                        <p className='text-red-600 opacity-80 text-sm'>Gender Not Updated</p>
                        <div className='my-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <FiEdit size={16} />
                        </div>
                    </button>
                )}
            </p>
            <div className='flex justify-between gap-20 md:gap-10 lg:gap-24 pt-4'>
                <div className="mx-auto flex justify-center items-center">
                    <button className="button" onClick={editProfile}>
                        <div className="text">Edit Profile</div>
                    </button>
                </div>
                <div className="mx-auto flex justify-center items-center">
                    <button className="button" onClick={logout}>
                        <div className="text">Log out</div>
                    </button>
                </div>
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
        </div>
    );
}
