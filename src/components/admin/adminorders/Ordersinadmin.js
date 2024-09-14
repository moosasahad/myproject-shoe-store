import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FetchBuyingDetails() {
  const [buyingDetails, setBuyingDetails] = useState(null);
  const userId = '3a80'; // The user's ID

  useEffect(() => {
    const fetchBuyingData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usere");
        // Extract the 'buying' data from the response
        const userBuyingData = response.data
        setBuyingDetails(userBuyingData);
      } catch (error) {
        console.error('Error fetching buying data:', error);
      }
    };

    fetchBuyingData();
  }, [userId]);

  return (
    <div>
      {buyingDetails ? (
        <div>
          <h2>Buying Details</h2>
          {
            buyingDetails.map(item=>(
              <h1>{item.buying}</h1>
            ))
          }
          {/* <p>Name: {buyingDetails.name}</p> */}
          {/* <p>Email: {buyingDetails.email}</p>
          <p>Phone Number: {buyingDetails.phonenumber}</p>
          <p>Address: {buyingDetails.address}</p> */}
        </div>
      ) : (
        <p>Loading buying details...</p>
      )}
    </div>
  );
}

export default FetchBuyingDetails;
