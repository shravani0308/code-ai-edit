import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// import "./signup.css";

export const Signup = () => {

  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigateT = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      const {data} = await axios.post(
                 `${import.meta.env.VITE_BACKEND}/user/signup`,

        {username,email,password},
        {
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        }
      )

      toast.success(data.message || "Registration successful");

      setUsername("");
      setEmail("");
      setPassword("");

      navigateT("/login");

    }catch(error){
      toast.error(error.response?.data?.errors || "Registration failed");
    }
  }

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h2 className="signup-title">Sign Up</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="signup-btn" type="submit">
            Sign Up
          </button>

          <p className="signup-login">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>

        </form>

      </div>

    </div>
  )
}