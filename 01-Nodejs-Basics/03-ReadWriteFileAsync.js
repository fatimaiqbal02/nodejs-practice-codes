const fs = require('fs')

fs.readFile('./Files/start.txt', 'utf-8', (err, data)=>{
    console.log(data)
    fs.readFile(`./Files/${data}.txt`, 'utf-8', (err,data2)=>{
        console.log(data2)
        let content = `Data read from file: ${data2}. \nDate created: ${new Date()}`
        fs.writeFile('./Files/output.txt', content, ()=>{
            console.log('File written succesfully')
        })
    })
})

console.log('Running....')

//this long callback triangle can be reduced using await and promises