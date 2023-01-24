//  const { application } = require("express");

const express = require("express")
const app = express()

const logger=require('./loggerMiddleware')

//permite a todos los servidores hacer peticiones a este servidor
app.use(cors())
//  para crear por post
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: "Me tengo que levantar temprano",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  }
]

//  api crea un servidor
/*
    const app = http.createServer((request, response) => {
    //tipo de datos que debemos devolver es json
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(notes));
});
*/

app.get('/', (request, response) => {
  response.send("<a href=\"http://localhost:3001/api/notes\">Notes</a>");
  response.send("<a href=\"http://localhost:3001/api/notes\">Notes</a>");
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post("/api/notes", (request, response) => {
  const note = request.body
  console.log(note)
  response.json(note)

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== "undefined" ? note.important : false,
    date: new Date().toISOString()
  }
  notes = notes.concat(newNote)
  response.json(newNote)
})

app.use( ( request , response)=> {
  response.status(404).json({
    error: 'Not found'
    })
})
//  const port = 3001;
const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
//  console.log(`Server running on port ${port}`);
