import React, { useState } from 'react' 
import axios from 'axios';
import {useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const history=useNavigate();
    const [value,setvalue]=useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    })
    const handlechange=(e)=>{
        setvalue({
            ...value,
            [e.target.name]:e.target.value
        })
    }
    const handlesubmit=async (e)=>{
        e.preventDefault();
        await axios.post("http://localhost:5000/register",value)
        .then(res=>{
            if(res.data=="registered"){
                history("/home")
            }
            else if(res.data=="exist"){
                alert("user already exist")
            }
            else if(res.data == "mismatched"){
                alert("password mismatched");
            }
            else{
                alert("Enter Valid Details");
            }
        })
       
    }
  return (
    <div className='container'>
        <h2>Sign Up Here!</h2>
        <form onSubmit={handlesubmit}>
            <input placeholder='Enter Your Name' onChange={handlechange} value={value.name} type='name' name='name' id='name'/>
            <input placeholder='Enter your Email' onChange={handlechange} value={value.email}  type="email" name="email" id="email"/>
            <input placeholder='Enter your Password' onChange={handlechange} value={value.password}  type="password" name="password" id="password" />
            <input placeholder='Enter your confirm Password' onChange={handlechange} value={value.cpassword}  type="password" name="cpassword" id="cpassword" />
            <button type='submit'>Sign Up</button>
            <br />
            <button><Link to="/login">Login here!</Link></button>
        </form>
    </div>
  )
}

export default Signup