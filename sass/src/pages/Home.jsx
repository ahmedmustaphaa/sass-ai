import React from 'react'
import Hero from '../component/Hero'
import Featured from '../component/Featured'
import Testimonial from '../component/NewsLetter'
import Plan from '../component/Plan'
import Footer from '../component/Footer'
import General from '../component/general'

function Home() {
  return (
    <div className='pt-40 md:px-30 bg-[url("./assets/gradientBackground.png")] h-screen w-full bg-no-repeat bg-center bg-cover' >
      <Hero/>
      <Featured/>
      <Testimonial/>
      <Plan/>
      <Footer/>
     
    </div>
  )
}

export default Home
