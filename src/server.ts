import { fastify } from 'fastify'
import { createUserController } from './controllers/createUserController'
import { getAllUserController } from './controllers/getAllUserController'

const app = fastify()

app.register(createUserController)
app.register(getAllUserController)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server HTTP is running!')
  })
