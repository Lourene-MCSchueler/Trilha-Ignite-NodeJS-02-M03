import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '@/use-cases/get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUserRepository)
  return getUserProfileUseCase
}
