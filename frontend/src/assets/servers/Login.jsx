import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// import "./login.css";

export const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigateT = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const {data} = await axios.post(
        "http://localhost:3000/user/login",
        {email,password},
        {
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        }
      )

      toast.success(data.message || "Login successful");

      setEmail("");
      setPassword("");

      navigateT("/");

    }catch(error){
      toast.error(error.response?.data?.errors || "Login failed");
    }
  }

  return (
    <div className="login-page">

      <div className="login-card">

        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>

          <div className="login-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>

          <p className="login-signup">
            New user?
            <Link to="/Signup">Sign Up</Link>
          </p>

        </form>

      </div>

    </div>
  )
}