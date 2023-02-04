
const jwt = require('jsonwebtoken')

module.exports = (request , response, next) => {

    const authentification = request.get('authorization')

    let token = ''
    if (authentification && authentification.toLowerCase().startsWith('bearer')) {
        token = authentification.substring(7)
    } 

    let decodedToken = {}
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        console.log(error)
    }
 
    console.log(decodedToken)

    if (!token || !decodedToken.id) {
        // 401 Unauthorized no tiene permiso para acceder a este recurso
        return response.status(401).json({ error: 'token missing or invalid | no tiene permiso para acceder a este recurso' })
    }


    const {id : userId} = decodedToken
    request.userId = userId
    next()
}



