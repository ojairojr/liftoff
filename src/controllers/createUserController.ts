import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import { z } from 'zod'

export async function createUserController(app: FastifyInstance) {
  app.post('/users', async (req, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    })

    const { name, email, password } = bodySchema.parse(req.body)
    const user = await prisma.users.findMany()

    const userExists = user
      .map((users) => {
        if (users.email === email) {
          return users
        }
        return null
      })
      .filter(Boolean)

    if (userExists.length > 0) {
      return reply.status(400).send({
        message: 'Email already exists. Try again!',
      })
    }

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
