import { fastify } from 'fastify'
import { createUserRoute } from './routes/createUser'

const app = fastify()

app.register(createUserRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server HTTP is running!')
  })
