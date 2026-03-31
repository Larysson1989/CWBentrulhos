import { useState } from "react";
import { X, Loader2, CheckCircle2, MapPin, User, Package, MessageCircle } from "lucide-react";

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

// ─── Constantes ──────────────────────────────────────────────────────────────
const OWNER_WHATSAPP = "5541997015424";

function generateOS(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const seq = Math.floor(Math.random() * 90000) + 10000;
  return `OS-${y}${m}${d}-${seq}`;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function OrderModal({ order, onClose }: Props) {
  const [step, setStep] = useState<"form" | "processing" | "done">("form");

  // Dados pessoais
  const [nome, setNome] = useState("");
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

  // OS gerada
  const [osCode, setOsCode] = useState("");

  // ── Busca CEP via ViaCEP ───────────────────────────────────────────────────
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

  function maskCep(v: string) {
    return v.replace(/\D/g, "").slice(0, 8).replace(/^(\d{5})(\d)/, "$1-$2");
  }

  // ── Validação ─────────────────────────────────────────────────────────────
  function isFormValid() {
    if (!nome.trim()) return false;
    if (cep.replace(/\D/g, "").length !== 8) return false;
    if (!addr.logradouro) return false;
    if (!numero.trim()) return false;
    if (!mesmoEnd) {
      if (entCep.replace(/\D/g, "").length !== 8) return false;
      if (!entAddr.logradouro) return false;
      if (!entNumero.trim()) return false;
    }
    return true;
  }

  // ── Confirmar pedido ──────────────────────────────────────────────────────
  async function handleConfirm() {
    if (!isFormValid()) return;
    const os = generateOS();
    setOsCode(os);
    setStep("processing");

    const msg = [
      `🧾 *NOVO PEDIDO - ${os}*`,
      ``,
      `👤 *Cliente:* ${nome}`,
      `📍 *Endereço cobrança:* ${addr.logradouro}, ${numero} — ${addr.bairro}, ${addr.cidade}/${addr.uf} — CEP ${cep}`,
      mesmoEnd
        ? `🚛 *Entrega:* Mesmo endereço`
        : `🚛 *Entrega:* ${entAddr.logradouro}, ${entNumero} — ${entAddr.bairro}, ${entAddr.cidade}/${entAddr.uf} — CEP ${entCep}`,
      ``,
      `📦 *Serviço:* ${order.servicoLabel}`,
      `🪣 *Tambores:* ${order.qtd}`,
      `📅 *Período:* ${order.dias} dia${order.dias > 1 ? "s" : ""}`,
      `💰 *Total:* ${order.totalFmt}`,
    ].join("\n");

    await new Promise((r) => setTimeout(r, 2000));
    window.open(
      `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setStep("done");
  }

  // ── Gerar PDF / imprimir OS ───────────────────────────────────────────────
  function handlePrint() {
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
          footer { margin-top: 56px; font-size: 12px; color: #aaa; text-align: center; border-top: 1px solid #eee; padding-top: 16px; }
        </style>
      </head>
      <body>
        <h1>CWB Entulhos — Ordem de Serviço</h1>
        <div class="badge">${osCode}</div>
        <table>
          <tr><td>Cliente</td><td>${nome}</td></tr>
          <tr><td>End. cobrança</td><td>${addr.logradouro}, ${numero} — ${addr.bairro}, ${addr.cidade}/${addr.uf}</td></tr>
          <tr><td>CEP cobrança</td><td>${cep}</td></tr>
          <tr><td>End. entrega</td><td>${entEndStr}</td></tr>
          ${!mesmoEnd ? `<tr><td>CEP entrega</td><td>${entCep}</td></tr>` : ""}
          <tr><td>Serviço</td><td>${order.servicoLabel}</td></tr>
          <tr><td>Tambores</td><td>${order.qtd}</td></tr>
          <tr><td>Período</td><td>${order.dias} dia${order.dias > 1 ? "s" : ""}</td></tr>
          <tr class="total-row"><td>Total estimado</td><td class="total-val">${order.totalFmt}</td></tr>
        </table>
        <footer>Documento gerado em ${new Date().toLocaleString("pt-BR")} · CWB Entulhos · (41) 99701-5424</footer>
      </body>
      </html>
    `;
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(printContent);
      win.document.close();
      win.print();
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === "form" ? onClose : undefined}
      />

      {/* ── OVERLAY: PROCESSANDO ── */}
      {step === "processing" && (
        <div className="relative z-10 bg-brand-dark rounded-3xl p-12 flex flex-col items-center gap-6 text-white text-center max-w-sm w-full shadow-2xl">
          <Loader2 className="w-16 h-16 text-brand-yellow animate-spin" />
          <div>
            <h3 className="text-xl font-black mb-2">Processando seu pedido…</h3>
            <p className="text-white/60 text-sm">Aguarde enquanto preparamos tudo para você.</p>
          </div>
        </div>
      )}

      {/* ── OVERLAY: CONCLUÍDO ── */}
      {step === "done" && (
        <div className="relative z-10 bg-white rounded-3xl p-10 flex flex-col items-center gap-6 text-center max-w-sm w-full shadow-2xl">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
          <div>
            <h3 className="text-2xl font-black text-brand-dark mb-1">Pedido enviado!</h3>
            <p className="text-gray-500 text-sm">
              Sua OS <span className="font-bold text-brand-dark">{osCode}</span> foi gerada com sucesso.
              Nossa equipe entrará em contato em breve.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handlePrint}
              className="w-full bg-brand-yellow text-brand-dark py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all"
            >
              📄 Baixar / Imprimir OS
            </button>
            <button
              onClick={onClose}
              className="w-full border border-gray-200 text-gray-500 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* ── FORMULÁRIO PRINCIPAL ── */}
      {step === "form" && (
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

          {/* Header fixo */}
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
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Nome completo *</label>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow transition-colors"
                />
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
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">CEP *</label>
                  <div className="relative">
                    <input
                      value={cep}
                      onChange={(e) => {
                        const v = maskCep(e.target.value);
                        setCep(v);
                        setCepError("");
                        if (v.replace(/\D/g, "").length === 8) fetchCep(v);
                      }}
                      placeholder="00000-000"
                      maxLength={9}
                      className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow transition-colors ${
                        cepError ? "border-red-400" : "border-gray-200"
                      }`}
                    />
                    {cepLoading && (
                      <Loader2 className="absolute right-3 top-3.5 w-4 h-4 animate-spin text-gray-400" />
                    )}
                  </div>
                  {cepError && <p className="text-xs text-red-500 mt-1">{cepError}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Número *</label>
                  <input
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    placeholder="Ex: 123"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow transition-colors"
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Logradouro</label>
                  <input
                    value={addr.logradouro}
                    readOnly
                    placeholder="Preenchido automaticamente via CEP"
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Bairro</label>
                  <input
                    value={addr.bairro}
                    readOnly
                    placeholder="—"
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 mb-1 block">Cidade / UF</label>
                  <input
                    value={addr.cidade ? `${addr.cidade} / ${addr.uf}` : ""}
                    readOnly
                    placeholder="—"
                    className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500"
                  />
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
                  mesmoEnd
                    ? "border-brand-yellow bg-amber-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-colors ${
                    mesmoEnd ? "bg-brand-yellow border-brand-yellow" : "border-gray-300"
                  }`}
                >
                  {mesmoEnd && <span className="text-white text-xs font-black">✓</span>}
                </div>
                <span className="text-sm font-semibold text-brand-dark">
                  Mesmo endereço de cobrança
                </span>
              </div>

              {!mesmoEnd && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">CEP de entrega *</label>
                    <div className="relative">
                      <input
                        value={entCep}
                        onChange={(e) => {
                          const v = maskCep(e.target.value);
                          setEntCep(v);
                          setEntCepError("");
                          if (v.replace(/\D/g, "").length === 8) fetchCep(v, true);
                        }}
                        placeholder="00000-000"
                        maxLength={9}
                        className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow transition-colors ${
                          entCepError ? "border-red-400" : "border-gray-200"
                        }`}
                      />
                      {entCepLoading && (
                        <Loader2 className="absolute right-3 top-3.5 w-4 h-4 animate-spin text-gray-400" />
                      )}
                    </div>
                    {entCepError && <p className="text-xs text-red-500 mt-1">{entCepError}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Número *</label>
                    <input
                      value={entNumero}
                      onChange={(e) => setEntNumero(e.target.value)}
                      placeholder="Ex: 456"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-yellow transition-colors"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Logradouro</label>
                    <input
                      value={entAddr.logradouro}
                      readOnly
                      placeholder="Preenchido automaticamente via CEP"
                      className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Bairro</label>
                    <input
                      value={entAddr.bairro}
                      readOnly
                      placeholder="—"
                      className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">Cidade / UF</label>
                    <input
                      value={entAddr.cidade ? `${entAddr.cidade} / ${entAddr.uf}` : ""}
                      readOnly
                      placeholder="—"
                      className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500"
                    />
                  </div>
                </div>
              )}
            </section>

            {/* ── RESUMO DO PEDIDO ── */}
            <section className="bg-brand-dark rounded-2xl p-6 text-white">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
                Resumo do pedido
              </span>
              <div className="mt-4 flex flex-col gap-2">
                {[
                  { label: "Serviço",  val: order.servicoLabel },
                  { label: "Tambores", val: `${order.qtd} tambor${order.qtd > 1 ? "es" : ""}` },
                  { label: "Período",  val: `${order.dias} dia${order.dias > 1 ? "s" : ""}` },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-white/50 font-semibold uppercase text-[11px] tracking-wider">
                      {row.label}
                    </span>
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
