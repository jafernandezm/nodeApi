

const ERROR_HANDLER = {
    CastError: (error, response) => {
      response.status(400).send({ error: 'malformatted id' })
    },

    JsonWebTokenError: (error, response) => {
      response.status(401).json({
        error: 'invalid token'
      })
    },

    defaultError: (error, response) => {
      response.status(500).end()
    },

    ValidationError: (error, response) => {
      response.status(409).json({ error: error.message })
    },
    TokenExpiredError: (error, response) => {
      response.status(401).json({
        error: 'token expired || token expirado'
      })
    }

}
 

module.exports=(error, request , response, next)=> {
    console.error(error)
    console.log(error.name)
    const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError
    
    handler(error, response)
    
  }
