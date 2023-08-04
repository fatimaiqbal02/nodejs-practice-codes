const events = require('events')

module.exports = class extends events.EventEmitter{
    constructor(){
        super()
    }
}

//i made custom EventEmitter user class which inherits EventEmitter class
