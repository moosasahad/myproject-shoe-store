import React, { useContext } from 'react';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Cartcontext } from '../context/Addcart';
import axios from 'axios';
import { axiosPrivate } from '../../axiosinstance';

const stripePromise = loadStripe("pk_test_51QKaD7J7Mcf8zmejWW7oKrpHj1ncGG364Rb89Ngf22nxR1EWKqT2Zga7iFVwNnKvsw0gokO6NulH7KoMjFd2aXnb00QM1NCCub");

export default function Paymen() {
  const { clientSecret } = useContext(Cartcontext);

  // Option for Stripe payment
  const option = { clientSecret };
  console.log("option", option);

  // Handle successful payment and call API
  const handlePaymentSuccess = async (id) => {
    try {
      const res = await axiosPrivate.post(`/verifyOrder${id}`)
      
        console.log('Payment was successful, and API call completed.');
    } catch (error) {
      console.error('Error making API call after payment:', error);
    }
  };
  

  return (
    <div className='bg-yellow-100 mt-16'>
      <div className="m-auto max-w-2xl p-6 text-blue-900 pt-16 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl py-2 text-center font-semibold">Payment</h1>
        <EmbeddedCheckoutProvider className="bg-gray-600 p-4 rounded-md" stripe={stripePromise} options={option}>
          <EmbeddedCheckout
            onPaymentIntentReceived={handlePaymentSuccess}  // This will handle successful payments
          />
        </EmbeddedCheckoutProvider>
      </div>
    </div>
  );
}
