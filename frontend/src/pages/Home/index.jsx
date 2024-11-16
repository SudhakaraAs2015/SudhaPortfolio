// pages/Home/index.js
import React from 'react';
import Header from '../../components/Header';
import Intro from './Intro';
import About from './About';
import Experiences from './Experiences';
import Projects from './Projects';
import Courses from './Courses';
import Footer from './Footer';
import LeftSider from './LeftSider';
import Contact from './Contact';
import { useSelector } from 'react-redux';

function Home() {
  const { loading,portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />   
      {
        portfolioData && (
          <div className="bg-primary px-40 sm:px-5">
        <Intro />
        <Experiences />
        <Projects />
        <Courses />
        <Contact/>
        <Footer />
        <LeftSider />
      </div>
        )
      }
      
    </div>
  );
}

export default Home;
