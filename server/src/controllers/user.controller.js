import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";


// register user 
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!(name, email, password)) {
        throw new ApiError(400, "All fields are required")
    }

    const newUser = await User.create({ name, email, password })

    if (!newUser) {
        throw new ApiError(500, "Something went wrong while creating user")
    }

    return res.status(200).json({
        "message": "User created successfully",
        "user": newUser
    })
})

// login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email, password)) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "user not found")
    }

    const isPasswordMatched = await user.isPasswordCorrect(password)

    if (!isPasswordMatched) {
        throw new ApiError(400, "wrong password")
    }

    const loggedInuser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
        .status(200)
        .cookie("token", loggedInuser.generateAuthToken(), options)
        .json({
            "message": "User logged in successfully",
            "user": loggedInuser,
            "token": loggedInuser.generateAuthToken()
        })
})

// get current user 
export const getCurrentUser = asyncHandler( async(req, res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password")

    if(!user) {
        throw new ApiError(404, "User not found")
    }

    return res.status(200).json({
        "message": "User fetched successfully",
        "user": user
    })
})

export const logoutUser = asyncHandler(async (req, res) => {

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("token", options)
        .json(
             {
                "message": "User logged out successfully"
             }
        )


})