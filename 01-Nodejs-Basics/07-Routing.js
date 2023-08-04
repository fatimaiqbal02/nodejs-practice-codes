const http = require('http')

const portNo = 8000
const hostname = '127.0.0.1'

//creating the server
const server = http.createServer((request, response)=>{
    let path = request.url

    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.end("You are in Home page")
    }else if(path.toLocaleLowerCase() === '/about'){
        response.end("You are in About page")
    }else if(path.toLocaleLowerCase() === '/contact'){
        response.end("You are in Contact page")
    }else{
        response.end("Error 404: Page not Found")
    }
})

//starting the server
server.listen(portNo, hostname, ()=>{
    console.log("Server has started...")
})
