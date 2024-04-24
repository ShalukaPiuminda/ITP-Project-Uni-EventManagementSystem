import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import logo1 from '../Images/logo1.png';
import logo2 from '../Images/LFN-logo3.png';

const Slideshow = ({ images }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="w-1/2 h-screen float-left">
            <img src={images[index]} alt={`Slide ${index}`} className="w-full h-full object-cover" />
        </div>
    );
};

const Heropage = () => {
    const images = [logo1, logo2];

    return (
        <>
            <Header />
            <Navbar />

            <div className="flex">
                <Slideshow images={images} />
                <div className="w-1/2 bg-gray-200">
                    <div className="p-8">
                        <h1 className="text-3xl font-bold mb-4">Welcome to Our Event Planner</h1>
                        <p className="text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula eros sit amet lorem posuere, sit amet consequat libero fermentum. Donec venenatis tortor et leo feugiat luctus.
                        </p>
                        {/* Add more text or components as needed */}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Heropage;
