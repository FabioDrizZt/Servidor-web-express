//Requerimos el modulo express
const express = require('express')
// instanciamos de la aplicación de express
const app = express()

process.loadEnvFile() // si no pasan parametro, por defecto es .env
const path = require('path')
app.use(express.static(path.join(__dirname, process.env.WEBSITE_FOLDER)))

//por aquí definimos los middlewares
app.use((req, res, next) => {
  // trackear una request
  // ver todo lo que va a la base de datos
  // revisar las cookies del usuario
  console.log(`${req.method} ${req.url} - ${new Date()}`)
  next()
})

const authenticateMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Si el usuario está autenticado, continúa con la siguiente función en la cadena de middleware
    return next()
  }
  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  res.redirect('/login')
}

//uso del middleware en el medio entre la ruta y el callback, este protege la ruta
app.get('/miPerfil', authenticateMiddleware, (req, res) => {
  //solo se llega en caso de estar autenticado (si el middleware ejecuto el next)
  res.render('miPerfil')
})

app.use('/productos/*', (req, res, next) => {
  // trackear una request
  // ver todo lo que va a la base de datos
  // revisar las cookies del usuario
  console.log(
    'request recibido por el 2do middleware que modifica el req del producto'
  )
  next()
})

//Definimos una ruta para manejar las solicitudes en la raíz
app.get('/', (req, res) => {
  //Cuando recibo la solicitud envio esta respuesta
  //res.status(200).send('<h1>Hola Mundo, esta es mi primer página</h1>')
  //Dando una respuesta JSON
  const respuestaJSON = {
    mensaje: 'Hola mundo, desde express',
    fecha: new Date(),
  }
  res.json(respuestaJSON)
})

//lo ultimo que llegue va al 404
app.use((req, res) => {
  res.status(404).send('<h1>404 página no encontrada que lastima =(</h1>')
})

//Iniciamos el servidor haciendo que escuche en el puerto especificado
const PORT = 3000
app.listen(PORT, () => {
  console.log(`servidor express en http://localhost:${PORT}`)
})
