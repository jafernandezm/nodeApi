//dependencias
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
//modelos
const User = require('../models/user')

//api crea un servidor
loginRouter.post('/', async (request, response) => {
    const { body } = request

    const { username, password } = body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)


    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        id: user._id,
        username: user.username,
    }
    
    const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 *24 * 30})

  
    response.send({
        username: user.username,
        name: user.name,
        token
    })
})


//exportar
module.exports = loginRouter
