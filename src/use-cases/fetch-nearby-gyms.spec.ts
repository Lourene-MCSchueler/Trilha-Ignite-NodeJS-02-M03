import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from '@/use-cases/fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch User CheckIns History Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -22.910666,
      longitude: -43.2441294,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -22.9276692,
      longitude: -43.3876876,
    })
    const { gyms } = await sut.execute({
      userLatitude: -22.9180251,
      userLongitude: -43.246395,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
