/* eslint-disable prettier/prettier */
import { CheckInsRepository } from '@/repositories/check-ins-repository'

type getUserMetricsUseCaseRequest = {
  userId: string
}

type getUserMetricsUseCaseResponse = {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({ userId }: getUserMetricsUseCaseRequest): Promise<getUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)
    return { checkInsCount }
  }
}
