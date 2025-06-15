import { SupabaseClient } from "@supabase/supabase-js"
import { Car } from "../domain/car"
import { CarRepository } from "../domain/car_repository"

export class CarSupabaseRepository implements CarRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getByOwnerId(ownerId: string): Promise<Car[]> {
    const { data, error } = await this.supabase
      .from("cars")
      .select("*")
      .eq("owner_id", ownerId)

    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  async getById(carId: string): Promise<Car | null> {
    const { data, error } = await this.supabase
      .from("cars")
      .select("*")
      .eq("id", carId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async create(car: Car): Promise<Car> {
    const { data, error } = await this.supabase
      .from("cars")
      .insert(this.toDb(car))
      .select("*")
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  async update(car: Car): Promise<Car> {
    const { data, error } = await this.supabase
      .from("cars")
      .update(car)
      .eq("id", car.id)
      .select("*")
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }
  async delete(carId: string): Promise<void> {
    const { error } = await this.supabase.from("cars").delete().eq("id", carId)

    if (error) {
      throw new Error(error.message)
    }
  }

  private toDb(car: Car): any {
    console.log("toDb", car)
    console.log({
      make: car.make,
      model: car.model,
      year: car.year,
      created_at: car.createdAt,
      updated_at: car.updatedAt,
      owner_id: car.ownerId,
      description: car.description,
      image_url: car.imageUrl,
    })
    return {
      make: car.make,
      model: car.model,
      year: car.year,
      created_at: car.createdAt,
      updated_at: car.updatedAt,
      owner_id: car.ownerId,
      description: car.description,
      image_url: car.imageUrl,
    }
  }
}
