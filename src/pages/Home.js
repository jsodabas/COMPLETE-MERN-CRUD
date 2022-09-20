import React, { useState, useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails.js'
import WorkoutForm from '../components/WorkoutForm.js'
import { useUserContext } from '../hooks/useUserContext.js'
import {useWorkoutContext} from '../hooks/useWorkoutContext.js'

const Home = () => {

    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useUserContext()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchWorkout = async () => {
            const response = await fetch("http://localhost:5000/api/workouts", {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })

            const json = await response.json()

            if(response.ok) {
                setLoading(false)
                dispatch({type: 'SET_WORKOUT', payload: json})
            }
        }

        if(user) {
            fetchWorkout()
        }
        setLoading(false)
    }, [dispatch, user])

    if(loading) {
        return <div>Loading...</div>
    }

  return (
    <div className='home'>
        <div className='workouts'>
            {
                workouts && workouts.map((workout) => (
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))
            }
            <WorkoutForm />
        </div>
    </div>
  )
}

export default Home