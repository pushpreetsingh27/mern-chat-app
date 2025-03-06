import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
    confirmPassword: '',
    gender: '',
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, password, username, confirmPassword, gender } = formData;

    // Check for matching passwords
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      // Configure Axios
      const response = await axios.post('http://localhost:8000/api/user/signup', {
        fullName,
        password,
        confirmPassword,
        username,
        gender,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials:true
      });

      if(response.data.success){
        // Handle successful response
        toast.success('Signup successful!');
        navigate("/login")
        console.log('Response:', response.data);
      }

    } catch (error) {
      // Handle errors
      toast.error(error.response?.data?.message || 'Signup failed');
      console.error('Error:', error.response?.data);
    }
    setFormData({
      fullName: '',
      password: '',
      username: '',
      confirmPassword: '',
      gender: '',
    })
  };

  return (
    <div className="signup-form">
      <h2
      className='text-center text-blue-900 mb-3 text-3xl font-bold'
      >Signup</h2>
      <form 
      className='flex flex-col gap-5 w-96 mb-3 '
      onSubmit={handleSubmit}>
        <input 
        className = "border-black border py-2 px-2"
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
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
        <input 
        className = "border-black border py-2 px-2"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <select
        className = "border-black border py-2 px-2"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button 
        className='btn btn-primary'
        type="submit">Signup</button>
      </form>
      <p> Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
