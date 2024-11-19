
import './Dashborde.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsShop } from "react-icons/bs";
import { PiNotebookDuotone } from "react-icons/pi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import React, { useState, useEffect } from 'react';

import { axiosPrivate } from '../../../axiosinstance';
// import { ProductService } from './service/ProductService';


function Dashborder() {
  const navigat = useNavigate()
  const [revanu,setrevanu]=useState(0)
  const[totalproduct,settotalproduct]=useState(0)
  const[most,setMost]=useState([])

  const totalRevenue = async ()=>{
    try {
      const response = await axiosPrivate.get("/admin/totalrevannu")
      const productresponse = await axiosPrivate.get("/admin/totalproduct")
      // console.log("totalrevannu response",productresponse);
      setrevanu(response.data)
      settotalproduct(productresponse.data)
      
      
    } catch (error) {
      console.log("totalrevannu error",error);
      
      
    }
  }
 useEffect(()=>{
  totalRevenue()
 },[])

 const resendorders = async ()=>{
  try {
    const res = await axiosPrivate.get("admin/resenduser")
    console.log("res resend",res.data.mostorder)

    setMost(res.data.mostorder)
  } catch (error) {
    console.log(error)
    
  }
 }
 useEffect(()=>{
  resendorders()
 },[])

  // console.log("dfghjkl",most);
  

  return (
   <div className='bg-orange-100'>
    <div>
      {/* --Daily Revenue--  */}
    <div className='flex flex-wrap gap-5 p-5 justify-center align-middle'>
      <div className='bg-emerald-500 w-56 h-32  rounded-xl flex items-center justify-center shadow-xl'>
     <div className='mt-3'>
     <span className="bg-emerald-600 w-16 h-16 rounded-full text-lg flex items-center justify-center">
  <BsShop className="text-4xl text-white"/>
</span>
     </div>

      <div className='ml-3 text-white mt-3'>
      <spna className="font-semibold">Daily Revenue</spna>
      <br />
      <spna className="text-2xl font-bold">₹ {revanu.dailyRevenue}</spna>
      <br />
      <p className="bg-emerald-600 rounded-3xl w-14 text-center text-white mt-2 ">47%</p>
      </div>
      </div>
      {/* -- total ordes */}
      <div className='bg-indigo-500 w-56 h-32  rounded-xl flex items-center justify-center shadow-indigo-800 '>
     <div className='mt-3'>
     <span className="bg-indigo-600 w-16 h-16 rounded-full text-lg flex items-center justify-center">
  <PiNotebookDuotone className="text-4xl text-white"/>
</span>
     </div>
    {/* --Total Orders--- */}
      <div className='ml-3 text-white mt-3 shadow-xl'>
      <spna className="font-semibold">Total Orders</spna>
      <br />
      <spna className="text-2xl font-bold">{totalproduct.totalProductCount}</spna>
      <br />
      <p className="bg-indigo-600 rounded-3xl w-14 text-center text-white mt-2 ">47%</p>
      </div>
      </div>
      {/*  */}
      <div className='bg-yellow-500 w-56 h-32  rounded-xl flex items-center justify-center'>
     <div className='mt-3'>
     <span className="bg-yellow-600 w-16 h-16 rounded-full text-lg flex items-center justify-center">
  <AiOutlineShoppingCart className="text-4xl text-white"/>
</span>
     </div>

      <div className='ml-3 text-white mt-3'>
      <spna className="font-semibold">Total Revenue</spna>
      <br />
      <spna className="text-2xl font-bold">₹ {revanu.totalRevenue}</spna>
      <br />
      <p className="bg-yellow-600 rounded-3xl w-14 text-center text-white mt-2 ">57%</p>
      </div>
      </div>
    </div>
   {/* --graph-- */}
   <div className='m-5 shadow-xl'>
    <h3 className='text-center p-10'>Monthly Sales Report </h3>
    <div className='flex'>
    <BarChart
    className='max-w-96'
      series={[
        { data: [revanu.dailyRevenue, 44, 24, 34] },
        { data: [totalproduct.totalProductCount,6, 49, 30] },
        { data: [revanu.dailyRevenue, 25, 30, 50] },
        { data: [revanu.totalRevenue, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: revanu.dailyRevenue, label: 'Daily Revenue' },
            { id: 1, value: totalproduct.totalProductCount, label: 'Total Orders' },
            { id: 2, value: revanu.totalRevenue, label: 'Total Revenue' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
    </div>
   </div>
   {/* -- Recent orders */}

   <div className="container mx-auto p-6">
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
      Recent Orders
    </h2>
   <div className='m-6 rounded-lg shadow-lg'>
   <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
        
          <th className="py-3 px-6 text-center">Order ID</th>
          <th className="py-3 px-6 text-center">User</th>
          <th className="py-3 px-6 text-center">Date</th>
          <th className="py-3 px-6 text-center">Total Amount</th>
          <th className="py-3 px-6 text-center">Payment Status</th>
          <th className="py-3 px-6 text-center">Shipping Status</th>
          <th className="py-3 px-6 text-center"></th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm font-light">
        {most.map((item, index) => (
          <tr
            key={index}
            className={`border-b border-gray-200 hover:bg-gray-100 text-center ${
              index % 2 === 0 ? "bg-gray-50" : ""
            }`}
          >
           
            <td className="py-3 px-6 text-lg font-semibold whitespace-nowrap">
              {index+1}
            </td>
            <td className="py-3 px-6 text-lg font-semibold whitespace-nowrap flex my-auto"><span className='text-white bg-orange-500 rounded-full w-8 h-8 text-xl my-auto mr-3'>{item.userId.name.slice(0,1).toUpperCase()}</span>{item.userId.name}</td>
            <td className="py-3 px-6 text-lg font-semibold whitespace-nowrap">
              {new Date(item.purchaseDate).toLocaleDateString()}
            </td>
            <td className="py-3 px-6 text-lg font-semibold whitespace-nowrap">₹ {item.amount}</td>
            <td className="py-3 px-6 text-lg font-semibold whitespace-nowrap">
              <span
                className={"px-2 py-1 rounded-full text-lg font-semibold "}
              >
                {item.paymentStatus}
              </span>
            </td>
            <td className="py-3 px-6 text-lg font-semibold whitespace-nowrap">
              <span
                className={"px-2 py-1 text-lg font-semibold  rounded-full"}
              >
                {item.shippingStatus}
              </span>
            </td>
            <td className="py-3 px-6 text-base font-semibold whitespace-nowrap"><Link to={(`/userorderview/${item.userId._id}`)} className='no-underline bg-blue-600 text-white p-1 rounded-md'>
            view
            </Link></td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
  </div>
</div>

  
    </div>
   </div>
  );
}

export default Dashborder;
