import React from 'react'
import {Link} from 'react-router-dom'
import { useUserContext } from '../hooks/useUserContext.js'
import { useWorkoutContext } from '../hooks/useWorkoutContext.js'

const Navbar = () => {

  const {user} = useUserContext()
  const {dispatch} = useUserContext()
  const {dispatch: workoutsDispatch} = useWorkoutContext()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({type: 'LOGOUT'})
    workoutsDispatch({type: 'SET_WORKOUT', payload: null})
  }

  return (
    <div>
        <Link to="/">Workout Buddy</Link>
        {
          user && (
            <div className='user-loggedIn'>
              {
                user ? (<h2>Welcome, {user.username}</h2>) : (<h2>Thank you for visiting!</h2>)
              }
              <button onClick={logout}>Logout</button>
            </div>
          )
        }
        {
          !user && (
            <div className='user-not-loggedIn'>
              <Link to="/login">Login</Link>
              <br />
              <Link to="/signup">Sign up</Link>
            </div>
          )
        }
    </div>
  )
}

export default Navbar