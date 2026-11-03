import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Painel em /#admin (hash funciona em qualquer hospedagem estática, sem rewrite).
const Admin = lazy(() => import('./Admin.tsx'));
// Links de convite/recuperação do Supabase voltam com #access_token=...&type=invite|recovery.
const isAdmin = location.hash === '#admin' || /type=(invite|recovery)/.test(location.hash);
addEventListener('hashchange', () => { if ((location.hash === '#admin') !== isAdmin) location.reload(); });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <Suspense><Admin /></Suspense> : <App />}
  </StrictMode>,
);
