const express = require('express')
let app = express()

const portNo = 3000

//route => http method + url
app.get('/', (req, res)=>{
    res.status(200).json({message: 'welcome', status: 200})
})

//creating and starting the server
app.listen(portNo, ()=>{
    console.log('Server has started')
})