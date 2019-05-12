import path from 'path'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import '../models/User'
import '../models/SchulteResult'
import '../models/SVMRResult'

dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') })

const User = mongoose.model('User')
const SchulteResult = mongoose.model('SchulteResult')
const SVMRResult = mongoose.model('SVMRResult')
let connectionString = `${process.env.DB_PROTOCOL}://`

if (process.env.DB_USER && process.env.DB_PASSWORD) {
    connectionString += `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`
}

if (process.env.DB_HOST) {
    connectionString += process.env.DB_HOST
}

if (process.env.DB_PORT) {
    connectionString += `:${process.env.DB_PORT}`
}

if (process.env.DB_NAME) {
    connectionString += `/${process.env.DB_NAME}`
}

console.log(connectionString)

export function connect() {
    mongoose.connect(connectionString, {
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
        return User.findOne({
            code
        }).select('-dob -education -position -surveys')
    } else {
        return User.findOne({
            code,
            password
        })
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
    } catch (err) {
        throw err
    }
}

export async function createSVMRResult(data) {
    try {
        const svmrResult = new SVMRResult(data)
        const svmr = await svmrResult.save()

        return svmr
    } catch (err) {
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
    const svmr = await SVMRResult.find({
        user: userId
    })
    const schulte = await SchulteResult.find({
        user: userId
    })

    return [...svmr, ...schulte]
}
