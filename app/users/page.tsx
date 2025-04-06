import { UserGetter } from "@/modules/user/application/user_getter"
import { UserSupabaseRepository } from "@/modules/user/repository/user_supabase_repository"
import { createClient } from "@/utils/supabase/server"

export default async function ProtectedPage() {
  const supabase = await createClient()
  const userGetter = new UserGetter(new UserSupabaseRepository(supabase))
  const users = await userGetter.getAllUsers()

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(users, null, 2)}
        </pre>
      </div>
    </div>
  )
}
