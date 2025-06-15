import { Car } from "../domain/car"
import { CarRepository } from "../domain/car_repository"

export class CarCreator {
  constructor(private readonly carRepository: CarRepository) {}

  async createCar(car: Car) {
    return await this.carRepository.create(car)
  }

  async updateCar(car: Car) {
    return await this.carRepository.update(car)
  }

  async deleteCar(carId: string) {
    return await this.carRepository.delete(carId)
  }
}
