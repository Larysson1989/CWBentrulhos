-- Pedidos do site + painel admin.
-- Anônimo só insere; admins (e-mails na tabela admins) leem e atualizam status.

create table public.admins (email text primary key);
alter table public.admins enable row level security;
-- sem policies: ninguém lê/escreve via API; gerencie pelo SQL editor.

create table public.pedidos (
  id bigint generated always as identity primary key,
  os text not null unique check (length(os) <= 30),
  nome text not null check (length(nome) between 1 and 120),
  telefone text not null check (length(telefone) between 10 and 20),
  cep text not null check (cep ~ '^\d{5}-?\d{3}$'),
  endereco text not null check (length(endereco) <= 300),
  endereco_entrega text check (length(endereco_entrega) <= 300),
  qtd int not null check (qtd between 1 and 5),
  total numeric(10,2),
  data_entrega date not null,
  periodo text not null check (periodo in ('manha','tarde')),
  observacoes text check (length(observacoes) <= 300),
  origem text check (length(origem) <= 200),
  status text not null default 'novo'
    check (status in ('novo','confirmado','entregue','retirado','cancelado')),
  created_at timestamptz not null default now()
);

-- Preço vem do servidor, não do navegador (tabela real: 1=140, 2=200, 3=270, 4=320, 5=350).
create function public.pedidos_set_total() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    new.total := (array[140,200,270,320,350])[new.qtd];
    new.status := 'novo';
    new.created_at := now();
  end if;
  return new;
end $$;

create trigger pedidos_set_total before insert on public.pedidos
for each row execute function public.pedidos_set_total();

-- Schema fora da API pública: a função não fica exposta em /rpc.
create schema if not exists private;
grant usage on schema private to authenticated;

create function private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.admins where email = (auth.jwt() ->> 'email'))
$$;
revoke execute on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

alter table public.pedidos enable row level security;

create policy "site insere pedido" on public.pedidos
  for insert to anon, authenticated with check (data_entrega >= current_date);

create policy "admin lê" on public.pedidos
  for select to authenticated using (private.is_admin());

create policy "admin atualiza" on public.pedidos
  for update to authenticated using (private.is_admin()) with check (private.is_admin());

-- Admin só pode mudar status pela API.
revoke update on public.pedidos from anon, authenticated;
grant update (status) on public.pedidos to authenticated;
