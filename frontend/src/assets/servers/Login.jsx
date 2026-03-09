import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

export const Login = () => {


  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const naviagateT=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
     const {data}= await axios.post("http://localhost:3000/user/login",{
      email,password
     }
    ,{
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    })
    console.log(data);
    toast.success(data.message || "login successful");
    setEmail("");
    setPassword("");
    naviagateT("/");
    }catch(error){
      console.log(error);
      toast.error(error.response.data.errors ||"login failed");
    }
  }
  return (
    <div className='flex h-screen justify-center items-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <div className='text-2xl font-semibold mb-5 text-center'>Login</div>

        <form onSubmit={handleSubmit}>
          

          <div className='mb-4'>
            <label className='block mb-1 font-semibold'>Email</label>
            <input
              type="email"
              placeholder='Type email'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='mb-4'>
            <label className='block mb-1 font-semibold'>Password</label>
            <input
              type="password"
              placeholder='Type password'
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            className='w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold p-3'
            type='submit'
          >
            Sign Up
          </button>

          <p className='mt-4 text-center text-gray-600'>
            New user?
            <Link to='/Signup' className='text-blue-600 hover:underline ml-1'>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
