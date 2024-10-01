import React from 'react';
// import "./Hero.css"; // Import the custom CSS file
import "./Home.css"

export default function Hero(props) {
  return (
    <div className='hero-container grid lg:grid-cols-2 grid-cols-1 lg:gap-10 gap-40 md:mt-16 mt-12'>
      <div className='hero-text top-16 relative md:px-12 px-4'>
        <h1 className=' text-lg'>{props.title}</h1>
        <p className=' top-10 relative'>
          ZeeCare Medical Institute is a state-of-the-art facility dedicated to 
          providing comprehensive healthcare services with compassion and expertise. 
          Our team of skilled professionals is committed to delivering personalized 
          care tailored to each patient's needs. At ZeeCare, we prioritize your well-being, 
          ensuring a harmonious journey towards optimal health and wellness.
        </p>
      </div>
      <div className='hero-image-container relative overflow-hidden h-96'>
        <img src={props.VectorImage} alt='Vector' className='vector-image absolute lg:-right-36 lg:-top-36 ' />
        <div className=' flex justify-center items-center'>
        <img src={props.heroImage} alt="Hero" className='hero-image w-48' />
        </div>
      </div> 
    </div>
  );
}
