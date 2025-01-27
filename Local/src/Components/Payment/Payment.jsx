import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReusableTitle from '../ReusableTitle';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFrom from './CheckOutFrom';
const Payment = () => {
    const {id}= useParams()
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)


    return (
        <div className=' mx-auto'>
            <ReusableTitle title='Pay Now' subtitle='You can Pay'/>
           <div className='mt-10'>
            <Elements stripe={stripePromise}>
                <CheckOutFrom/>
            </Elements>
           </div>
        </div>
    );
};

export default Payment;