import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, useLocation  } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landingPage'
import Navbar from './components/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden bg-[linear-gradient(to_bottom_right,#FBBE16,#EEA228,#FBBE16,#F4C75D)]">
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
