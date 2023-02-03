//definicion de esquema
const { Schema, model } = require('mongoose')
// definicion de esquema de notas
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
// definicion de metodo
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//definicion de modelo
const Note = model('Note', noteSchema)

module.exports = Note


