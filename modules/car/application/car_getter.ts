import { CarRepository } from "../domain/car_repository"

export class CarGetter {
  constructor(private readonly carRepository: CarRepository) {}

  async getCarById(carId: string) {
    return await this.carRepository.getById(carId)
  }

  async getCarsByOwnerId(ownerId: string) {
    return await this.carRepository.getByOwnerId(ownerId)
  }
}
