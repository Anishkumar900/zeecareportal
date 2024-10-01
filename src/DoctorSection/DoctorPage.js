import React, { useState, useEffect } from 'react';
import Footer from '../BarComponent/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import Navbar from '../BarComponent/Navbar';
import Hero from '../Home/Hero';
import doc from '../Image/Doctor-to-Doctor-office.png'
// import hero from '../Image/hero.png';
import vector from '../Image/Vector.png';
import DoctorCart from './DoctorCart';

export default function DoctorPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([]);


    useEffect(() => {
        // console.log(`${process.env.REACT_APP_BASE_URL}`);
        const token = localStorage.getItem('token');
        if (token) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/authenticate`, { token })
                .then((res) => {
                    const userData = res.data.user;
                    setUser(userData);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    navigate('/doctor');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
            navigate('/doctor');
        }
    }, [navigate]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/alldoctor`)
            .then((response) => {
                setDoctors(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });

    })

    if (loading) {
        return <Spinner />;
    }
    return (
        <div className='bg-neutral-100'>
            <Navbar isAuthenticated={isAuthenticated} />
            <Hero title="Learn More About Doctor Details | Doctor Specialty" heroImage={doc} VectorImage={vector} />
            { doctors.length>0 ?
             <div>
                {
                    doctors.map((doctor, index) => {
                        return (
                            <DoctorCart key={index}
                                doctorName={doctor.doctorName}
                                specialty={doctor.specialty.value}
                                doctorExperiences={doctor.doctorExperiences}
                                doctorDegree={doctor.doctorDegree.value}
                                aboutDoctor={doctor.aboutDoctor}
                            />
                        );
                    })
                }
            </div> :
            <p className='text-xl my-2 font-semibold text-red-600 text-center'>No doctors found.</p>
        }
            <Footer />
        </div>
    )
}
