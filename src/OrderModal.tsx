import { useState } from "react";
import { X, Loader2, CheckCircle2, MapPin, User, Package, MessageCircle, Phone, Calendar, Clock, FileText } from "lucide-react";

// ─── Tipos ───────────────────────────────────────────────────────────────────
interface OrderData {
  qtd: number;
  dias: number;
  express: boolean;
  total: number;
  totalFmt: string;
  servicoLabel: string;
}

interface Address {
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface Props {
  order: OrderData;
  onClose: () => void;
}

const OWNER_WHATSAPP = "5541997015424";
const HORA_ABERTURA = 8;
const HORA_FECHAMENTO = 17;

function generateOS(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const seq = Math.floor(Math.random() * 90000) + 10000;
  return `OS-${y}${m}${d}-${seq}`;
}

function maskCep(v: string) {
  return v.replace(/\D/g, "").slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  return d.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
}

// ── Calcula previsão de entrega considerando horário comercial ────────────────
function calcPrevisao(express: boolean): { data: Date; label: string } {
  const now = new Date();
  const horasUteis = express ? 12 : 24;
  let restante = horasUteis;
  const cur = new Date(now);

  while (restante > 0) {
    const diaSemana = cur.getDay(); // 0=dom, 6=sab
    const hora = cur.getHours();

    // Pula fim de semana
    if (diaSemana === 0 || diaSemana === 6) {
      cur.setDate(cur.getDate() + 1);
      cur.setHours(HORA_ABERTURA, 0, 0, 0);
      continue;
    }

    // Fora do horário comercial → avança para próximo dia útil
    if (hora >= HORA_FECHAMENTO) {
      cur.setDate(cur.getDate() + 1);
      cur.setHours(HORA_ABERTURA, 0, 0, 0);
      continue;
    }
    if (hora < HORA_ABERTURA) {
      cur.setHours(HORA_ABERTURA, 0, 0, 0);
      continue;
    }

    // Horas disponíveis hoje
    const dispHoje = HORA_FECHAMENTO - cur.getHours();
    if (restante <= dispHoje) {
      cur.setHours(cur.getHours() + restante);
      restante = 0;
    } else {
      restante -= dispHoje;
      cur.setDate(cur.getDate() + 1);
      cur.setHours(HORA_ABERTURA, 0, 0, 0);
    }
  }

  const dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  const label = `${dias[cur.getDay()]}, ${cur.toLocaleDateString("pt-BR")} às ${String(cur.getHours()).padStart(2, "0")}h`;
  return { data: cur, label };
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function OrderModal({ order, onClose }: Props) {
  const [step, setStep] = useState<"form" | "processing" | "done">("form");

  // Dados pessoais
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [descricao, setDescricao] = useState("");

  // Endereço de cobrança
  const [cep, setCep] = useState("");
  const [addr, setAddr] = useState<Address>({ logradouro: "", bairro: "", cidade: "", uf: "" });
  const [numero, setNumero] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");

  // Endereço de entrega
  const [mesmoEnd, setMesmoEnd] = useState(true);
  const [entCep, setEntCep] = useState("");
  const [entAddr, setEntAddr] = useState<Address>({ logradouro: "", bairro: "", cidade: "", uf: "" });
  const [entNumero, setEntNumero] = useState("");
  const [entCepLoading, setEntCepLoading] = useState(false);
  const [entCepError, setEntCepError] = useState("");

  // Entrega agendada
  const previsao = calcPrevisao(order.express);
  const minDate = previsao.data.toISOString().split("T")[0];
  const [dataEntrega, setDataEntrega] = useState(minDate);
  const [periodo, setPeriodo] = useState<"manha" | "tarde">("manha");

  // OS
  const [osCode, setOsCode] = useState("");

  // ── Busca CEP ─────────────────────────────────────────────────────────────
  async function fetchCep(value: string, isEntrega = false) {
    const clean = value.replace(/\D/g, "");
    if (clean.length !== 8) return;
    isEntrega ? setEntCepLoading(true) : setCepLoading(true);
    isEntrega ? setEntCepError("") : setCepError("");
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      const data = await res.json();
      if (data.erro) {
        isEntrega ? setEntCepError("CEP não encontrado.") : setCepError("CEP não encontrado.");
        return;
      }
      const parsed: Address = {
        logradouro: data.logradouro || "",
        bairro:     data.bairro     || "",
        cidade:     data.localidade || "",
        uf:         data.uf         || "",
      };
      isEntrega ? setEntAddr(parsed) : setAddr(parsed);
    } catch {
      isEntrega ? setEntCepError("Erro ao buscar CEP.") : setCepError("Erro ao buscar CEP.");
    } finally {
      isEntrega ? setEntCepLoading(false) : setCepLoading(false);
    }
  }

  // ── Validação ─────────────────────────────────────────────────────────────
  function isFormValid() {
    if (!nome.trim()) return false;
    if (telefone.replace(/\D/g, "").length < 10) return false;
    if (cep.replace(/\D/g, "").length !== 8) return false;
    if (!addr.logradouro) return false;
    if (!numero.trim()) return false;
    if (!mesmoEnd) {
      if (entCep.replace(/\D/g, "").length !== 8) return false;
      if (!entAddr.logradouro) return false;
      if (!entNumero.trim()) return false;
    }
    if (!dataEntrega) return false;
    return true;
  }

  // ── Confirmar pedido ──────────────────────────────────────────────────────
  async function handleConfirm() {
    if (!isFormValid()) return;
    const os = generateOS();
    setOsCode(os);
    setStep("processing");

    const periodoLabel = periodo === "manha" ? "Manhã (08h–12h)" : "Tarde (13h–17h)";
    const entEndStr = mesmoEnd
      ? `${addr.logradouro}, ${numero} — ${addr.bairro}, ${addr.cidade}/${addr.uf}`
      : `${entAddr.logradouro}, ${entNumero} — ${entAddr.bairro}, ${entAddr.cidade}/${entAddr.uf}`;

    const msg = [
      `🧾 *NOVO PEDIDO - ${os}*`,
      ``,
      `👤 *Cliente:* ${nome}`,
      `📱 *Telefone:* ${telefone}`,
      `📍 *End. cobrança:* ${addr.logradouro}, ${numero} — ${addr.bairro}, ${addr.cidade}/${addr.uf} — CEP ${cep}`,
      mesmoEnd ? `🚛 *Entrega:* Mesmo endereço` : `🚛 *End. entrega:* ${entEndStr}`,
      ``,
      `📦 *Serviço:* ${order.servicoLabel}`,
      `🪣 *Tambores:* ${order.qtd}`,
      `📅 *Período:* ${order.dias} dia${order.dias > 1 ? "s" : ""}`,
      `💰 *Total:* ${order.totalFmt}`,
      ``,
      `🗓️ *Entrega desejada:* ${new Date(dataEntrega + "T12:00:00").toLocaleDateString("pt-BR")} — ${periodoLabel}`,
      `⏱️ *Previsão mínima:* ${previsao.label}`,
      descricao.trim() ? `\n📝 *Observações:* ${descricao.trim()}` : "",
    ].filter(Boolean).join("\n");

    await new Promise((r) => setTimeout(r, 2000));
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    setStep("done");
  }

  // ── Impressão OS ─────────────────────────────────────────────────────────
  function handlePrint() {
    const periodoLabel = periodo === "manha" ? "Manhã (08h–12h)" : "Tarde (13h–17h)";
    const entEndStr = mesmoEnd
      ? `${addr.logradouro}, ${numero} — ${addr.bairro}, ${addr.cidade}/${addr.uf}`
      : `${entAddr.logradouro}, ${entNumero} — ${entAddr.bairro}, ${entAddr.cidade}/${entAddr.uf}`;

    const printContent = `
      <html>
      <head>
        <title>OS ${osCode}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 48px; color: #111; max-width: 720px; margin: 0 auto; }
          h1 { color: #1a1a1a; border-bottom: 3px solid #f5a623; padding-bottom: 12px; font-size: 24px; }
          .badge { background: #f5a623; color: #000; padding: 4px 14px; border-radius: 99px; font-size: 13px; font-weight: bold; display: inline-block; margin: 12px 0 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; }
          td { padding: 12px 8px; border-bottom: 1px solid #eee; font-size: 14px; }
          td:first-child { font-weight: bold; width: 180px; color: #666; }
          .total-row td { border-top: 2px solid #f5a623; padding-top: 16px; }
          .total-val { font-size: 24px; font-weight: 900; color: #1a1a1a; }
          .obs { background: #fffbf0; border: 1px solid #f5a623; border-radius: 8px; padding: 12px 16px; margin-top: 24px; font-size: 13px; color: #555; }
          footer { margin-top: 56px; font-size: 12px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 16px; }
        </style>
      </head>
      <body>
        <h1>CWB Entulhos — Ordem de Serviço</h1>
        <div class="badge">${osCode}</div>
        <table>
          <tr><td>Cliente</td><td>${nome}</td></tr>
          <tr><td>Telefone</td><td>${telefone}</td></tr>
          <tr><td>End. cobrança</td><td>${addr.logradouro}, ${numero} — ${addr.bairro}, ${addr.cidade}/${addr.uf} — CEP ${cep}</td></tr>
          <tr><td>End. entrega</td><td>${entEndStr}</td></tr>
          ${!mesmoEnd ? `<tr><td>CEP entrega</td><td>${entCep}</td></tr>` : ""}
          <tr><td>Serviço</td><td>${order.servicoLabel}</td></tr>
          <tr><td>Tambores</td><td>${order.qtd}</td></tr>
          <tr><td>Período</td><td>${order.dias} dia${order.dias > 1 ? "s" : ""}</td></tr>
          <tr><td>Entrega desejada</td><td>${new Date(dataEntrega + "T12:00:00").toLocaleDateString("pt-BR")} — ${periodoLabel}</td></tr>
          <tr><td>Previsão mínima</td><td>${previsao.label}</td></tr>
          <tr class="total-row"><td>Total estimado</td><td class="total-val">${order.totalFmt}</td></tr>
        </table>
        ${descricao.trim() ? `<div class="obs"><strong>Observações:</strong><br/>${descricao.trim()}</div>` : ""}
        <footer>Documento gerado em ${new Date().toLocaleString("pt-BR")} · CWB Entulhos · (41) 99701-5424</footer>
      </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (win) { win.document.write(printContent); win.document.close(); win.print(); }
  }

  // ── CSS helper ────────────────────────────────────────────────────────────
  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-brand-yellow transition-colors";
  const readonlyCls = "w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500";
  const labelCls = "text-xs font-semibold text-gray-500 mb-1 block";

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === "form" ? onClose : undefined}
      />

      {/* ── PROCESSANDO ── */}
      {step === "processing" && (
        <div className="relative z-10 bg-brand-dark rounded-3xl p-12 flex flex-col items-center gap-6 text-white text-center max-w-sm w-full shadow-2xl">
          <Loader2 className="w-16 h-16 text-brand-yellow animate-spin" />
          <div>
            <h3 className="text-xl font-black mb-2">Processando seu pedido…</h3>
            <p className="text-white/60 text-sm">Aguarde enquanto preparamos tudo para você.</p>
          </div>
        </div>
      )}

      {/* ── CONCLUÍDO ── */}
      {step === "done" && (
        <div className="relative z-10 bg-white rounded-3xl p-10 flex flex-col items-center gap-6 text-center max-w-sm w-full shadow-2xl text-gray-900">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
          <div>
            <h3 className="text-2xl font-black text-brand-dark mb-1">Pedido enviado!</h3>
            <p className="text-gray-500 text-sm">
              Sua OS <span className="font-bold text-brand-dark">{osCode}</span> foi gerada.
              Nossa equipe entrará em contato em breve.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button onClick={handlePrint} className="w-full bg-brand-yellow text-brand-dark py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all">
              📄 Baixar / Imprimir OS
            </button>
            <button onClick={onClose} className="w-full border border-gray-200 text-gray-500 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all">
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* ── FORMULÁRIO ── */}
      {step === "form" && (
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-gray-900">

          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between z-10">
            <div>
              <h2 className="font-display text-xl font-black text-brand-dark">Fazer Pedido</h2>
              <p className="text-xs text-gray-400 mt-0.5">Preencha os dados para finalizar sua locação</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-brand-dark transition-colors p-2">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-8 py-6 flex flex-col gap-8">

            {/* ── DADOS PESSOAIS ── */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-4 h-4 text-brand-yellow" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Dados pessoais</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={labelCls}>Nome completo *</label>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className={inputCls}
                  />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Telefone / WhatsApp *</span>
                  </label>
                  <input
                    value={telefone}
                    onChange={(e) => setTelefone(maskPhone(e.target.value))}
                    placeholder="(41) 99999-9999"
                    maxLength={15}
                    className={inputCls}
                  />
                </div>
              </div>
            </section>

            {/* ── ENDEREÇO DE COBRANÇA ── */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-brand-yellow" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Endereço de cobrança</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>CEP *</label>
                  <div className="relative">
                    <input
                      value={cep}
                      onChange={(e) => {
                        const v = maskCep(e.target.value);
                        setCep(v); setCepError("");
                        if (v.replace(/\D/g, "").length === 8) fetchCep(v);
                      }}
                      placeholder="00000-000"
                      maxLength={9}
                      className={`${inputCls} ${cepError ? "border-red-400" : ""}`}
                    />
                    {cepLoading && <Loader2 className="absolute right-3 top-3.5 w-4 h-4 animate-spin text-gray-400" />}
                  </div>
                  {cepError && <p className="text-xs text-red-500 mt-1">{cepError}</p>}
                </div>
                <div>
                  <label className={labelCls}>Número *</label>
                  <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Ex: 123" className={inputCls} />
                </div>
                <div className="col-span-2">
                  <label className={labelCls}>Logradouro</label>
                  <input value={addr.logradouro} readOnly placeholder="Preenchido automaticamente via CEP" className={readonlyCls} />
                </div>
                <div>
                  <label className={labelCls}>Bairro</label>
                  <input value={addr.bairro} readOnly placeholder="—" className={readonlyCls} />
                </div>
                <div>
                  <label className={labelCls}>Cidade / UF</label>
                  <input value={addr.cidade ? `${addr.cidade} / ${addr.uf}` : ""} readOnly placeholder="—" className={readonlyCls} />
                </div>
              </div>
            </section>

            {/* ── LOCAL DE ENTREGA ── */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-4 h-4 text-brand-yellow" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Local de entrega</h3>
              </div>
              <div
                onClick={() => setMesmoEnd(!mesmoEnd)}
                className={`flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 transition-all mb-4 ${
                  mesmoEnd ? "border-brand-yellow bg-amber-50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-colors ${mesmoEnd ? "bg-brand-yellow border-brand-yellow" : "border-gray-300"}`}>
                  {mesmoEnd && <span className="text-white text-xs font-black">✓</span>}
                </div>
                <span className="text-sm font-semibold text-brand-dark">Mesmo endereço de cobrança</span>
              </div>

              {!mesmoEnd && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>CEP de entrega *</label>
                    <div className="relative">
                      <input
                        value={entCep}
                        onChange={(e) => {
                          const v = maskCep(e.target.value);
                          setEntCep(v); setEntCepError("");
                          if (v.replace(/\D/g, "").length === 8) fetchCep(v, true);
                        }}
                        placeholder="00000-000"
                        maxLength={9}
                        className={`${inputCls} ${entCepError ? "border-red-400" : ""}`}
                      />
                      {entCepLoading && <Loader2 className="absolute right-3 top-3.5 w-4 h-4 animate-spin text-gray-400" />}
                    </div>
                    {entCepError && <p className="text-xs text-red-500 mt-1">{entCepError}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Número *</label>
                    <input value={entNumero} onChange={(e) => setEntNumero(e.target.value)} placeholder="Ex: 456" className={inputCls} />
                  </div>
                  <div className="col-span-2">
                    <label className={labelCls}>Logradouro</label>
                    <input value={entAddr.logradouro} readOnly placeholder="Preenchido automaticamente via CEP" className={readonlyCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Bairro</label>
                    <input value={entAddr.bairro} readOnly placeholder="—" className={readonlyCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Cidade / UF</label>
                    <input value={entAddr.cidade ? `${entAddr.cidade} / ${entAddr.uf}` : ""} readOnly placeholder="—" className={readonlyCls} />
                  </div>
                </div>
              )}
            </section>

            {/* ── PREVISÃO DE ENTREGA ── */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-brand-yellow" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Previsão de entrega</h3>
              </div>

              {/* Banner de previsão automática */}
              <div className="bg-amber-50 border border-brand-yellow/30 rounded-xl px-4 py-3 mb-4 flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-brand-dark">
                    Previsão mínima ({order.express ? "Express — 12h úteis" : "Convencional — 24h úteis"})
                  </p>
                  <p className="text-sm font-black text-brand-dark mt-0.5">{previsao.label}</p>
                  <p className="text-[11px] text-gray-400 mt-1">Horário comercial: seg–sex, 08h às 17h</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Data desejada *</label>
                  <input
                    type="date"
                    value={dataEntrega}
                    min={minDate}
                    onChange={(e) => setDataEntrega(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Período *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: "manha" as const, label: "Manhã", sub: "08h–12h" },
                      { val: "tarde" as const, label: "Tarde",  sub: "13h–17h" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setPeriodo(opt.val)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          periodo === opt.val
                            ? "border-brand-yellow bg-amber-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="block text-xs font-bold text-brand-dark">{opt.label}</span>
                        <span className="block text-[10px] text-gray-400">{opt.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── DESCRIÇÃO / OBSERVAÇÕES ── */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-brand-yellow" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Observações</h3>
              </div>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex: Portão azul, ligar antes de chegar, entulho de reforma..."
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:border-brand-yellow transition-colors resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{descricao.length}/300 caracteres</p>
            </section>

            {/* ── RESUMO DO PEDIDO ── */}
            <section className="bg-brand-dark rounded-2xl p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Resumo do pedido</span>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { label: "Serviço",  val: order.servicoLabel },
                  { label: "Tambores", val: `${order.qtd} tambor${order.qtd > 1 ? "es" : ""}` },
                  { label: "Período",  val: `${order.dias} dia${order.dias > 1 ? "s" : ""}` },
                  { label: "Entrega",  val: dataEntrega ? `${new Date(dataEntrega + "T12:00:00").toLocaleDateString("pt-BR")} — ${periodo === "manha" ? "Manhã" : "Tarde"}` : "—" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-white/50 font-semibold uppercase text-[11px] tracking-wider">{row.label}</span>
                    <span className="text-white/90 font-semibold">{row.val}</span>
                  </div>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between items-baseline">
                  <span className="text-white/50 font-semibold uppercase text-[11px] tracking-wider">Total</span>
                  <span className="text-brand-yellow font-black text-2xl">{order.totalFmt}</span>
                </div>
              </div>
            </section>

            {/* ── BOTÃO CONFIRMAR ── */}
            <button
              onClick={handleConfirm}
              disabled={!isFormValid()}
              className="w-full bg-brand-yellow text-brand-dark py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 hover:bg-yellow-400 active:scale-[0.98] transition-all shadow-lg shadow-brand-yellow/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <MessageCircle size={18} />
              Confirmar Pedido
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
