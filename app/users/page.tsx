import { UserGetter } from "@/modules/user/application/user_getter"
import { UserSupabaseRepository } from "@/modules/user/repository/user_supabase_repository"
import { UserList } from "@/sections/user/components/user_list"
import { createClient } from "@/utils/supabase/server"

export default async function ProtectedPage() {
  const supabase = await createClient()
  const userGetter = new UserGetter(new UserSupabaseRepository(supabase))
  const users = await userGetter.getAllUsers()

  console.log(users)
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <UserList users={users} />
    </div>
  )
}
