import { User } from "@/modules/user/domain/user"
import { useUserStore } from "../store/user_store"
import { useEffect } from "react"
import { UserGetter } from "@/modules/user/application/user_getter"
import { UserSupabaseRepository } from "@/modules/user/repository/user_supabase_repository"
import { createClient } from "@/utils/supabase/client"

export function useUsers(initialUsers?: User[]) {
  const { users, setUsers, addUser } = useUserStore()

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0) {
      setUsers(initialUsers)
    }
  }, [initialUsers, setUsers])

  useEffect(() => {
    const client = createClient()
    const userGetter = new UserGetter(new UserSupabaseRepository(client))
    userGetter.getAllUsers().then(setUsers)
  }, [initialUsers])

  return {
    users,
    setUsers,
    addUser,
  }
}
