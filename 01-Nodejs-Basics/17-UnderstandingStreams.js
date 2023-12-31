const fs = require('fs')
const http = require('http')

const portNo = 7000
const hostname = '127.0.0.1'

const server = http.createServer()

server.on('request', (request, response)=>{
    let rs = fs.createReadStream('./Files/largeFile.txt')
    //rs.pipe(response)          solves backpressure problem
    
    rs.on('data', (chunk)=>{
        response.write(chunk)
    })

    rs.on('end',()=>{
        response.end()
    })

    rs.on('error',(err)=>{
        response.end(err.message)
    })
})

server.listen(portNo, hostname, ()=>{
    console.log("Server has started...")
})

//reading stream working faster, writing stream slow => back pressure(response slow)