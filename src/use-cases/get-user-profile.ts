/* eslint-disable prettier/prettier */
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type getUserProfileUseCaseRequest = {
  userId: string
}

type getUserProfileUseCaseResponse = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ userId }: getUserProfileUseCaseRequest): Promise<getUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }
    return { user }
  }
}
