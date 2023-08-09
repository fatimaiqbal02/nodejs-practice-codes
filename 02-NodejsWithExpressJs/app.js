const express = require('express')
let fs = require('fs')

let app = express()
const portNo = 3000

//middleware
app.use(express.json())

//CREATING A CUSTOM MIDDLEWARE          //(used to manipulate response or request object before sending response)
app.use((req, res, next)=>{
    req.requestedAt = new Date().toISOString()
    next()
})

//getting movies list from json file
let movies = JSON.parse(fs.readFileSync('./data/movies.json'))


//CREATING ROUTE HANDLER FUNCTIONS

//1)Get all Movies - GET: api/v1/movies
const getAllMovies = (req,res)=>{
    res.status(200).json({
        status: "success",
        requestedAt: req.requestedAt,        //date from middleware
        count: movies.length,
        data: {
            movies: movies
        }
    })
}

//2)Add new Movie - POST: api/v1/movies
const addNewMovie =  (req, res)=>{
    //console.log(req.body)                         //{name: 'Movie 2', releaseYear: 2020, duration: 70 }

    const newID = movies[movies.length-1].id + 1
    const newMovie = Object.assign({id: newID}, req.body)
    
    movies.push(newMovie)
    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=>{
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie                    //newMovie bcz one movie will be displayed which is created
            }
        })
    })
    //res.send('Created')
}

//3)Get movie by ID -  GET: api/v1/movies/:id
const getMovieById = (req, res)=>{
    //console.log(req.params)                        // { id: '4' }
    
    const id = req.params.id * 1
    let movieById = movies.find(el => el.id == id)

    if(!movieById){
        return res.status(404).json({
            status: "failed",
            message: `No movie is found with id = ${id}`     
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            movie: movieById
        }
    })
}

//4)Update movie by ID -  PATCH: api/v1/movies/:id
const updateMovieById =  (req, res)=>{
    let id = req.params.id * 1
    let movieToUpdate = movies.find(el => el.id == id)

    if(!movieToUpdate){
        return res.status(404).json({
            status: "failed",
            message: `No movie is found with id = ${id}`     
        })
    }

    //get the index of movie to be deleted
    let index = movies.indexOf(movieToUpdate)
    let updatedMovie = Object.assign(movieToUpdate, req.body)

    //placing updated movie back at the index
    movies[index] = updatedMovie

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=>{
        res.status(200).json({
            status: "success",
            data: {
                movie: updatedMovie
            }
        })
    })
}

//5)Delete movie by ID - DELETE: api/v1/movies/:id
const deleteMovieById =  (req, res)=>{
    let id = req.params.id * 1
    let movieToDelete = movies.find(el => el.id == id)

    if(!movieToDelete){
        return res.status(404).json({
            status: "failed",
            message: `No movie is found with id = ${id}`     
        })
    }

    //get the index of movie to be updated and updated it
    let index = movies.indexOf(movieToDelete)

    //Removing movie at the index
    movies.splice(index, 1)

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err)=>{
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })
}

//ALL HTTP METHODS
app.route('/api/v1/movies')
    .get(getAllMovies)
    .post(addNewMovie)

app.route('/api/v1/movies/:id')
    .get(getMovieById)
    .patch(updateMovieById)
    .delete(deleteMovieById)

/* Second way 
app.get('/api/v1/movies', getAllMovies )
app.post('/api/v1/movies', addNewMovie)
app.get('/api/v1/movies/:id', getMovieById)
app.patch('/api/v1/movies/:id',updateMovieById)
app.delete('/api/v1/movies/:id', deleteMovieById) 
*/

    
//creating and starting the server
app.listen(portNo, ()=>{
    console.log('Server has started')
})