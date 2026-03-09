import React from 'react'
import { Route,Router,Routes } from 'react-router-dom'
import Home from './assets/servers/Home'
import { Signup } from './assets/servers/Sinup'
import { Login } from './assets/servers/Login'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/' element={<Signup/>}/>
        <Route path='/' element={<Login/>}/>
      </Routes>
    </div>

  )
}

export default App;