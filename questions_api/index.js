const questions_db = require('./questions')

const express = require('express')
const app = express()
const port = process.env.PORT || 8000

app.get("/", function(req, res){
    res.send(questions_db)
})

app.listen(port, () => {
    console.log("Server Running on Port - "+port)
})