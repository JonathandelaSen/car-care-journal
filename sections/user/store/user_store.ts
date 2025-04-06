import { User } from "@/modules/user/domain/user"
import { create } from "zustand"

type UserStore = {
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: User) => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}))
