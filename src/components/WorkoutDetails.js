import React, {useState} from 'react'
import { useUserContext } from '../hooks/useUserContext.js';
import { useWorkoutContext } from '../hooks/useWorkoutContext.js';
import Modal from 'react-bootstrap/Modal'
import Axios from 'axios'

const WorkoutDetails = ({workout}) => {

  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    load: "",
    reps: ""
  })
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {dispatch} = useWorkoutContext()
  const {user} = useUserContext()

    const deleteHandler = async () => {

      const response = await fetch(`http://localhost:5000/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
      })

      const json = await response.json()

      if(response.ok) {
        dispatch({type: 'DELETE_WORKOUT', payload: json})
      }
    }
    
    const handleChange = (e) => {
      const {name, value} = e.target
      setUpdatedPost((prev) => {
        return {
          ...prev,
          [name]: value
        }
      })
    }

    const updatePost = async (id, title, load, reps) => {
      setUpdatedPost((prev) => {
        return {
          ...prev,
          id: id,
          title: title,
          load: load,
          reps: reps
        }
      })
      handleShow()
    }

    const saveUpdatedWorkout = async () => {
      Axios.put(`http://localhost:5000/api/workouts/${updatedPost.id}`, updatedPost, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })

      window.location.reload()
    }

  return (
    <>
    {
      user && (
      <div style={{border: '1px solid gray', width: "15rem"}}>
          <p>Title: <strong>{workout.title}</strong></p>
          <p>Workout load in (kg): <strong>{workout.load}</strong></p>
          <p>Workout reps: <strong>{workout.reps}</strong></p>
          <button onClick={deleteHandler}>Delete</button>
          <button onClick={() => updatePost(workout._id, workout.title, workout.load, workout.reps)}>Edit</button>
          <Modal show={show}>
            <input type="text" placeholder='Update your title' name="title" value={updatedPost.title ? updatedPost.title : ""} onChange={handleChange} />
            <input type="number" placeholder='Update your load' name="load" value={updatedPost.load ? updatedPost.load : ""} onChange={handleChange} />
            <input type="number" placeholder='Update your reps' name="reps" value={updatedPost.reps ? updatedPost.reps : ""} onChange={handleChange} />
            <button onClick={saveUpdatedWorkout}>Update</button>
            <button onClick={handleClose}>Cancel</button>
          </Modal>
      </div>
      )
    }
    </>
  )
}

export default WorkoutDetails