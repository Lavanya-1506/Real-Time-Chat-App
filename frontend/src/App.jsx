import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.jsx'
import { Routes ,Route, Navigate} from 'react-router-dom'
import HomePage from './components/HomePage.jsx'
import SignupPage from './components/SignupPage.jsx' 
import LoginPage from './components/LoginPage.jsx'
import SettingsPage from './components/SettingsPage.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import {useAuthStore} from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast' 
import { useLocation } from 'react-router-dom';



function App() {
  const location = useLocation();


  const {authUser, checkAuth, isCheckingAuth}= useAuthStore()

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  console.log({authUser})

  

  if(isCheckingAuth && !authUser) return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>

  )



 return (
  <div data-theme>
    <Navbar/>


    <Routes>
      <Route path="/" element={ authUser ? <HomePage/> : <Navigate to="/login"/> }/>
      <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/"/>}/>
      <Route path="/login" element={!authUser ?<LoginPage/> : <Navigate to="/"/>}/>
      {/* <Route path="/settings" element={<SettingsPage/>}/> */}
      <Route path="/profile" element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
     
    </Routes>

    

 
    <Toaster/>


  
  </div>
 )
}

export default App
