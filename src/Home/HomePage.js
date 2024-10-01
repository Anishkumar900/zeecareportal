import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import heroImage from '../Image/hero.png'; // Ensure the path is correct
import vectorImage from '../Image/Vector.png'; // Example vector image
import Biography from './Biography';
import about from '../Image/about.png';
import Departemnts from './Departemnts';
import MessageFrom from './MessageFrom';
import Navbar from '../BarComponent/Navbar';
import Footer from '../BarComponent/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  

  useEffect(() => {
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
          setUser(null);
          setIsAuthenticated(false);
          navigate('/');
        })
        .finally(() => {
          setLoading(false); // Set loading to false after authentication check
        });
    } else {
      setLoading(false); // Set loading to false if no token
    }
  }, [navigate]);

  // Display the spinner while loading
  if (loading) {
    return <Spinner />;
  }

  // Render the homepage content if authenticated
  return (
    <div className='bg-neutral-100'>
      <Navbar isAuthenticated={isAuthenticated} />
      <Hero
        title="Welcome to ZeeCare Medical Institute | Your Trusted Healthcare Provider"
        VectorImage={vectorImage}
        heroImage={heroImage}
      />
      <Biography aboutImage={about} />
      <Departemnts />
      <MessageFrom />
      <Footer />
    </div>
  );
}

export default HomePage;
