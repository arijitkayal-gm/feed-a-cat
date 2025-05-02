import mongoose, { Mongoose } from "mongoose";

const { Schema, model } = mongoose;

const Userschema = new Schema({
    email: { type: String, required: true },
    password: { type: String },
    name: { type: String },
    username: { type: String, required: true },
    coverPic: { type: String },
    profilePic: { type: String },
    bio: { type: String },
    galleryPic: { type: String},
    gallery: [{ type: String }], // Array of strings for multiple gallery images
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

export default mongoose.models.User || model("User",Userschema);