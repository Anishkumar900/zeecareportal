import React, { useEffect, useState } from 'react';
import doc from '../Image/doc6.jpg';
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";

export default function DoctorCart({ doctorName, specialty, doctorExperiences, doctorDegree, aboutDoctor }) {
    const [showLong, setShowLong] = useState(false);
    const [about, setAbout] = useState(aboutDoctor);
    const [seeless, setSeeLess] = useState('seemore')
    const [feedback, setFeedback] = useState(0);



    const extend = () => {
        if (seeless === 'seemore') {
            setSeeLess('seeless')
            setAbout(aboutDoctor);
        }
        else {
            setSeeLess('seemore')
            setAbout(aboutDoctor.slice(0, 250))

        }
    }

    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<IoMdStar key={i} size={24} className="text-yellow-500" />);
        }

        if (halfStar) {
            stars.push(<IoMdStarHalf key={fullStars} size={24} className="text-yellow-500" />);
        }

        while (stars.length < 5) {
            stars.push(<IoMdStarOutline key={stars.length} size={24} className="text-yellow-500" />);
        }

        return stars;
    };

    useEffect(() => {
        if (aboutDoctor.length >= 250) {
            setAbout(aboutDoctor.slice(0, 250))
            setShowLong(true);
        }
        const rating = ((Math.random() * 10).toFixed(4)) / 2;
        // ratingset(rating);
        setFeedback(rating);
    }, [aboutDoctor])
    return (
        <div className='bg-indigo-800 lg:mx-12 mx-2 p-1 my-3 shadow-lg border rounded-l-3xl'>
            <div className='ml-8 bg-white md:p-5 p-2 rounded-lg shadow-md'>
                <div className='md:flex justify-between'>
                    <div>
                        <p className='text-xl font-bold text-purple-800'>{doctorName}</p>
                    </div>
                    <div className='flex mt-2'>
                        {renderRating(feedback)}
                    </div>
                </div>

                <div className='md:flex mt-3'>
                    <div className=' h-20 min-w-20 w-20 rounded-full overflow-hidden border-2 border-cyan-700 ml-8 md:ml-0'>
                        <img src={doc} className='object-cover w-full h-full' alt='doctorimg' />
                    </div>
                    <div className='ml-4'>
                        <p className='text-lg font-medium text-cyan-700'>Specialty: <span className='font-serif text-sm text-black'>{specialty}</span></p>
                        <p className='font-medium text-lg text-cyan-700'>Experience: <span className='font-serif text-sm text-black'>{doctorExperiences}+ yrs.</span></p>
                        <p className='font-medium text-lg text-cyan-700'>Degree: <span className='font-serif text-sm text-black'>{doctorDegree}</span></p>
                        <p className='font-medium text-lg text-cyan-700 lg:block hidden'>About Doctor: <span className='font-serif text-sm text-black'>{about + ' '}</span>{showLong && <button onClick={extend} className='text-sm text-blue-600'>{seeless}</button>}</p>
                        <p className='font-medium text-lg text-cyan-700 lg:hidden block'>About Doctor: <span className='font-serif text-sm text-black'>{about + ' '}</span>{showLong && <button onClick={extend} className='text-sm text-blue-600'>{seeless}</button>}</p>
                    </div>
                </div>
            </div>
        </div>

    )
}
