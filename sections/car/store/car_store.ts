import { Car } from "@/modules/car/domain/car"
import { create } from "zustand"

type CarStore = {
  cars: Car[]
  setCars: (cars: Car[]) => void
  addCar: (car: Car) => void
}

export const useCarStore = create<CarStore>((set) => ({
  cars: [],
  setCars: (cars) => set({ cars }),
  addCar: (car) => set((state) => ({ cars: [...state.cars, car] })),
}))
