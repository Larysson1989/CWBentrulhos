import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

const STATUS = ["novo", "confirmado", "entregue", "retirado", "cancelado"] as const;

interface Pedido {
  id: number; os: string; nome: string; telefone: string; endereco: string;
  endereco_entrega: string | null; qtd: number; total: number | null;
  data_entrega: string; periodo: string; observacoes: string | null;
  origem: string | null; status: string; created_at: string;
}

const brl = (v: number | null) =>
  v == null ? "—" : v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const dataBR = (d: string) => new Date(d.length === 10 ? d + "T12:00:00" : d).toLocaleDateString("pt-BR");

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return null;
  return session ? <Painel /> : <Login />;
}

function Login() {
  const [erro, setErro] = useState("");
  async function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")), password: String(f.get("senha")),
    });
    if (error) setErro("E-mail ou senha inválidos.");
  }
  return (
    <form onSubmit={entrar} className="min-h-screen flex flex-col gap-3 items-center justify-center bg-gray-50 p-4">
      <h1 className="font-black text-xl">CWB Entulhos · Painel</h1>
      <input name="email" type="email" required placeholder="E-mail" className="border rounded-xl px-4 py-3 w-full max-w-xs" />
      <input name="senha" type="password" required placeholder="Senha" className="border rounded-xl px-4 py-3 w-full max-w-xs" />
      <button className="bg-brand-yellow font-black rounded-xl py-3 w-full max-w-xs">Entrar</button>
      {erro && <p className="text-red-600 text-sm">{erro}</p>}
    </form>
  );
}

function Painel() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState("ativos");
  const [erro, setErro] = useState("");

  async function carregar() {
    // ponytail: sem paginação, só os 500 mais recentes; paginar quando passar disso.
    const { data, error } = await supabase.from("pedidos").select("*")
      .order("created_at", { ascending: false }).limit(500);
    if (error) setErro(error.message); else setPedidos(data as Pedido[]);
  }
  useEffect(() => { carregar(); }, []);

  async function mudarStatus(id: number, status: string) {
    const { error } = await supabase.from("pedidos").update({ status }).eq("id", id);
    if (error) return setErro(error.message);
    setPedidos((ps) => ps.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  const visiveis = pedidos.filter((p) =>
    filtro === "todos" ? true : filtro === "ativos" ? !["retirado", "cancelado"].includes(p.status) : p.status === filtro);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 text-gray-900">
      <header className="flex flex-wrap items-center gap-3 mb-6">
        <h1 className="font-black text-2xl flex-1">Pedidos</h1>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="border rounded-xl px-3 py-2">
          <option value="ativos">Ativos</option>
          <option value="todos">Todos</option>
          {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={carregar} className="border rounded-xl px-3 py-2">Atualizar</button>
        <button onClick={() => supabase.auth.signOut()} className="border rounded-xl px-3 py-2">Sair</button>
      </header>
      {erro && <p className="text-red-600 mb-4">{erro}</p>}
      {visiveis.length === 0 && <p className="text-gray-500">Nenhum pedido.</p>}
      <div className="grid gap-3">
        {visiveis.map((p) => (
          <article key={p.id} className="bg-white rounded-2xl border p-4 grid gap-1 text-sm">
            <div className="flex flex-wrap items-center gap-2">
              <strong className="flex-1">{p.os} · {p.nome}</strong>
              <select value={p.status} onChange={(e) => mudarStatus(p.id, e.target.value)}
                className="border rounded-lg px-2 py-1 font-semibold">
                {STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <a className="text-blue-700" href={`https://wa.me/55${p.telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{p.telefone}</a>
            <span>{p.qtd} tambor{p.qtd > 1 ? "es" : ""} · {brl(p.total)}</span>
            <span>Entrega: {dataBR(p.data_entrega)} ({p.periodo === "manha" ? "manhã" : "tarde"}) — {p.endereco_entrega ?? p.endereco}</span>
            {p.observacoes && <span className="text-gray-600">Obs: {p.observacoes}</span>}
            <span className="text-gray-400 text-xs">Recebido {new Date(p.created_at).toLocaleString("pt-BR")}{p.origem ? ` · origem: ${p.origem}` : ""}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
