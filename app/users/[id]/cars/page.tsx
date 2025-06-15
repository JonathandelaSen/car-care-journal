import { CarGetter } from "@/modules/car/application/car_getter"
import { Car } from "@/modules/car/domain/car"
import { CarSupabaseRepository } from "@/modules/car/repository/car_supabase_repository"
import { CarList } from "@/sections/car/components/car_list"
import { createClient } from "@/utils/supabase/server"

type Props = {
  params: { id: string }
}

export default async function UserPage({ params }: Props) {
  const supabase = await createClient()
  const carGetter = new CarGetter(new CarSupabaseRepository(supabase))

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <CarList userId={params.id} />
    </div>
  )
}
