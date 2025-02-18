import React from 'react';

const ReusableTitle = ({title,subtitle}) => {
    return (
        <div className='mx-auto text-center space-y-1 text-white px-2 py-4'>
            <h3 className='uppercase lg:text-3xl font-semibold  text-xl'>{title}</h3>
            <h2 className='md:text-2xl text-xl'>{subtitle}</h2>
        </div>
    );
};

export default ReusableTitle;