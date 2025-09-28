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
import ButtonTop from './components/buttonTop'

function App() {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-x-hidden bg-[linear-gradient(to_bottom_right,#FBBE16,#EEA228,#FBBE16,#F4C75D)]">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/wordit' element={<WordIt />} />
          <Route path='/dictionary' element={<Dict />} />
          <Route path='/wordle' element={<Wordle />} />
        </Routes>
      </main>

      <Footer />
      <ButtonTop/>
    </div>
  );
}

export default App
