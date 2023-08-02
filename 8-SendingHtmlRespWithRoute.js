const http = require('http')
const fs = require('fs')

const portNo = 8000
const hostname = '127.0.0.1'

const htmlContent = fs.readFileSync('./Template/index2.html', 'utf-8')

//creating the server
const server = http.createServer((request, response)=>{
    let path = request.url

    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.end(htmlContent.replace('{{%Content%}}', "You are in Home page"))
    }else if(path.toLocaleLowerCase() === '/about'){
        response.end(htmlContent.replace('{{%Content%}}', "You are in About page"))
    }else if(path.toLocaleLowerCase() === '/contact'){
        response.end(htmlContent.replace('{{%Content%}}', "You are in Contact page"))
    }else{
        response.end(htmlContent.replace('{{%Content%}}', "Error 404: Page not Found"))
    }
})

//starting the server
server.listen(portNo, hostname, ()=>{
    console.log("Server has started...")
})
