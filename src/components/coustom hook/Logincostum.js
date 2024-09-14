import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Valuecontext } from '../../App';

function useLogandReg() {
    const{setAdminstate}=useContext(Valuecontext)
    const Logincontext = createContext();
    const navigate = useNavigate(); 
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    });

    let storage = localStorage.getItem("inputValue");
    // let  adminstorage = localStorage.getItem("admin");
    
  
    const [active, setActive] = useState(storage ? JSON.parse(storage) : null); 

    // const [admin, setAdmin] = useState(adminstorage ? JSON.parse(adminstorage) : null);
    // setAdminstate(admin)

    const handleSubmit = async (evn) => {
        evn.preventDefault();

        try {
            const res = await axios.get("http://localhost:3000/usere"); 
            const userdata = res.data;

           
            const user = userdata.find(user => 
                (user.email === inputValue.email || user.number === inputValue.email) && 
                user.password === inputValue.password && 
                user.admin === false 
            );

           
            const adminUser = userdata.find(user => 
                (user.email === inputValue.email || user.number === inputValue.email) && 
                user.password === inputValue.password && 
                user.admin === true 
            );
            

            if (user) {
                if(user.status){
                    console.log("Login Successful", user);

                localStorage.setItem("inputValue", JSON.stringify(user));
                setActive(user); 
                navigate('/'); 
                alert("Login Successful");
                }else{
                    alert("your block")
                }
            } else if (adminUser) {
                const details= JSON.stringify(adminUser)
                localStorage.setItem("admin", details);
                setAdminstate(details)
                navigate("/")
                alert("Admin Login Successful");
                console.log("jfhjkdshfhdkhfksj admin user",adminUser);
                
                
                
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

    return [handleChange, inputValue, handleSubmit, active, setActive];
}

export default useLogandReg;
