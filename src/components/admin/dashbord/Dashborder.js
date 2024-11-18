
import './Dashborde.css';
import { useNavigate } from 'react-router-dom';
import { BsShop } from "react-icons/bs";
import { PiNotebookDuotone } from "react-icons/pi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Linechart from './Linechart';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { axiosPrivate } from '../../../axiosinstance';
// import { ProductService } from './service/ProductService';


function Dashborder() {
  const navigat = useNavigate()
  const [revanu,setrevanu]=useState(0)
  const[totalproduct,settotalproduct]=useState(0)

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
  // console.log("dfghjkl",revanu);
  

  return (
   <div className=''>
    {/* --Daily Revenue--  */}
    <div className='flex flex-wrap gap-5 m-5 justify-center align-middle'>
      <div className='bg-emerald-500 w-56 h-32  rounded-xl flex items-center justify-center'>
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
      <div className='ml-3 text-white mt-3'>
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
   {/* --graph-- */}
   <div className='m-5'>
    <h3 className='text-center p-10'>Monthly Sales Report </h3>
    <BarChart
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
   {/* <Linechart className="w-20 m-10"/> */}
   </div>
   {/* -- Recent orders */}
   <h3 className='text-center p-10'>Recent Order</h3>
   {/* <div className="card">
            <DataTable value={"xcvbnm"} header={"header"} footer={"footer"} tableStyle={{ minWidth: '60rem' }}>
                <Column field="name" header="Name"></Column>
                <Column header="Image" body={"jfgjhgjfh"}></Column>
                <Column field="price" header="Price" body={"jfgjhgjfh"}></Column>
                <Column field="category" header="Category"></Column>
                <Column field="rating" header="Reviews" body={"jfgjhgjfh"}></Column>
                <Column header="Status" body={"jfgjhgjfh"}></Column>
            </DataTable>
        </div> */}
   </div>
  );
}

export default Dashborder;
