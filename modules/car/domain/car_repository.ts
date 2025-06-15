import { Car } from "./car"

export interface CarRepository {
  getById: (carId: string) => Promise<Car | null>
  getByOwnerId: (ownerId: string) => Promise<Car[]>
  create: (car: Car) => Promise<Car>
  update: (car: Car) => Promise<Car>
  delete: (carId: string) => Promise<void>
}
