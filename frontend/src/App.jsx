import React from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import Home from './assets/servers/Home'
import { Signup } from './assets/servers/Sinup'
import { Login } from './assets/servers/Login'
import './App.css'
import  {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>

  )
}

export default App;