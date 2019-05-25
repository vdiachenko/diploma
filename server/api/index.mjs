import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import authMiddleware from '../middlewares/auth.mjs'
import * as db from '../utils/db.mjs'

dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') })

const router = express.Router()

router.get('/users', (req, res) => {
    db.users().then(data => {
        return res.send(data.reduce((acc, item) => ({
            ...acc,
            [item.code]: item
        }), {}))
    })
})

router.get('/users/:id', (req, res) => {
    db.user({ code: req.params.id }).then(data => res.send(data))
})

router.post('/auth', (req, res) => {    
    db.user(req.body).then(async user => {
        if (!user) {
            res.send({ status: 'error' })
        } else {
            const payload = {
                _id: user._id,
                code: user.code,
                firstname: user.firstname,
                lastname: user.lastname,
                middlename: user.middlename,
                gender: user.gender,
                dob: user.dob,
                education: user.education,
                position: user.position,
            }
    
            const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
                expiresIn: '1h'
            })

            res.cookie('token', token, { httpOnly: true }).send(payload)
        }
    })
})

router.post('/register', (req, res) => {
    db.createUser(req.body).then(async user => {
        const payload = {
            _id: user._id,
            code: user.code,
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            gender: user.gender,
            dob: user.dob,
            education: user.education,
            position: user.position,
        }

        const token = jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: '1h'
        })

        res.cookie('token', token, { httpOnly: true }).send(payload)
    })
})

router.get('/check-token', authMiddleware, (req, res) => {
    res.send(req.user)
})

router.post('/schulte/save', async (req, res) => {
    const result = await db.createSchulteResult(req.body)
    
    res.send(result)
})

router.post('/svmr/save', async (req, res) => {
    const result = await db.createSVMRResult(req.body)
    
    res.send(result)
})

router.post('/survey/save', async (req, res) => {
    const method = req.body.method
    let result = {}

    switch (method) {
        case 'schulte': 
            result = await db.createSchulteResult(req.body)
            break

        case 'svmr': 
            result = await db.createSVMRResult(req.body)
            break

        default:
            result = {}
    }


    res.send({
        status: 'redirect',
        redirectUrl: `/survey/${result._id}/`,
    })
})

router.get('/surveys/:id', async (req, res) => {
    const surveys = await db.surveys(req.params.id)
    
    res.send(surveys)
})

router.get('/user/surveys/:id', async (req, res) => {
    const surveys = await db.userSurveys(req.params.id)
    
    res.send(surveys)
})

export default router
