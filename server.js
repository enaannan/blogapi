require('dotenv').config()
const db = require("./models/index.js")
const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res)=>{
res.json({message: "Hello from simple server"})
})

//port
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
console.log(`listening on ${PORT}`)

})