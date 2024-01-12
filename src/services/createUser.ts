import { prisma } from 'src/lib/prisma'

interface IUserProperties {
  name: string
  email: string
  password: string
}

export async function createUserService(user: IUserProperties) {
  const { name, email, password } = user
  try {
    await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    })
    await prisma.$disconnect()
  } catch (e) {
    console.error(e)
    await prisma.$disconnect()
  }
}
