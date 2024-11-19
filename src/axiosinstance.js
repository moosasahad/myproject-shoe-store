import axios from "axios";
import Cookies from "js-cookie"

const BASE_URL = 'http://localhost:3000'
// const axiosinstance = axios.create({
    
// });

export default axios.create({
    baseURL: BASE_URL,
  });
  
  export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  // const refreshtoken = async () => {
  //   const token = Cookies.get("token");
  //   console.log("Existing token:", token);
  
  //   try {
  //     // Refresh token if it doesn't exist or expired
  //     const response = await axiosPrivate.post("/refreshtoken");
  //     console.log("New token response:", response);
  
  //     // Save the refreshed token in cookies
  //     Cookies.set("token", response.data.accessToken, {
  //       expires: 0.5, // Set the expiry (e.g., 30 minutes = 0.5 days)
  //       secure: true,
  //       sameSite: "lax",
  //     });
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     // Optionally handle logout or redirect to login
  //   }
  // };
  
  // // Call the function at the right time
  // refreshtoken();
  
  const refreshtoken = async () => {
    try {
      // Call refresh token API endpoint
      const response = await axiosPrivate.post("/refreshtoken");
      console.log("Token refreshed successfully");
      return response.data.accessToken; // Return the new token for further use
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error; // Rethrow error to handle logout or fallback
    }
  };
  
  // Add Axios response interceptor
  axiosPrivate.interceptors.response.use(
    (response) => response, // Pass successful responses through
    async (error) => {
      const originalRequest = error.config;

      const refretokens = Cookies.get("refreshToken")
      const adminrefresh = Cookies.get("adminrefreshToken")
      if(!refretokens || !adminrefresh){
        alert("login plese")
        window.location.href = "/login";
        console.log("refretokens",refretokens)
      }
      
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Avoid retry loops
  
        try {
          await refreshtoken(); // Call refresh token function
          return axiosPrivate(originalRequest); // Retry the original request
        } catch (refreshError) {
          console.error("Token refresh failed, redirecting to login:", refreshError);
          // Handle logout or redirect to login
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

