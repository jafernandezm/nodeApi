module.exports=(error, request , response, next)=> {
    console.error(error)
    console.log(error.name)
    
    if (error.name === 'CastError') {
      // error de mongoose
      response.status(404).send({ error: 'malformatted id' })
    }
    else{
      // error nuestro 
      response.status(500).end()
    }
  }
