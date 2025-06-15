create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  year integer not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  owner_id uuid not null references public.users(id) on delete cascade,
  description text,
  image_url text
);

-- Trigger to auto-update the updated_at column
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_cars_updated_at
before update on cars
for each row
execute procedure update_updated_at_column();