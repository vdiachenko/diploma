import mongoose from 'mongoose'
import nanoid from 'nanoid'

const Schema = mongoose.Schema

const SchulteResultSchema = new Schema({
    id: { 
        type: String,
        unique: true,
        default: () => nanoid(10),
    },

    method: {
        type: String,
        required: false,
        default: 'shulte',
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    created: { 
        type: Date,
        default: Date.now,
    },

    stats: [
        {
            id: Number,
            averageTime: Number,
            errorsCount: Number,
            maxReactionTime: Number,
            minReactionTime: Number,
            summaryTime: Number,
            variationalScale: Number,
            values: [
                {
                    time: Number, 
                    value: Number,
                    error: Boolean,
                },
            ],
        },
    ],
})

mongoose.model('SchulteResult', SchulteResultSchema)
