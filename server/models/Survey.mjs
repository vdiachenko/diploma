import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SurveySchema = new Schema({
    method: {
        type: String,
        required: true,
    },

    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

mongoose.model('Survey', SurveySchema)