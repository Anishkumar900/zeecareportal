import React, { useState, useEffect } from 'react';
import Hero from '../Home/Hero';
import hero from '../Image/hero.png';
import vector from '../Image/Vector.png';
import Navbar from '../BarComponent/Navbar';
import Biography from '../Home/Biography';
import whoweare from '../Image/whoweare.png';
import Footer from '../BarComponent/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function AboutUsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  
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
          // Clear user and token if authentication fails
          localStorage.removeItem('token');
          navigate('/about'); // Redirect to the About page if not authenticated
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // No token found, redirect to About page
      setLoading(false); // Make sure to set loading to false even if no token is present
      navigate('/about');
    }
  }, [navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='bg-neutral-100'>
      <Navbar isAuthenticated={isAuthenticated} />
      <Hero title="Learn More About Us | ZeeCare Medical Institute" heroImage={hero} VectorImage={vector} />
      <Biography aboutImage={whoweare} />
      <Footer />
    </div>
  );
}

