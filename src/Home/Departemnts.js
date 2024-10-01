import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import derma from '../Image/DepartemntsImages/derma.jpg';
import ent from '../Image/DepartemntsImages/ent.jpg';
import neuro from '../Image/DepartemntsImages/neuro.jpg';
import onco from '../Image/DepartemntsImages/onco.jpg';
import ortho from '../Image/DepartemntsImages/ortho.jpg';
import pedia from '../Image/DepartemntsImages/pedia.jpg';
import radio from '../Image/DepartemntsImages/radio.jpg';
import therapy from '../Image/DepartemntsImages/therapy.jpg';
import cardio from '../Image/DepartemntsImages/cardio.jpg';

export default function Departemnts() {
    const departmentsArray = [
        { name: "Pediatrics", imageUrl: pedia },
        { name: "Orthopedics", imageUrl: ortho },
        { name: "Cardiology", imageUrl: cardio },
        { name: "Neurology", imageUrl: neuro },
        { name: "Oncology", imageUrl: onco },
        { name: "Radiology", imageUrl: radio },
        { name: "Physical Therapy", imageUrl: therapy },
        { name: "Dermatology", imageUrl: derma },
        { name: "ENT", imageUrl: ent },
    ];

    const responsive = {
        extraLarge: { breakpoint: { max: 3000, min: 1324 }, items: 4, slidesToSlide: 1 },
        large: { breakpoint: { max: 1324, min: 1005 }, items: 3, slidesToSlide: 1 },
        medium: { breakpoint: { max: 1005, min: 700 }, items: 2, slidesToSlide: 1 },
        small: { breakpoint: { max: 700, min: 0 }, items: 1, slidesToSlide: 1 },
    };

    return (
        <div className='pt-20 md:px-20 px-6'>
            <h1 className='font-bold text-4xl text-gray-500 font-serif w-full text-center md:text-left'>Medical Specialties</h1>
            <p className='text-center py-2 text-xl font-semibold from-neutral-600'>Departments</p>

            <Carousel
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                className='z-10'
            >
                {departmentsArray.map((depart, index) => (
                    <div key={index} className="card z-10">
                        <div className="depart-name relative top-52 rounded-md text-lg font-semibold bg-white w-44 text-center mx-auto">{depart.name}</div>
                        <img src={depart.imageUrl} className='w-full h-60' alt="Department" />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
