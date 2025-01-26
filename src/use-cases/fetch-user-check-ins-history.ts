/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

type fetchUserCheckInsHistoryUseCaseRequest = {
  userId: string
  page: number
}

type fetchUserCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({ userId, page }: fetchUserCheckInsHistoryUseCaseRequest): Promise<fetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)
    return { checkIns }
  }
}
