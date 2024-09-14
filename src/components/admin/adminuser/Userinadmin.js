import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Userinadmin() {
  const[user, setUser]=useState([])
   useEffect(()=>{
    const userfetach = async ()=>{
      try {
        const response = await axios.get("http://localhost:3000/usere")
        const res = response.data;
         const onlyuser = res.filter(item=>item.admin==false)
        
        setUser(onlyuser)
        
      } catch (error) {
        console.log(error)
      }
    }
    userfetach()
   },[])
   console.log("dgshfghjg fetchuser ", user);
const navigat = useNavigate()
   const value = user.map(value=>value.status)
   console.log("admin status user ",value);
   
  return (
    <div>
      <h1>Users</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>ID</th>
      <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>Name</th>
      <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>Email</th>
      <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>Status</th>
      <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#f2f2f2' }}>Button</th>
      
    </tr>
  </thead>
  <tbody>
    {user.map((user) => (
      <tr key={user.id}>
        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{user.id}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{user.name}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{user.email}</td>
        <td style={{ border: '1px solid black', padding: '8px' }}>{user.status? 'Not blocked':'Blocked'}</td>
        <td style={{ border: '1px solid black', padding: '8px', textAlign:'center' }}>          
          <button style={{backgroundColor:'blue', border:'none', color:'white'}} onClick={()=>navigat(`/Userdetaulsview/${user.id}`)}>View</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  )
}

export default Userinadmin
