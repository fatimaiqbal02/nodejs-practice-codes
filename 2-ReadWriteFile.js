const fs = require('fs')

let textIn = fs.readFileSync('./Files/input.txt','utf-8')
console.log(textIn)

let content = `Data read from file: ${textIn}. \nDate created: ${new Date()}`

fs.writeFileSync('./Files/output.txt',content)

