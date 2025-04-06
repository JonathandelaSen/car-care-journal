import { UserRepository } from "../domain/user_repository"

export class UserGetter {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.getAll()
  }

  async getUserById(userId: string) {
    return await this.userRepository.getById(userId)
  }
}
