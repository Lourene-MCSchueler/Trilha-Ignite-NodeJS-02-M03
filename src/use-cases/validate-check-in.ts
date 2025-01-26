/* eslint-disable prettier/prettier */
import dayjs from 'dayjs'
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error'

type validateCheckInUseCaseRequest = {
  checkInId: string
}

type validateCheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({ checkInId }: validateCheckInUseCaseRequest): Promise<validateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at, 'minutes'
    )
    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }
    checkIn.validated_at = new Date()
    await this.checkInsRepository.save(checkIn)
    return { checkIn }
  }
}
