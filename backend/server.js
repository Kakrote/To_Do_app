const express=require('express')
require('dotenv').config()
const connectDB=require('./config/db')
const taskRoutes=require('./routes/taskRoutes')
const authRouter=require('./routes/auth')
const protected=require('./middleware/authMiddleware')
const cors=require('cors')
const app=express()

app.use(express.json())
app.use((cors()))
connectDB()
app.use('/api/task',taskRoutes)
app.use('/api/auth',authRouter)
app.listen(process.env.PORT,console.log(`listing on port ${process.env.PORT}`))


