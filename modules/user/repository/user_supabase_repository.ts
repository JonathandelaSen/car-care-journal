import { SupabaseClient } from "@supabase/supabase-js"
import { UserRepository } from "../domain/user_repository"
import { User } from "../domain/user"

export class UserSupabaseRepository implements UserRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getAll(): Promise<User[]> {
    const { data, error } = await this.supabase.from("users").select("*")

    if (error) {
      throw new Error(error.message)
    }

    return data.map((user) => new User(user.id, user.name, user.email))
  }

  async getById(userId: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data ? new User(data.id, data.name, data.email) : null
  }
}
