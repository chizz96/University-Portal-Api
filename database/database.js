const mongoose = require('mongoose')
require('dotenv').config()

const URL = process.env.MONGODB_URI

mongoose.connect(URL)
.then(()=>{
    console.log('Successfully connected to database')
})
.catch((error)=>{
    console.log('Database connection failed', error.message)
})