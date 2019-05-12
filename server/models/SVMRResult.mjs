import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SVMRResultSchema = new Schema({
    method: {
        type: String,
        required: false,
        default: 'svmr',
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
            step: Number,
            values: [
                {
                    time: Number,
                    ahead: Number,
                    skip: Boolean,
                },
            ],
        }
    ],
})

mongoose.model('SVMRResult', SVMRResultSchema)
