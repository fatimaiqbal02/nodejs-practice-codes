const http = require('http')
const fs = require('fs')
const url = require('url')

const portNo = 8000
const hostname = '127.0.0.1'

const htmlContent = fs.readFileSync('./Template/index2.html', 'utf-8')

//getting data in Json and converting to js
let rawData = fs.readFileSync('./Data/products.json', 'utf-8')
let products = JSON.parse(rawData)

let productsList = fs.readFileSync('./Template/products.html', 'utf-8')

let productHtmlArray = products.map((prod)=>{
    let output = productsList.replace('{{%IMAGE%}}', prod.productImage);
    output = output.replace('{{%NAME%}}', prod.name)
    output = output.replace('{{%MODELNO%}}', prod.modeNumber)
    output = output.replace('{{%MODELNAME%}}', prod.modeName)
    output = output.replace('{{%PRICE%}}', prod.price)
    output = output.replace('{{%COLOR%}}', prod.color)
    output = output.replace('{{%SIZE%}}', prod.size)
    output = output.replace('{{%CAMERA%}}', prod.camera)
    output = output.replace('{{%ID%}}', prod.id)
    
    console.log(output)
    return output;
})

//creating the server
const server = http.createServer((request, response)=>{

    let {query, pathname: path} = url.parse(request.url, true)

    if(path === '/' || path.toLocaleLowerCase() === '/home'){
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header': 'hello, fatima'
        })
        response.end(htmlContent.replace('{{%Content%}}', "You are in Home page"))
    }else if(path.toLocaleLowerCase() === '/about'){
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header': 'hello, fatima'
        })
        response.end(htmlContent.replace('{{%Content%}}', "You are in About page"))
    }else if(path.toLocaleLowerCase() === '/contact'){
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'my-header': 'hello, fatima'
        })
        response.end(htmlContent.replace('{{%Content%}}', "You are in Contact page"))
    }else if(path.toLocaleLowerCase() === '/products'){
        if(query.id){
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'my-header': 'hello, fatima'
            })
            //response.end(productsList)            //hardcoded one value
            response.end(htmlContent.replace('{{%Content%}}', productHtmlArray.join(',')))
        }else{
            response.end("this is the product with id ="+query.id)
        }
       
    }else{
        response.writeHead(404, {
            'Content-Type': 'text/html',
            'my-header': 'hello, fatima'
        })
        response.end(htmlContent.replace('{{%Content%}}', "Error 404: Page not Found"))
    }
})

//starting the server
server.listen(portNo, hostname, ()=>{
    console.log("Server has started...")
})
