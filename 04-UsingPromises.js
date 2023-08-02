const fs = require('fs')
const util = require('util')

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

async function fileHandling(){
    try{
        data = await readFileAsync('./Files/start.txt', 'utf-8')
        console.log(data)
    
        data2 = await readFileAsync(`./Files/${data}.txt`, 'utf-8')
        let content = `Data read from file: ${data2}. \nDate created: ${new Date()}`
    
        await writeFileAsync('./Files/output.txt', content)
        console.log('File written succesfully')
    
    }catch(err){
        console.log(err)
    }
}

fileHandling()
console.log('Running...')
