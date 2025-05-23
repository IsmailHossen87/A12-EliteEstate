import React from 'react';
import Banner from './Banner';
import LatestReview from './LatestReview';
import AdvertiseHome from './AdvertiseHome';
import HowItsWork from './HowItsWork';
import Enquire from './Enquire';
import Expert from './Expert';
import Gallery from './Gallery';
import FAQS from './FAQs';
import About from './About';


const Home = () => {
    return (
        <div className=''>
          <Banner></Banner> 
          <div className="container mx-auto">
          <AdvertiseHome></AdvertiseHome>
          <HowItsWork></HowItsWork>
          <Expert></Expert>
          <Gallery/>
          <FAQS/>
          <LatestReview></LatestReview>
          <Enquire></Enquire>
          </div>
        
        </div>
    );
};

export default Home;