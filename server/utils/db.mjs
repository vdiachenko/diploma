import mongoose from 'mongoose'
import '../models/User'
import '../models/SchulteResult'
import '../models/SVMRResult'

const User = mongoose.model('User')
const SchulteResult = mongoose.model('SchulteResult')
const SVMRResult = mongoose.model('SVMRResult')

export function connect() {
    mongoose.connect(`mongodb://localhost:27017/diploma`, {
        useNewUrlParser: true
    })
}

export function users() {
    return User.find()
}

export function user({
    code,
    password,
}) {
    if (!password) {
        return User.findOne({ code }).select('-dob -education -position -surveys')
    } else {
        return User.findOne({ code, password })
    }
}

export function createUser({
    code,
    password,
    firstname,
    lastname,
    middlename,
}) {
    const user = new User({
        code,
        password,
        firstname,
        lastname,
        middlename,
    })

    return user.save()
}

export async function createSchulteResult(data) {
    try {
        const schulteResult = new SchulteResult(data)
        const schulte = await schulteResult.save()

        return schulte
    } catch(err) {
        throw err
    }
}

export async function createSVMRResult(data) {
    try {
        const svmrResult = new SVMRResult(data)
        const svmr = await svmrResult.save()

        return svmr
    } catch(err) {
        throw err
    }
}

export async function surveys(id) {
    let survey = null

    survey = await SVMRResult.findById(id)

    if (!survey) {
        survey = await SchulteResult.findById(id)
    }

    survey.user = await User.findById(survey.user)

    return survey
}

export async function userSurveys(userId) {
    const svmr = await SVMRResult.find({ user: userId })
    const schulte = await SchulteResult.find({ user: userId })

    return [...svmr, ...schulte]
}
