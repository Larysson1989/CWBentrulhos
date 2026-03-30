/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion } from "motion/react";
import {
  Truck,
  Clock,
  Trash2,
  CheckCircle2,
  XCircle,
  Phone,
  Calendar,
  MapPin,
  Building2,
  Home,
  HardHat,
  ShoppingBag,
  Hospital,
  Factory,
  PartyPopper,
  ArrowRight,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Calculator,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

const WHATSAPP_LINK =
  "https://wa.me/5541997015424?text=Olá%2C%20gostaria%20de%20um%20orçamento%20para%20remoção%20de%20entulho%20em%20Curitiba.";
const PHONE_LINK = "tel:+5541997015424";
const PHONE_DISPLAY = "(41) 99701-5424";
const HERO_IMG_URL = "/images/pagina1.jpg";

const Logo = () => (
  <img
    src="/images/Logo_CWB_entulho.png"
    alt="CWB Entulhos - Remoção de Entulho em Curitiba"
    className="h-14 md:h-16 min-w-[120px] w-auto object-contain"
  />
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark selection:bg-brand-yellow/30">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo />
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {["Serviços", "Simulador", "Como Funciona", "FAQ"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-bold hover:text-brand-yellow transition-colors uppercase tracking-wider"
              >
                {item}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-yellow hover:bg-brand-yellow/90 text-brand-dark px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-yellow/20"
            >
              Orçamento Rápido
            </a>
          </div>
          <button className="lg:hidden text-brand-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMG_URL}
            alt="Remoção de Entulho Profissional"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-brand-yellow text-brand-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-xl">
                Líder em Curitiba e Região
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.9] mb-6">
                Entulho Acumulado? <br />
                <span className="text-brand-yellow">Nós Resolvemos.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
                Aluguel de tambores para coleta de entulho com entrega rápida, preço justo e descarte 100% legalizado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#simulador"
                  className="bg-brand-yellow text-brand-dark px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-yellow/40 group"
                >
                  <Calculator className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Simular Preço
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:bg-white hover:text-brand-dark"
                >
                  <MessageCircle className="w-6 h-6 text-brand-yellow" />
                  Falar Agora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Simulador Section */}
      <section id="simulador" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4">Simulador de Preços</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Selecione a quantidade e o tempo de uso para ver o valor estimado na hora.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <PricingSimulator />
          </div>
        </div>
      </section>
      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-yellow/5 skew-x-12 transform translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display mb-4">Passo a passo simples</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Processo otimizado para que você não perca tempo com o que não importa.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Solicite", desc: "Peça pelo WhatsApp em segundos." },
              { step: "02", title: "Receba", desc: "Tambores entregues no seu local." },
              { step: "03", title: "Utilize", desc: "Encha os tambores com seu entulho." },
              { step: "04", title: "Coleta", desc: "Agendamos a retirada rápida." },
              { step: "05", title: "Descarte", desc: "Fazemos o descarte legalizado." },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-5xl font-display font-black text-brand-yellow/20 mb-4 group-hover:text-brand-yellow transition-colors">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display mb-4">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Qual o tamanho do tambor?", a: "Nossos tambores têm capacidade de 200 litros, ideais para espaços reduzidos." },
              { q: "Quais bairros vocês atendem?", a: "Atendemos toda Curitiba e região metropolitana." },
              { q: "Como funciona a diária extra?", a: "Os planos incluem até 3 dias. A partir do 4º dia, cobramos R$ 20,00 por tambor/dia." },
            ].map((item, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-24 pb-12">
        <div className="container mx-auto px-6 text-center border-t border-white/10 pt-12">
          <Logo />
          <p className="text-gray-500 text-sm mt-8">
            © {new Date().getFullYear()} CWB Entulhos. Todos os direitos reservados.
          </p>
        </div>
      </footer>
      {/* WhatsApp Float */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold whitespace-nowrap">
          Falar com Especialista
        </span>
      </motion.a>
    </div>
  );
}

function PricingSimulator() {
  const [qtd, setQtd] = useState(1);
  const [dias, setDias] = useState(3);
  const [express, setExpress] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [qtyError, setQtyError] = useState("");
  const [daysError, setDaysError] = useState("");

  const BASE_PRICE: Record<number, number> = { 1: 100, 2: 180, 3: 240, 4: 280 };
  const basePriceFor = (q: number) => q >= 5 ? q * 65 : BASE_PRICE[q];
  const dailyRateFor = (q: number) => q === 1 ? 30 : q <= 3 ? 25 : 20;

  const calculateTotal = () => {
    const base = basePriceFor(qtd);
    const extraDays = Math.max(0, dias - 3);
    return base + extraDays * dailyRateFor(qtd) * qtd;
  };

  const validate = () => {
    let ok = true;
    setQtyError(""); setDaysError("");
    if (qtd < 1 || qtd > 10) { setQtyError(qtd < 1 ? "Mínimo 1 tambor." : "Máximo 10 tambores."); ok = false; }
    if (dias < 3) { setDaysError("O período mínimo é de 3 dias."); ok = false; }
    return ok;
  };

  const total = calculateTotal();
  const extraDays = Math.max(0, dias - 3);
  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const wppMsg = dias > 7
    ? `Olá! Preciso de um orçamento para locação de ${qtd} tambor${qtd > 1 ? "es" : ""} por ${dias} dias (${express ? "Express" : "Convencional"}).`
    : `Olá! Quero confirmar a locação de ${qtd} tambor${qtd > 1 ? "es" : ""} por ${dias} dia${dias > 1 ? "s" : ""} — ${express ? "Express (8h)" : "Convencional (24h)"}. Total estimado: ${fmt(total)}.`;

  return (
    <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-3xl mx-auto">

      {/* LEFT: INPUTS */}
      <div className="p-8 flex flex-col gap-6 border-r border-gray-100">
        <div>
          <h3 className="font-display text-xl font-bold text-brand-dark">Simulador de Locação</h3>
          <p className="text-sm text-gray-500 mt-1">Calcule o valor estimado na hora</p>
        </div>

        {/* QTD */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Quantidade de tambores</label>
          <div className={`flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border-2 transition-colors ${qtyError ? "border-red-400" : "border-transparent focus-within:border-brand-yellow"}`}>
            <button
              onClick={() => setQtd(Math.max(1, qtd - 1))}
              disabled={qtd <= 1}
              aria-label="Diminuir quantidade"
              className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl font-black hover:border-brand-yellow hover:bg-brand-yellow hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >−</button>
            <div className="flex-1 text-center">
              <span className="text-xl font-black text-brand-dark">{qtd}</span>
              <span className="text-sm text-gray-400 ml-2">tambor{qtd > 1 ? "es" : ""}</span>
            </div>
            <button
              onClick={() => setQtd(Math.min(10, qtd + 1))}
              disabled={qtd >= 10}
              aria-label="Aumentar quantidade"
              className="w-10 h-10 rounded-xl border-2 border-brand-yellow bg-brand-yellow flex items-center justify-center text-xl font-black hover:bg-yellow-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >+</button>
          </div>
          <p className="text-xs text-gray-400">Mínimo 1 · Máximo 10 tambores</p>
          {qtyError && <p className="text-xs text-red-500 font-medium">{qtyError}</p>}
        </div>

        {/* DIAS */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Período de permanência</label>
          <div className={`flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border-2 transition-colors ${daysError ? "border-red-400" : "border-transparent focus-within:border-brand-yellow"}`}>
            <button
              onClick={() => setDias(Math.max(3, dias - 1))}
              disabled={dias <= 3}
              aria-label="Diminuir dias"
              className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl font-black hover:border-brand-yellow hover:bg-brand-yellow hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >−</button>
            <div className="flex-1 text-center">
              <span className="text-xl font-black text-brand-dark">{dias}</span>
              <span className="text-sm text-gray-400 ml-2">dia{dias > 1 ? "s" : ""}</span>
              {dias > 3 && <span className="text-xs text-brand-yellow ml-1 font-semibold">(+{dias - 3} extra{dias - 3 > 1 ? "s" : ""})</span>}
            </div>
            <button
              onClick={() => setDias(Math.min(7, dias + 1))}
              disabled={dias >= 7}
              aria-label="Aumentar dias"
              className="w-10 h-10 rounded-xl border-2 border-brand-yellow bg-brand-yellow flex items-center justify-center text-xl font-black hover:bg-yellow-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >+</button>
          </div>
          <p className="text-xs text-gray-400">Mínimo 3 dias inclusos · Máximo 7 dias</p>
          {daysError && <p className="text-xs text-red-500 font-medium">{daysError}</p>}
        </div>

        {/* SERVICE TYPE */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Tipo de serviço</span>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: false, title: "Convencional", sub: "Entrega em até 24h" },
              { val: true,  title: "Express",      sub: "Entrega em até 8h", badge: "Rápido" },
            ].map(opt => (
              <button
                key={opt.title}
                onClick={() => setExpress(opt.val)}
                role="radio"
                aria-checked={express === opt.val}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${express === opt.val ? "border-brand-yellow bg-amber-50" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"}`}
              >
                <span className="block font-bold text-sm text-brand-dark">{opt.title}</span>
                <span className="block text-xs text-gray-500 mt-0.5">{opt.sub}</span>
                {opt.badge && <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{opt.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* CALC BTN */}
        <button
          onClick={() => { if (validate()) setShowResult(true); }}
          className="w-full bg-brand-dark text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 active:scale-[0.98] transition-all shadow-lg"
        >
          <Calculator size={16} />
          Calcular valor
        </button>
      </div>

      {/* RIGHT: SUMMARY */}
      <div className="bg-brand-dark p-8 flex flex-col gap-6 text-white">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Resumo do pedido</span>
          <h3 className="font-display text-lg font-bold mt-1 text-white">
            {showResult && dias > 7 ? "Consulta necessária" : showResult ? "Valor estimado" : "Configure seu pedido"}
          </h3>
        </div>

        <div className="h-px bg-white/10" />

        <div className="flex flex-col gap-3">
          {[
            { label: "Serviço",    val: express ? "Express (até 8h)" : "Convencional (24h)" },
            { label: "Quantidade", val: `${qtd} tambor${qtd > 1 ? "es" : ""}` },
            { label: "Período",    val: `${dias} dia${dias > 1 ? "s" : ""}` },
            ...(showResult && extraDays > 0 ? [{ label: "Diárias extras", val: `${extraDays} × ${fmt(dailyRateFor(qtd))}/tambor` }] : []),
          ].map(row => (
            <div key={row.label} className="flex justify-between items-baseline gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{row.label}</span>
              <span className="text-sm font-semibold text-white/90">{row.val}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10" />

        {!showResult ? (
          <p className="text-white/30 italic text-sm">Clique em calcular para ver o valor</p>
        ) : dias > 7 ? (
          <div className="bg-brand-yellow/10 border border-brand-yellow/25 rounded-2xl p-4 flex flex-col gap-2">
            <span className="text-sm font-bold text-brand-yellow">⚡ Período especial</span>
            <span className="text-xs text-white/65 leading-relaxed">Para períodos acima de 7 dias, entre em contato com nossa equipe para um orçamento personalizado.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-white/50">Total estimado</span>
            <span className="font-display text-4xl font-black text-brand-yellow leading-none">{fmt(total)}</span>
            <span className="text-xs text-white/40 mt-1">
              {extraDays > 0
                ? `Base ${fmt(basePriceFor(qtd))} + ${extraDays} diária${extraDays > 1 ? "s" : ""} extra${extraDays > 1 ? "s" : ""} (${fmt(extraDays * dailyRateFor(qtd) * qtd)})`
                : "Período base de 3 dias inclusos"}
            </span>
          </div>
        )}

        <a
          href={`https://wa.me/5541997015424?text=${encodeURIComponent(wppMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full bg-brand-yellow text-brand-dark py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-yellow-400 active:scale-[0.98] transition-all shadow-lg shadow-brand-yellow/20"
        >
          <MessageCircle size={16} />
          Confirmar no WhatsApp →
        </a>
      </div>
    </div>
  );
}
