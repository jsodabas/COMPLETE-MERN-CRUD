import WorkoutModel from '../models/workoutModels.js'

// get all workouts
const getAll = async (req, res) => {

    const user_id = req.user._id

    try {
        const getAllWorkouts = await WorkoutModel.find({ user_id }).sort({createdAt: -1})
        res.status(200).json(getAllWorkouts)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get single workout
const getSingleWorkout = async (req, res) => {

    const {id} = req.params

    try {
        const getWorkout = await WorkoutModel.findOne({_id: id})
        res.status(200).json(getWorkout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// create post
const createWorkout = async (req, res) => {

    const {title, load, reps} = req.body

    try {
        const user_id = req.user._id
        const createWorkout = await WorkoutModel.create({title, load, reps, user_id})
        res.status(200).json(createWorkout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete post
const deleteWorkout = async (req, res) => {

    const {id} = req.params

    try {
        const deleteWorkout = await WorkoutModel.findByIdAndDelete({_id: id})
        res.status(200).json(deleteWorkout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// update workout
const updateWorkout = async (req, res) => {

    try {
        const updateWorkout = await WorkoutModel.findByIdAndUpdate({_id: req.params.id}, {title: req.body.title, load: req.body.load, reps: req.body.reps})
        res.status(201).json({updateWorkout})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export {
    getAll, getSingleWorkout, createWorkout, deleteWorkout, updateWorkout
}