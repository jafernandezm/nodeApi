para ver versiones de node.js
nmp -v
node -v


Para iniciar el proyecyo
```bash
npm init -y
```

para ver que tenemos
```bash
npm run
```

para iniciar el protecto
```bash
npm start
```

para nodemon link
https://github.com/remy/nodemon
comandos comando para dependecias para solo programas
```bash
npm install nodemon -D
./node_modules/.bin/nodemon index.js
```

para exprese el link
https://github.com/expressjs/express
Comandos
```bash
para instalar eslint
npm install eslint -D
npm run lint

```





Codigo

//permite a todos los servidores hacer peticiones a este servidor
```js
app.use(cors())
```

comandos para subira fly.io la api 
pagina
https://fly.io/docs/hands-on/sign-up/

```bash
flyctl launch
```

para anadir pariables de entonrno instalamos
```bash
npm install dotenv
```

mongodb
```sql
use nodeApi

db.createCollection('posts')
// insertar
db.photos.insert({
  id:2,  
  name : "Pedazo de foto",
  img: 'https://instagram.com/...',
  likes:[{yellow:1 , camila:1 }],
  user:"@jhon",
})
//buscar todos
db.photos.find()
// filtrar
db.photos.find({ user: '@jhon'})

// update
db.photos.update({ user:"@jhon"},{
  name: "Es otra foto"
})
// update bien usado 
db.photos.update({ user:"@jhon"},{
  $set:{
    name: "Es otra foto"
  }
})


```




instala mongoose -->https://mongoosejs.com/docs/index.html
```bash
 npm install mongoose
```



para hacer testing 
mocha ->>https://mochajs.org/

ava ---> https://github.com/avajs/ava

jest ---> https://jestjs.io/

usaremos jest
npm install jest --save-dev
despues de eso anadimos al package.json 
```
"jest": {
    "testEnvironment": "node"
  }
```

para poder trabajar en pre produccion con test en el package.json
```bash
npm install cross-env
  "scripts": {
    "dev": "NODE_ENV=development nodemon index.js",
    "lint": "eslint --fix .",
    "start": "NODE_ENV=production node index.js",
    "test": "NODE_ENV=test jest --verbose"
  },
```



para testear para la base de datos se usa supertest
https://www.npmjs.com/package/supertest

```bash
np, install supertest -D
```

instalamos un encritador para encritar los password
npm install bcrypt
```js
const bcrypt = require('bcrypt')
const saltRounds = 10
const passwordHash = await bcrypt.hash(password, saltRounds)
```


validador de mongoose-unique-validator 
https://www.npmjs.com/package/mongoose-unique-validator
```bash
npm install --save mongoose-unique-validator
```
dependecias a models
```js
const uniqueValidator = require('mongoose-unique-validator')


userSchema.plugin(uniqueValidator)
```


jwt tokens
para hacer 
--> https://jwt.io/

```

```

instalamos los tokens con 
```
npm install jsonwebtoken
```


usamos el toque con bearer
https://swagger.io/docs/specification/authentication/bearer-authentication/
