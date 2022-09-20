import React, { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar.js'
import { useWorkoutContext } from './hooks/useWorkoutContext.js'
import { useUserContext } from './hooks/useUserContext.js'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'

const App = () => {

  const {user} = useUserContext()
  const [loading, setLoading] = useState(true)
  const {dispatch} = useWorkoutContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:5000/api/workouts", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'SET_WORKOUT', payload: json})
        setLoading(false)
      }
    }

    if(user) {
      fetchWorkouts()
    }
    setLoading(false)
  }, [dispatch, user])

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {
        !user ? (<title>{document.title = "Thanks for visiting"}</title>) : (<title>{document.title = `Welcome, ${user.username}`}</title>)
      }
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App