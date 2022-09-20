import { useContext } from "react";
import { UserContext } from "../context/userContext.js";

export const useUserContext = () => {
    const context = useContext(UserContext)

    return context
}