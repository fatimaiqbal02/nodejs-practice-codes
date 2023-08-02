const http = require('http')
const fs = require('fs')

const portNo = 8000
const hostname = '127.0.0.1'

const htmlContent = fs.readFileSync('./Template/index.html')

//creating the server
const server = http.createServer((request, response)=>{
    response.end(htmlContent)
    console.log('Received the new request...')
})

//starting the server
server.listen(portNo, hostname, ()=>{
    console.log("Server has started...")
})
