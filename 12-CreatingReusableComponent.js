const http = require('http')
const fs = require('fs')
const url = require('url')

const portNo = 4000
const hostname = '127.0.0.1'

//getting data in Json and converting to js
let rawData = fs.readFileSync('./Data/products.json', 'utf-8')
let products = JSON.parse(rawData)

//reading html files
const htmlContent = fs.readFileSync('./Template/index2.html', 'utf-8')
let productsList = fs.readFileSync('./Template/products.html', 'utf-8')
let productsDetail = fs.readFileSync('./Template/products_details.html', 'utf-8')

//creating reusable function
function replaceHtml(templateHtml, product){
    let output = templateHtml.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}', product.name)
    output = output.replace('{{%MODELNO%}}', product.modelNumber)
    output = output.replace('{{%MODELNAME%}}', product.modeName)
    output = output.replace('{{%PRICE%}}', product.price)
    output = output.replace('{{%COLOR%}}', product.color)
    output = output.replace('{{%SIZE%}}', product.size)
    output = output.replace('{{%CAMERA%}}', product.camera)
    output = output.replace('{{%ROM%}}', product.ROM)
    output = output.replace('{{%DESC%}}', product.Description)
    output = output.replace('{{%ID%}}', product.id)

    return output;
}

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
