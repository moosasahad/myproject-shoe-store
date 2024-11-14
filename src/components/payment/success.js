import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axiosPrivate } from '../../axiosinstance';


const Success = () => {
    const { sessionID } = useParams();
    const [order, setOrder] = useState([]);
    const [address, setAddress] = useState({
        recipientName: '',
        street: '',
        city: '',
        postalCode: '',
        phone: ''
    });
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress({ ...address, [name]: value });
    };

    const handleSubmitAddress = async (e) => {
        e.preventDefault();
        try {
            await axiosPrivate.post(`/user/verifyorder/${sessionID}`); // Save address associated with this order
            toast.success('order placed succesfully')
            navigate('/')
        } catch (error) {
            toast.error('there is an error on placing order')
            console.log(error);
            
        }
    };

    const getorderbyid = async () => {
        try {
            const res = await axiosPrivate.get(`/user/getorderbyID/${sessionID}`);
            setOrder(res.data.order);
            console.log('Order Details:', res.data.order);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getorderbyid();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4 pt-20">
            <div className="bg-white p-8 rounded shadow-md max-w-md text-center">
                <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
                <p className="text-lg mb-6">Thank you for your order. Your payment has been processed successfully!</p>
                <p className="text-gray-700 mb-4">We are preparing your order for shipment. Please provide your delivery address below.</p>

                <form onSubmit={handleSubmitAddress} className="text-left">
                    <label className="block mb-2">
                        Recipient Name:
                        <input
                            type="text"
                            name="recipientName"
                            value={address.recipientName}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </label>
                    <label className="block mb-2">
                        Street Address:
                        <input
                            type="text"
                            name="street"
                            value={address.street}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </label>
                    <label className="block mb-2">
                        City:
                        <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </label>
                   
                    <label className="block mb-4">
                        Phone Number:
                        <input
                            type="text"
                            name="phone"
                            value={address.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-green-600 text-white rounded mt-4"
                    >
                        verify address & complete order
                    </button>
                </form>

               
            </div>
        </div>
    );
};

export default Success;