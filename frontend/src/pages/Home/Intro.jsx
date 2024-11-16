import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import About from './About';  // Ensure you import the About component here

function Intro() {
    const { loading, portfolioData } = useSelector((state) => state.root);
    const { intro } = portfolioData;
    const { greetText, introText, name, description } = intro;

    // Create a ref for the About section
    const aboutRef = useRef(null);

    // Function to scroll to the About section
    const scrollToAbout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            {/* Intro Section */}
            <div className='h-[60vh] bg-primary flex flex-col items-start justify-center gap-5 py-14'>
                <h1 className='text-tertiary text-1xl sm:text-1xl mt-16'>Web Developer</h1>
                <h1 className='text-secondary text-2xl sm:text-3xl font-bold'>{greetText || " "}</h1>
                <h1 className='text-secondary text-2xl sm:text-3xl font-bold'>{introText || ''}</h1>
                <h1 className='text-secondary text-2xl sm:text-3xl font-bold'>{name || ""}</h1>
                <p className="text-secondary w-2/3">{description || " "}</p>
                <button
                    onClick={scrollToAbout}  
                    className='border-2 text-white bg-tertiary font-semibold px-6 py-2 rounded-full'>
                    Get Started
                </button>
            </div>

            {/* About Section with ref */}
            <About aboutRef={aboutRef} />
        </div>
    );
}

export default Intro;
