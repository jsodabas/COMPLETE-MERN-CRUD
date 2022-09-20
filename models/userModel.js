import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})
userSchema.statics.signupUser = async function(username, email, password) {
    if(!username) {
        throw Error('Please provide a username')
    }
    if(!email) {
        throw Error('Please fill this email field')
    }
    if(!password) {
        throw Error('Please fill this password field')
    }
    const exists = await this.findOne({email})
    if(exists) {
        throw Error('This email already exists')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid. Please try another one.')
    }
    if(password.length < 8) {
        throw Error('Password must be 8 characters or more')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({username, email, password: hash})
    return user
}

userSchema.statics.login = async function( email, password ) {
    const user = await this.findOne({email})

    if(!user) {
        throw Error('No such email found. Sign up instead')
    }
    if(!email) {
        throw Error('Email must be filled out')
    }
    if(!password) {
        throw Error('Password must be filled out')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Invalid Credentials')
    }

    return user
}

export default mongoose.model('user', userSchema)