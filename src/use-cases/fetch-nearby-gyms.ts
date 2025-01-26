/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type fetchNearbyGymsUseCaseRequest = {
  userLatitude: number
  userLongitude: number
}

type fetchNearbyGymsUseCaseResponse = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ userLatitude, userLongitude }: fetchNearbyGymsUseCaseRequest): Promise<fetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude })
    return { gyms }
  }
}
