//obtener todas las notas
const bcrypt = require('bcrypt')
const notesRouter = require('express').Router()

const Note = require('../models/Note')
const User = require('../models/user.js')
//notesRouter.use(logger)
//  api crea un servidor
/*
    const app = http.createServer((request, response) => {
    //tipo de datos que debemos devolver es json
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(notes));
});
*/
//
notesRouter.get('/',async  (request, response) => {
    const notes = await Note.find({}).populate('user', {
        username: 1, 
        name: 1, 
        //_id: 0
    })
    response.json(notes)
  })
  
//obtener una nota
notesRouter.get('/:id', (request, response,next) => {
    const { id }= request.params

    Note.findById(id).then(note => {
        if (note) return response.json(note)
        response.status(404).end()
        
    }).catch(err => next(err))


})
//actualizar
notesRouter.put('/:id', (request, response, next) => {
    const { id } = request.params

    const note = request.body

    const newNoteInfo = {
        content: note.content,
        important: note.important,
    }

    Note.findByIdAndUpdate(id, newNoteInfo,{new:true})
        .then(result => {
        response.json(result)
        }).catch(next)

}) 

//eliminar
notesRouter.delete('/:id', async (request, response, next) => {
const { id } = request.params
    // const note = await Note.findById(id)
    // if (!note) return response.sendStatus(404)

    const res = await Note.findByIdAndDelete(id)
    if (res === null) return response.sendStatus(404)

    response.status(204).end()
    })
//crear una nota
notesRouter.post('/', async (request, response, next) => {
    const { content
    , important = false, userId } = request.body

    const user = await User.findById(userId)
    if (!content) {
        return response.status(400).json({
        error: 'required "content" field is missing'
        })
    }
 
    const newNote = new Note({
        content: content,
        date: new Date(),
        important: important || false,
        user : user._id        
    }) 

    // newNote.save().then(savedNote => {
    //   response.json(savedNote)
    // }).catch(err => next(err))

    try {
        const savedNote = await newNote.save()
        // guardamos la nota en el usuario
        user.notes = user.notes.concat(savedNote._id)	
        await user.save()
        //
        response.json(savedNote)
    } catch (error) {
        next(error)
    }

})

module.exports = notesRouter
