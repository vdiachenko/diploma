import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    code: { 
        type: Number, 
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        select: false,
    },

    firstname: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    middlename: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    dob: {
        type: Date,
        required: true,
    },

    education: {
        type: String,
        required: true,
    },

    position: {
        type: String,
        required: true,
    },

    surveys: [String],
})

mongoose.model('User', UserSchema)
