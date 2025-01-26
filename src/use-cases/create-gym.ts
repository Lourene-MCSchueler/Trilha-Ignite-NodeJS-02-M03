/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type createGymUseCaseRequest = {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

type createGymUseCaseResponse = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ title, description, phone, latitude, longitude }: createGymUseCaseRequest): Promise<createGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })
    return { gym }
  }
}
