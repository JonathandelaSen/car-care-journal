import { UserGetter } from "@/modules/user/application/user_getter"
import { UserSupabaseRepository } from "@/modules/user/repository/user_supabase_repository"
import { UserList } from "@/sections/user/components/user_list"
import { createClient } from "@/utils/supabase/server"

type Props = {
  params: { id: string }
}

export default async function UserPage({ params }: Props) {
  const supabase = await createClient()
  const userGetter = new UserGetter(new UserSupabaseRepository(supabase))
  const user = await userGetter.getUserById(params.id)

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      {JSON.stringify(user, null, 2)}
    </div>
  )
}
