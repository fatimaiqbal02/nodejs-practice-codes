const express = require('express')
let app = express()

const portNo = 3000

//route => http method + url
app.get('/', (req, res)=>{
    res.status(200).send('<h4>Welcome to first app of expressJs</h4>')
})

//creating and starting the server
app.listen(portNo, ()=>{
    console.log('Server has started')
})