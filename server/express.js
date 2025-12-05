import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'

// ROUTES
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import contactRoutes from './routes/contact.routes.js'
import projectRoutes from './routes/project.routes.js'
import educationRoutes from './routes/education.routes.js'
// If you are using this one for static assets, you can also enable it:
// import assetsRouter from './routes/assets-router.js'

const app = express()

// GLOBAL MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// API ROUTES
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use('/', contactRoutes)
app.use('/', projectRoutes)
app.use('/', educationRoutes)
// app.use('/', assetsRouter)

// ROOT
app.get('/', (req, res) => {
  res.status(200).send(Template())
})

export default app



