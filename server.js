require('dotenv').config()

require("./DB/db.connection");


const { checkSchema,validationResult } = require('express-validator');



const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require("./models/sync.js")
const tag = require("./models/Tag")
const {schemaFromModel} = require("./utils/modelUtils")

app.get('/',(req,res)=>{
res.json({message: "Hello from simple server"})
})


const tagValidationSchema = schemaFromModel(tag);

app.post('/tags',checkSchema(tagValidationSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({message: "get blog tags!"})
})

//port
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=>{
console.log(`listening on ${PORT}`)

})