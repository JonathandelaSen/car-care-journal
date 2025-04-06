import { User } from "./user"

export interface UserRepository {
  getAll: () => Promise<User[]>
  getById: (userId: string) => Promise<User | null>
}
