import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'

export async function getAllUserRoute(app: FastifyInstance) {
  app.get('/', async () => {
    const response = await prisma.users.findMany()
    return response
  })
}
