import { fastify } from 'fastify'
import { createUserRoute } from './routes/createUser'
import { getAllUserRoute } from './routes/getAllUser'

const app = fastify()

app.register(createUserRoute)
app.register(getAllUserRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server HTTP is running!')
  })
