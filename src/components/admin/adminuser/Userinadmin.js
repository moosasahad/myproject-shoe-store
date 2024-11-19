import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { axiosPrivate } from "../../../axiosinstance";
import { FaPlus } from "react-icons/fa6";

function Userinadmin() {
  const[user, setUser]=useState([])
  
    const userfetach = async ()=>{
      try {
        const response = await axiosPrivate.get("admin/getuser")
        const res = response.data;
        console.log("featch user",res.alluser);
        
         
        
        setUser(res.alluser)
        
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
    userfetach()
   },[])
   console.log("dgshfghjg fetchuser ", user);
const navigate = useNavigate()
  //  const value = user.map(value=>value.status)
  //  console.log("admin status user ",value);
   const userblock = async (id)=>{
    console.log("id",id)
    try {
      const res = await axiosPrivate.post("/admin/useblock/",{userid:id})
      console.log("block user",res);
      userfetach()
      
      
    } catch (error) {
      console.log(error);
      
      
    }

   }
  return (
    <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {user.map((user) => (
        <div
          key={user.id}
          className="bg-orange-100 p-6 rounded-lg shadow-md flex flex-col items-center"
        >
          <img
            src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-white shadow-md mb-4"
          />
          <h2 className="text-lg font-bold text-gray-700">{user.name}</h2>
          <p className="text-sm text-gray-600">user ID: {user._id}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">{user.number}</p>
          <p className="text-sm text-gray-600">{!user.status?"active":"blocked"}</p>
          <div className="flex gap-4">
          <button
          onClick={()=>navigate(`/userorderview/${user._id}`)}
          className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-black font-bold  hover:bg-gray-100 shadow">
            Orders
          </button>
          <button
          onClick={()=>userblock(user._id)}
           className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-black font-bold  hover:bg-gray-100 shadow">
           {!user.status?"block":"unblock"}
          </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Userinadmin
