import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    }
}, { timestamps: true });

