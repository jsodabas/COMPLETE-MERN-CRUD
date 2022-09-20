import UserModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}

const signupUser = async (req, res) => {
    const {username, email, password} = req.body

    try {
        const user = await UserModel.signupUser(username, email, password)
        const token = createToken(user._id)
        res.status(201).json({user, token, username})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)
        const username = user.username
        res.status(201).json({user, username, token, email})

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

export {
    signupUser, loginUser
}