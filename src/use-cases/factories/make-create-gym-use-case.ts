import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '@/use-cases/create-gym'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const createGymUseCase = new CreateGymUseCase(prismaGymsRepository)
  return createGymUseCase
}
