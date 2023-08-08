const express = require('express')
let fs = require('fs')

let app = express()
const portNo = 3000

let movies = JSON.parse(fs.readFileSync('./data/movies.json'))

//GET: api/v1/movies
app.get('/api/v1/movies', (req,res)=>{
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    })
})

//creating and starting the server
app.listen(portNo, ()=>{
    console.log('Server has started')
})