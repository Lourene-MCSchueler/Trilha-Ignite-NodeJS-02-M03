import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from '@/use-cases/check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -22.910666,
      longitude: -43.2441294,
    })
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -22.910666,
      userLongitude: -43.2441294,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 11, 22, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -22.910666,
      userLongitude: -43.2441294,
    })
    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user_01',
        userLatitude: -22.910666,
        userLongitude: -43.2441294,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 11, 22, 8, 0, 0))
    await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -22.910666,
      userLongitude: -43.2441294,
    })

    vi.setSystemTime(new Date(2023, 11, 23, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user_01',
      userLatitude: -22.910666,
      userLongitude: -43.2441294,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-02',
      title: 'Javascript Gym',
      description: '',
      phone: '',
      latitude: -22.9180251,
      longitude: -43.246395,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user_01',
        userLatitude: -22.910666,
        userLongitude: -43.2441294,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
