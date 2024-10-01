import React, { useContext, useEffect, useState } from 'react';
// import { Context } from '../index';
import axios from 'axios';
import AppointmentOne from './AppointmentOne';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function AppointmentDetails(props) {
    // const isAppointment = useContext(Context);
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    // const [error, setError] = useState(null);
    // const [appointmenstLength, setAppointmentsLength] = useState(0);
    // const [loading, setLoading] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            if (props && props.email) {
                // console.log(props.email);
                try {
                    await axios.post(`${process.env.REACT_APP_BASE_URL}/allappointment`, {
                        email: props.email
                    })
                        .then((res) => {
                            // console.log(res.data.allAppointments);
                            const allAppointments = res.data.allAppointments;
                            const filteredAppointments = allAppointments.filter(appointments => appointments.deleted===false);

                            setAppointments(filteredAppointments);
                            // setAppointmentsLength(filteredAppointments.length);
                        })
                } catch (error) {
                    // navigate('/')
                    // console.error('Error fetching data:', error);
                    // setError('Failed to fetch appointments');
                }
            }
        };
        fetchData();
    }, [props]);

    const handleDelete = () => {
        // Remove the deleted appointment from the state
        setAppointments(appointments.filter(appointments => appointments.deleted === false));
        // setAppointmentsLength(appointments.length);
        // console.log("test");
    };

    return (
        <div>

            {appointments.length === 0 ? (
                <p className="text-red-500 text-center text-xl font-serif font-semibold">No appointments found</p>
            ) : (
                <ul>
                    <h1 className=' text-center text-xl font-serif font-semibold text-green-600 my-4 md:my-0'>Appointment Details</h1>
                    {appointments.map((appointment, index) => (
                        !appointments.deleted && (
                            <li key={appointment._id}> {/* Use _id as key for better stability */}
                                <AppointmentOne
                                appointmentNumbar={appointment.appointmentNumbar}
                                    status={appointment.status}
                                    index={index}
                                    _id={appointment._id}
                                    Gender={appointment.gender}
                                    Name={appointment.name}
                                    DoctorName={appointment.doctorName}
                                    Specialty={appointment.specialty}
                                    Information={appointment.information}
                                    AppointmentTime={appointment.appointmentTime}
                                    AppointmentDate={appointment.appointmentDate}
                                    onDelete={handleDelete} // Pass handleDelete callback
                                />
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    );
}

