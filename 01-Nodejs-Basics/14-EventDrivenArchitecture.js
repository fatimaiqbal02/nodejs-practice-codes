const http = require('http')
const fs = require('fs')
const url = require('url')
const replaceHtml = require('./Modules/replaceHtml')

const portNo = 4000
const hostname = '127.0.0.1'

//getting data in Json and converting to js
let rawData = fs.readFileSync('./Data/products.json', 'utf-8')
let products = JSON.parse(rawData)

//reading html files
const htmlContent = fs.readFileSync('./Template/index2.html', 'utf-8')
let productsList = fs.readFileSync('./Template/products.html', 'utf-8')
let productsDetail = fs.readFileSync('./Template/products_details.html', 'utf-8')

/*
instead of creating reusable function here
imported custom module
*/

//creating the server
//server inherits event emitter class.. 
const server = http.createServer()

//creating event listener with event handler
//it follows observer pattern
server.on('request', (request, response)=>{

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
        if(!query.id){
            response.writeHead(200, {
                'Content-Type': 'text/html',
                'my-header': 'hello, fatima'
            })
            let productDetailArray = products.map((prod)=>{
                return replaceHtml(productsList, prod)
            })
            response.end(htmlContent.replace('{{%Content%}}', productDetailArray.join(',')))
        }else{
            //response.end(query.id)
            let product = products[query.id]
            let productDetailRes = replaceHtml(productsDetail, product)
            response.end(htmlContent.replace('{{%Content%}}', productDetailRes))
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
