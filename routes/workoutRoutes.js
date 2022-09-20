import express from 'express'
import {getAll, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout} from '../controllers/workoutController.js'
import requireAuth from '../middleware/requireAuth.js'

const router = express.Router()

// need to require all auth for all workout routes
router.use(requireAuth)

// get all workouts
router.get("/", getAll)


// get single workout
router.get('/:id', getSingleWorkout)


// create post
router.post('/', createWorkout)


// delete post
router.delete('/:id', deleteWorkout)

// update workout
router.put('/:id', updateWorkout)

export default router