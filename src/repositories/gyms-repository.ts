import { Prisma, Gym } from '@prisma/client'

export type findManyNearbyParams = {
  latitude: number
  longitude: number
}
export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
}
