import { useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { useCarStore } from "../store/car_store"
import { CarGetter } from "@/modules/car/application/car_getter"
import { CarSupabaseRepository } from "@/modules/car/repository/car_supabase_repository"
import { Car } from "@/modules/car/domain/car"

export function useCars(ownerId: string) {
  const { cars, setCars } = useCarStore()

  useEffect(() => {
    setCars([])
  }, [setCars])

  useEffect(() => {
    const client = createClient()
    const userGetter = new CarGetter(new CarSupabaseRepository(client))
    userGetter.getCarsByOwnerId(ownerId).then(setCars)
  }, [])

  return {
    cars,
  }
}
