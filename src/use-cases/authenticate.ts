/* eslint-disable prettier/prettier */
import bcryptjs from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

type autenticateUseCaseRequest = {
  email: string
  password: string
}

type autenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ email, password }: autenticateUseCaseRequest): Promise<autenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }
    const { compare } = bcryptjs
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }
    return { user }
  }
}
