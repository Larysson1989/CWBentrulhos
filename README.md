# CWB Entulhos

Landing page de locação de tambores para entulho em Curitiba (React + Vite + Tailwind).

## Rodar localmente

**Pré-requisito:** Node.js

```
npm install
npm run dev
```

Abre em `http://localhost:3000`.

## Build de produção

```
npm run build
npm run preview
```

## Estrutura

- `src/App.tsx` — página inteira (navbar, hero, serviços, simulador de preços, depoimentos, cobertura, FAQ, footer)
- `src/OrderModal.tsx` — modal de pedido (ViaCEP, gera OS, grava no Supabase, envia para WhatsApp)
- `src/Admin.tsx` — painel de pedidos (`/#admin`)
- `public/images/` — logo e foto do hero

## Pedidos e painel (Supabase)

1. Crie um projeto Supabase e rode `supabase/migrations/001_pedidos.sql` no SQL Editor.
2. Copie `.env.example` para `.env` com a URL e a publishable key do projeto (no deploy, as mesmas variáveis no host).
3. Em Authentication → Users, crie o usuário admin (e desative "Allow new users to sign up").
4. Libere o e-mail: `insert into admins values ('larysson.lara@gmail.com');`
5. Painel em `/#admin`.

Cada pedido do site é gravado em `pedidos` (o preço é calculado no banco) e também abre o WhatsApp. Se o banco falhar, o WhatsApp abre do mesmo jeito.
