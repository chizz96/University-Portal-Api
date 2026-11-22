const express = require('express')
require('dotenv').config()
require("./database/database")

const departmentRoutes = require("./routers/departmentRoutes")
const courseRoute = require('./routers/coursesRoutes')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use(departmentRoutes)
app.use(courseRoute)

app.listen(port, () =>{

    console.log(`Server is running on port: ${port}`)

})

