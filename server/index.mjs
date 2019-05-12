import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import api from './api/index.mjs'
import * as db from './utils/db.mjs'
import path from 'path'

dotenv.config({
    path: path.resolve(process.cwd(), 'server', '.env')
})
db.connect()

const app = express()
const port = process.env.PORT || 8080
const rootDir = path.resolve(process.cwd())

app
    .use(bodyParser.json())
    .use(cookieParser())
    .use(express.static(rootDir))
    .use(express.static(path.join(rootDir, 'build')))
    .use('/api', api)
    .get('/*', (req, res) => res.sendFile(path.join(rootDir, 'build', 'index.html')))
    .listen(port, () => console.log(`Server in up and running on port ${port}`))
