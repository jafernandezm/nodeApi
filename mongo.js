const moongose = require('mongoose')


const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test'? MONGO_DB_URI_TEST : MONGO_DB_URI

//const connectionString = MONGO_DB_URI_TEST 

if (!connectionString) {
    console.error('Recuerda que tienes que tener un archivo .env con las variables de entorno definidas y el MONGO_DB_URI que servirá de connection string. En las clases usamos MongoDB Atlas pero puedes usar cualquier base de datos de MongoDB (local incluso).')
  }

moongose.set("strictQuery", false);
//conexion a mongodb
moongose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindeAndModify: false,
    //useCreateIndex: true
})
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

process.on('uncaugthException', error => {
    console.log('uncaugthException : ->', error)
    moongose.disconnect()
});

    /*
const note = new Note({
    content: 'Primera subida',
    date: new Date(),
    important: true
})
note.save()
    .then(result => {
        console.log('note saved!')
        mongoose.connection.close()
    })
    .catch(error => {
        console.log(error)
    })


Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
*/











