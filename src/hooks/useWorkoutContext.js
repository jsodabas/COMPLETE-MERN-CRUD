import { useContext } from "react";
import { WorkoutContext } from "../context/workoutContext.js";

export const useWorkoutContext = () => {
    const Context = useContext(WorkoutContext)

    return Context
}