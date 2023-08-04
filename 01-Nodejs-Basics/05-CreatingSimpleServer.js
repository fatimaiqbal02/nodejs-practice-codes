const http = require('http')

const portNo = 8000
const hostname = '127.0.0.1'

//creating the server
const server = http.createServer((request, response)=>{
    response.end("hello from the server")
    console.log('Received the new request...')
})

//starting the server
server.listen(portNo, hostname, ()=>{
    console.log("Server has started...")
})
