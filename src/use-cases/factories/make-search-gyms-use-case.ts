import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '@/use-cases/search-gyms'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository)
  return searchGymsUseCase
}
