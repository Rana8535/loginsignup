import React, { useState } from 'react' 
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const history=useNavigate();
    const [value,setvalue]=useState({
        email:"",
        password:""
    })
    
    const handlechange=(e)=>{
        setvalue({
            ...value,
            [e.target.name]:e.target.value
        })
    }
    const handlesubmit=async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:5000/login",value)
        .then(res=>{
            if(res.data=="exist"){
                history('/home')
                // alert("Account login succesfully");
            }
            else if(res.data=="invalid email"){
                alert("Enter the correct email");
            }
            else{
                alert("Enter the correct password");
            }
        })
       
    }
  return (
    <div className='container'>
        <h2>Login Here!</h2>
        <form onSubmit={handlesubmit}>
            <input placeholder='Enter your Email' onChange={handlechange} value={value.email}  type="email" name="email" id="email"/>
            <input placeholder='Enter your Password' onChange={handlechange} value={value.password}  type="password" name="password" id="password" />
            <button type='submit'>Login</button>
            <br />
            <button><Link to="/">signup!</Link></button>
        </form>
    </div>
  )
}

export default Login