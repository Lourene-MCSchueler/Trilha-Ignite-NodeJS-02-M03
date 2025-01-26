/* eslint-disable prettier/prettier */
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

type searchGymsUseCaseRequest = {
  query: string
  page: number
}

type searchGymsUseCaseResponse = {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) { }

  async execute({ query, page }: searchGymsUseCaseRequest): Promise<searchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
