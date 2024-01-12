import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export async function createUserRoute(app: FastifyInstance) {
  app.post('/users', async (req, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const { name, email, password } = bodySchema.parse(req.body)

    try {
      await prisma.users.create({
        data: {
          name,
          email,
          password,
        },
      })
      await prisma.$disconnect()
      return reply.status(200).send({ message: 'User successfully registered' })
    } catch (error) {
      console.error(error)
      prisma.$disconnect()
    }
  })
}
