require('dotenv').config()
require("./DB/db.connection");

const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

require("./models/sync.js")

const userRoutes = require("./routes/userRoutes")
const blogPostRoutes = require("./routes/blogPostRoutes")
const tagsRoutes = require("./routes/tagRoutes")
const categoryRoutes = require("./routes/categoryRoutes")

const tag = require("./models/Tag")

const { checkSchema,validationResult } = require('express-validator');
const {schemaFromModel} = require("./utils/modelUtils")

const tagValidationSchema = schemaFromModel(tag);


app.get('/',(req,res)=>{
    res.json({message: "Health Check"})
})


app.use('/user',userRoutes);
app.use('/blogPost',blogPostRoutes);
app.use('/tag',tagsRoutes);
app.use('/category',categoryRoutes);


app.post('/tags',checkSchema(tagValidationSchema), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.json({message: "get blog tags!"})
})

module.exports = app