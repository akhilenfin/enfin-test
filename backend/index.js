require('dotenv').config()
const http = require('http');
const express = require('express');
var cors = require('cors');

const dbConnect = require('./config/db/dbConnect')
const { connectStore } = require('./config/store')  
const { errorHandler, notFound } = require('./middleware/errorMiddleware')


const userRoutes = require('./routes/userRoutes')


const init = async () => {
    //console.log("process.env.REDIS_HOST", process.env.REDIS_HOST)
    dbConnect()
    
    const PORT = process.env.PORT
    const app = express()
    const server = http.Server(app)
    const store = await connectStore()
    app.use(express.json({ limit: '50mb', extended: true }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }))

    app.use(cors())
    app.use(userRoutes)

    app.use(notFound)
    app.use(errorHandler)

    
    server.listen(PORT, console.log(`server is running at ${PORT}`))
}
init()