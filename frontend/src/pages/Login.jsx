import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
      username: '',
    password: '',
  });
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    try {
      // Configure Axios
      const response = await axios.post('http://localhost:8000/api/user/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true
      });

      console.log(response);
      
 
        // // Handle successful response
        toast.success(response.data.message);
        navigate("/")
        dispatch(setAuthUser(response.data))
     
        
     
        
        
    } catch (error) {
        // Handle errors
         console.log("error is " , error.response.data.message);
      
        toast.error(error.response.data.message);
    
    }
    setFormData({
        username: '',
      password: '',
    })
  };

  return (
    <div className="signup-form">
      <h2
      className='text-center text-blue-900 mb-3 text-3xl font-bold'
      >Login</h2>
      <form 
      className='flex flex-col gap-5 w-96 mb-3 '
      onSubmit={handleSubmit}>
       
        <input 
        className = "border-black border py-2 px-2"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input 
        className = "border-black border py-2 px-2"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button 
        className='btn btn-primary'
        type="submit">Login</button>
      </form>
      <p> Dont have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
};

export default Login;
