const events = require('events')

//created event emitter..
myEmitter = new events.EventEmitter()

//event listener and event handler 
myEmitter.on('userCreated', (name, id)=>{
    console.log(`A user is created with name = ${name} and ID = ${id}`)
})

//we can make another event listener and event handler for same event
myEmitter.on('userCreated', (name, id)=>{
    console.log(`A user is already created with name = ${name} and ID = ${id}`)
})

//event emitter emits an event
myEmitter.emit('userCreated', 'fatima', 17)