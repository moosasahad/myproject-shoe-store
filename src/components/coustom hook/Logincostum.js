
import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useLogandReg() {
    const Logincontext = createContext()
    const navigate = useNavigate(); 
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    });

    let storage = localStorage.getItem("inputValue");
    
    // Correct the parsing of local storage
    const [active, setActive] = useState(storage ? JSON.parse(storage) : null); 
    // console.log("Current User State: ", active); // Log current user to check state updates

    const handleSubmit = async (evn) => {
        evn.preventDefault();

        try {
            const res = await axios.get("http://localhost:3000/usere"); // Ensure this URL is correct
            const userdata = res.data;

            const user = userdata.find(user => 
                (user.email === inputValue.email || user.number === inputValue.email) && user.password === inputValue.password
            );

            if (user) {
                console.log("Login Successful", user);

                localStorage.setItem("inputValue", JSON.stringify(user));
                setActive(user); 
                navigate('/'); 
                alert("Login Successful");
            } else {
                console.log("Invalid credentials");
                alert("Login failed! Please enter correct details or create a new account.");
            }
        } catch (error) {
            console.error("Error during login", error);
        }
    };

    const handleChange = (evn) => {
        const name = evn.target.name;
        const value = evn.target.value;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    };
const value = 12;
    return [handleChange, inputValue, handleSubmit,active,setActive]
}

export default useLogandReg;
