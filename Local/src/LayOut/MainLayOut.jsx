import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const MainLayOut = () => {
    return (
        <div className='container mx-auto'>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-368px)] bg-gray-900"> 
            <Outlet>  </Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;