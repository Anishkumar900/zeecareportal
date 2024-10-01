import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import logo from '../Image/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    const navigate = useNavigate();

    const GoToHome = () => {
        navigate("/")
    }
    const mapUrl = "https://www.google.com/maps/place/Vidya+Vihar+School/@26.5182872,85.2984051,15z/data=!3m1!4b1!4m6!3m5!1s0x39ece72dd368c195:0xbe83b0ab1380b754!8m2!3d26.5182872!4d85.2984051!16s%2Fg%2F11b5lsjf8m";

    return (
        <div className='md:mx-8 mx-2'>
            <p className='border-b-2 border-slate-500 '></p>
            <div className=' lg:flex justify-between  items-center py-4'>
                {/* <p>ZeeCare</p> */}
                <button onClick={GoToHome}><img src={logo} alt='logo' className='w-44 h-24' /></button>
                <div className="flex flex-col ">
                    <ul className="flex flex-col ">
                        <li className="font-bold text-lg py-2">Quick Links</li>
                        <li>
                            <Link className='block hover:underline text-gray-500' to={"/"}>Home</Link>
                        </li>
                        <li>
                            <Link className='block hover:underline text-gray-500' to={'/appointment'}>Appointment</Link>
                        </li>
                        <li>
                            <Link className='block hover:underline text-gray-500' to={'/doctor'}>Available Doctor</Link>
                        </li>
                        <li>
                            <Link className='block hover:underline text-gray-500' to={'/about'}>About</Link>
                        </li>
                    </ul>
                </div>


                <ul className="">
                    <li className="text-lg font-bold py-2">Hours</li>
                    <li className="text-gray-500">Monday: 9:00 AM - 11:00 PM</li>
                    <li className="text-gray-500">Tuesday: 12:00 PM - 12:00 AM</li>
                    <li className="text-gray-500">Wednesday: 10:00 AM - 10:00 PM</li>
                    <li className="text-gray-500">Thursday: 9:00 AM - 9:00 PM</li>
                    <li className="text-gray-500">Friday: 1:00 AM - 10:00 PM</li>
                    <li className="text-gray-500">Saturday: 9:00 AM - 3:00 PM</li>
                </ul>


                <ul className="">
                    <li className="font-bold text-xl  py-4">Contact</li>
                    {/* <li className="flex items-center gap-2 text-gray-600">
                        <FaPhoneAlt className="text-blue-500" />
                        7903-461-477
                    </li> */}
                    <a
                        className="flex items-center gap-2 text-gray-600 hover:underline"
                        href="tel:7903461477"
                        aria-label="Call us at 7903461477"
                    >
                        <FaPhoneAlt className="text-blue-500" />
                        7903461477
                    </a>
                    {/* <li className="flex items-center gap-2 text-gray-600">
                        <MdOutlineEmail className="text-red-500" />
                        zeecare@gmail.com
                    </li> */}

                    <a
                        className="flex items-center gap-2 text-gray-600 hover:underline"
                        href="mailto:hit19ece.anishkumar@gmail.com"
                        aria-label="Email hit19ece.anishkumar@gmail.com"
                    >
                        <MdOutlineEmail className="text-red-500" />
                        hit19ece.anishkumar@gmail.com
                    </a>

                    {/* <li className="flex items-center gap-2 text-gray-600">
                        <FaWhatsapp className="text-green-500" />
                        7903461477
                    </li> */}

                    <a
                        className="flex items-center gap-2 text-gray-600 hover:underline"
                        href="whatsapp://send?phone=7903461477&text=How can I help you?"
                        title="Chat on WhatsApp"
                    >
                        <FaWhatsapp className="text-green-500" />
                        7903461477
                    </a>



                    {/* <li className="flex items-center gap-2 text-gray-600">
                        <FaLocationDot className="text-yellow-600" />
                        Sheohar, Bihar, PIN-843329
                    </li> */}


                    <a href={mapUrl} target="_blank" rel="noopener noreferrer" title="Open in Google Maps"
                        className="flex items-center gap-2 text-gray-600 hover:underline">
                        <FaLocationDot className="text-yellow-600" />
                        Sheohar, Bihar, PIN-843329
                    </a>

                </ul>
            </div>
        </div>
    )
}



