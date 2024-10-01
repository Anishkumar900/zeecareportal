import React, { useState } from 'react';
import axios from 'axios';
// import ReactToastify from '../React-toastify/ReactToastify';
import '../Authentication/Button.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './NumberInput.css';

export default function MessageFrom() {
    const [buttonStop, setButtonStop] = useState(false);


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setButtonStop(true);
    //     try {
    //         await axios.post(`${process.env.REACT_APP_BASE_URL}/querymessage`, formData)
    //             .then((res) => {
    //                 // console.log(res.data.success);
    //                 if (res.data.success === true)
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
    //                 else {
    //                     toast.error('Please Fill Full Form!', {
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
    //                 setFormData({
    //                     firstname: '',
    //                     lastname: '',
    //                     email: '',
    //                     phone: '',
    //                     message: ''
    //                 });
    //             })
    //     } catch (error) {
    //         // console.error(error.response.data.success);
    //         toast.error('Please Fill Full Form!', {
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
    //     } finally {
    //         setButtonStop(false);
    //     }

    // };






    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonStop(true);

        // Show the pending toast
        const promiseToast = toast.promise(
            axios.post(`${process.env.REACT_APP_BASE_URL}/querymessage`, formData),
            {
                pending: 'Sending your message...',
                success: {
                    render({ data }) {
                        if (data.data.success === true) {
                            setFormData({
                                firstname: '',
                                lastname: '',
                                email: '',
                                phone: '',
                                message: ''
                            });
                            return 'Message sent successfully!';
                        } else {
                            return 'Please fill the full form!';
                        }
                    },
                },
                error: {
                    render() {
                        return 'Please fill the full form!'; // Fallback error message
                    },
                },
            },
            {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }
        );

        try {
            await promiseToast; // Await the promise to handle success and error
        } catch (error) {
            // Handle any additional errors if needed
        } finally {
            setButtonStop(false); // Re-enable the button
        }
    };





    return (
        <div className="p-6">
            <p className='text-2xl font-bold text-center py-4'>Send Us A Message</p>
            <form onSubmit={handleSubmit} className="w-lg mx-auto">
                {/* Container for form fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* First Name Input */}
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="border rounded-md p-2 w-full focus:outline-none"
                    />

                    {/* Last Name Input */}
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="border rounded-md p-2 w-full focus:outline-none"
                    />

                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border rounded-md p-2 w-full focus:outline-none"
                    />

                    {/* Phone Number Input */}
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="border rounded-md p-2 w-full outline-none focus:outline-none"
                    />

                    {/* Message Textarea */}
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        className="border rounded-md p-2 w-full h-32 md:h-40 resize-none col-span-1 md:col-span-2 focus:outline-none"
                        rows="5"
                    />
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                        <button className="button" type="submit" disabled={buttonStop}>
                            <div className="text">Send</div>
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
                </div>
            </form>
        </div>
    )
}
