/* eslint-disable prettier/prettier */
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'

type checkInUseCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type checkInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) { }

  async execute({ userId, gymId, userLatitude, userLongitude }: checkInUseCaseRequest): Promise<checkInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }
    const distance = getDistanceBetweenCoordinates({ latitude: userLatitude, longitude: userLongitude }, { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() })
    const MAX_DISTANCE_IN_KILOMETERS = 0.1
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }
    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())
    if (checkInOnSameDay) {
      throw new MaxNumberOfCheckInsError()
    }
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId
    })
    return { checkIn }
  }
}
