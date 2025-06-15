import { useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { useCarStore } from "../store/car_store"
import { CarCreator } from "@/modules/car/application/car_creator"
import { CarSupabaseRepository } from "@/modules/car/repository/car_supabase_repository"
import { Car } from "@/modules/car/domain/car"

export function useAddCars() {
  const { addCar } = useCarStore()

  const addNewCar = async (car: Car) => {
    const client = createClient()
    const carCreator = new CarCreator(new CarSupabaseRepository(client))
    const newCar = await carCreator.createCar(car)
    addCar(newCar)
  }

  return {
    addNewCar,
  }
}
