import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import api from './api/index.mjs'
import * as db from './utils/db.mjs'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), 'server', '.env') })
db.connect()

const app = express()

app
    .use(bodyParser.json())
    .use(cookieParser())
    .use('/api', api)
    .listen(process.env.PORT, () => console.log(`Server in up and running on port ${process.env.PORT}`))
