import React from 'react';
import Navbar from '../component/Navbar';
import Hero from '../component/Hero';
import { assets } from '../assets/assets';
import Feature from '../component/Feature';
import Exclusive from '../component/Exclusive';
import Testimonial from '../component/Testimonial';
import PromoSection from '../component/PromoSection';

function Home() {
  return (
    <div>
        <Hero/>
        <Feature/>

        <Exclusive/>
        <Testimonial/>
        <PromoSection/>
        
    
    </div>
  );
}

export default Home;
