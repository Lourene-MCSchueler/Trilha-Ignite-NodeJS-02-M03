/* eslint-disable prettier/prettier */
import bcryptjs from 'bcryptjs'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

type registerUseCaseRequest = {
  name: string
  email: string
  password: string
}

type registerUseCaseResponse = {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, password }: registerUseCaseRequest): Promise<registerUseCaseResponse> {
    const { hash } = bcryptjs
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
