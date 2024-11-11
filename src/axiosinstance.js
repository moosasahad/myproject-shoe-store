import axios from "axios";

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