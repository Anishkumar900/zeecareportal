import React, { useEffect, useState } from 'react';
import '../Authentication/Button.css'; // Ensure you have appropriate styles for .button and .text
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

export default function AppointmentForm(props) {
    const [doctors, setDoctors] = useState([]);
    const [appointmentFormDatat, setAppointmentFormDatat] = useState({
        email: '',
        name: '',
        phone: '',
        appointmentTime: '',
        dateOfBirth: '',
        gender: '',
        appointmentDate: '',
        specialty: '',
        doctorName: '',
        information: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentFormDatat({ ...appointmentFormDatat, [name]: value });
    };

    const handleChangeDoctor = (selectedOption) => {
        setAppointmentFormDatat({
            ...appointmentFormDatat,
            doctorName: selectedOption ? selectedOption.label : '',
            specialty: selectedOption ? selectedOption.specialty : ''
        });

    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const nowDate = new Date();
    //     nowDate.setHours(0, 0, 0, 0);
    //     if (nowDate >= new Date(appointmentFormDatat.dateOfBirth) && nowDate < new Date(appointmentFormDatat.appointmentDate)) {
    //         await axios.post(`${process.env.REACT_APP_BASE_URL}/appointment`, appointmentFormDatat)
    //             .then(response => {
    //                 // console.log(response.data);
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
    //                     // console.log(response.data);
    //                 }
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
    //                 setAppointmentFormDatat({
    //                     email: '',
    //                     name: '',
    //                     phone: '',
    //                     appointmentTime: '',
    //                     dateOfBirth: '',
    //                     gender: '',
    //                     appointmentDate: '',
    //                     specialty: '',
    //                     doctorName: '',
    //                     information: ''
    //                 })

    //             })
    //             .catch(error => {
    //                 console.error(error);
    //                 toast.error(' Please Fill Full Correct Form!', {
    //                     position: "top-center",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                     transition: Bounce,
    //                 });

    //             });
    //     }
    //     else {
    //         // console.log(appointmentFormDatat.appointmentDate);
    //         if (nowDate >= new Date(appointmentFormDatat.appointmentDate)) {
    //             // console.log('Appointment Date is not valid!');

    //             toast.error('Appointment Date is not valid!', {
    //                 position: "top-center",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //                 transition: Bounce,
    //             });
    //             return;
    //         }
    //         toast.error('Date of birth is not valid!', {
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
    //         // console.log("Enter a real Date of birth!")
    //     }

    //     // console.log(appointmentFormDatat);

    // };





    const handleSubmit = async (e) => {
        e.preventDefault();
        const nowDate = new Date();
        nowDate.setHours(0, 0, 0, 0);

        // Check if the date is valid
        if (nowDate >= new Date(appointmentFormDatat.dateOfBirth) && nowDate < new Date(appointmentFormDatat.appointmentDate)) {
            // Use toast.promise to handle the API call and notifications
            const promiseToast = toast.promise(
                axios.post(`${process.env.REACT_APP_BASE_URL}/appointment`, appointmentFormDatat),
                {
                    pending: 'Sending your appointment request...',
                    success: {
                        render({ data }) {
                            if (data.data.success === true) {
                                // Reset the form data
                                setAppointmentFormDatat({
                                    email: '',
                                    name: '',
                                    phone: '',
                                    appointmentTime: '',
                                    dateOfBirth: '',
                                    gender: '',
                                    appointmentDate: '',
                                    specialty: '',
                                    doctorName: '',
                                    information: ''
                                });
                                return 'Message sent successfully!';
                            } else {
                                return 'Please fill the full form!';
                            }
                        },
                    },
                    error: {
                        render() {
                            return 'Please fill the full correct form!';
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
                await promiseToast; // Await the promise to ensure loading state is handled
            } catch (error) {
                // Additional error handling if needed
            }
        } else {
            // Handle invalid dates
            if (nowDate >= new Date(appointmentFormDatat.appointmentDate)) {
                toast.error('Appointment Date is not valid!', {
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
            toast.error('Date of birth is not valid!', {
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
    };


    useEffect(() => {
        setAppointmentFormDatat((prev) => ({
            ...prev,
            email: props.email
        }));
    }, [props.email]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/alldoctor`)
            .then((response) => {

                const formattedDoctors = response.data.map(doctor => ({
                    value: doctor._id,
                    label: doctor.doctorName, // Ensure this is 'label'
                    specialty: doctor.specialty.value
                }));
                setDoctors(formattedDoctors);
                // console.log(response.data);
            })
            .catch((error) => {
                // console.error(error);
            });

    })


    // console.log(doctors);

    return (
        <div>
            <p className='font-serif text-2xl font-bold text-slate-700 text-center'>Appointment</p>
            <div className='flex items-center justify-center max-w-screen-lg mx-auto'>
                <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl w-full">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    placeholder="Name"
                                    type="text"
                                    value={appointmentFormDatat.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    placeholder="Phone"
                                    type="number"
                                    value={appointmentFormDatat.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Select Appointment Time Duration</label>
                                <select
                                    id="appointmentTime"
                                    name="appointmentTime"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    value={appointmentFormDatat.appointmentTime}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Time Duration</option>
                                    <option value="8:00AM-4:00PM">8:00AM-4:00PM</option>
                                    <option value="4:00PM-12:00AM">4:00PM-12:00AM</option>
                                    <option value="12:00PM-8:00AM">12:00PM-8:00AM</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    type="date"
                                    value={appointmentFormDatat.dateOfBirth}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Select Gender</label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    value={appointmentFormDatat.gender}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date</label>
                                <input
                                    id="appointmentDate"
                                    name="appointmentDate"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    type="date"
                                    value={appointmentFormDatat.appointmentDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">Select Doctor</label>
                                <Select
                                    id='doctorName'
                                    name='doctorName'
                                    className="mt-1 focus:outline-none"
                                    value={doctors.find(doc => doc.label === appointmentFormDatat.doctorName) || null}
                                    onChange={handleChangeDoctor}
                                    options={doctors}
                                    placeholder="Select Doctor"
                                />

                            </div>
                            <div>
                                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                                {/* <select
                                    id="specialty"
                                    name="specialty"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    value={appointmentFormDatat.specialty}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Specialty</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Oncology">Oncology</option>
                                    <option value="Radiology">Radiology</option>
                                    <option value="Physical Therapy">Physical Therapy</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="ENT">ENT</option>
                                </select> */}

                                <input
                                    id="specialty"
                                    name="specialty"
                                    className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                    value={appointmentFormDatat.specialty}
                                    disabled
                                    required
                                >

                                </input>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="information" className="block text-sm font-medium text-gray-700">Detailed Illness Information</label>
                            <textarea
                                id="information"
                                name="information"
                                className="p-2 border rounded-md w-full mt-1 focus:outline-none"
                                placeholder="Detailed Illness Information"
                                rows="5"
                                value={appointmentFormDatat.information}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mx-auto flex justify-center items-center">
                            <button className="button" type="submit">
                                <div className="text">Submit</div>
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
            </div>
        </div>
    );
}
