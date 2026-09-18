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
- `src/OrderModal.tsx` — modal de pedido (busca CEP via ViaCEP, gera OS, envia para WhatsApp)
- `public/images/` — logo e foto do hero
