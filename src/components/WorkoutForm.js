import React, {useState} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext.js'
import { useUserContext } from '../hooks/useUserContext.js'

const WorkoutForm = () => {

    const {dispatch} = useWorkoutContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const {user} = useUserContext()

    const submitHandler = async (e) => {
        e.preventDefault()

        const workout = {title, load, reps}

        const response = await fetch('http://localhost:5000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        } else {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

  return (
    <div>
        {
            user ? (
            <form onSubmit={submitHandler}>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Type your workout here' />
                <input type='number' value={reps} onChange={(e) => setReps(e.target.value)} placeholder='Type your reps here' />
                <input type='number' value={load} onChange={(e) => setLoad(e.target.value)} placeholder='Type your load here' />
                <button type='submit'>Submit Workout</button>
                {error && <div>{error}</div>}
            </form>
        ) : (
            <div>Sign up or login to your account to create a workout</div>
        )
        }
    </div>
  )
}

export default WorkoutForm