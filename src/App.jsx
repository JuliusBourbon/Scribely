import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Routes, Route, useLocation  } from 'react-router-dom'
import './App.css'
import LandingPage from './components/landingPage'
import Navbar from './components/navbar'
import WordIt from './components/wordit'
import Dict from './components/dict'
import Wordle from './components/wordle'
import Footer from './components/footer'

function App() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden bg-[linear-gradient(to_bottom_right,#FBBE16,#EEA228,#FBBE16,#F4C75D)]">
      <Navbar/>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/wordit' element={<WordIt/>}></Route>
        <Route path='/dictionary' element={<Dict/>}></Route>
        <Route path='/wordle' element={<Wordle/>}></Route>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
