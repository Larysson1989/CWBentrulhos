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

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-24 pb-12">
        <div className="container mx-auto px-6 text-center border-t border-white/10 pt-12">
          <p className="text-gray-500 text-sm">
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
  const [dias, setDias] = useState(1);
  const [express, setExpress] = useState(false);

  const calculateTotal = () => {
    let basePrice = 0;
    const isExpress = express;

    if (qtd === 1) basePrice = isExpress ? 185 : 150;
    else if (qtd === 2) basePrice = isExpress ? 295 : 240;
    else if (qtd === 3) basePrice = isExpress ? 390 : 315;
    else if (qtd === 4) basePrice = isExpress ? 470 : 380;
    else basePrice = qtd * (isExpress ? 75 : 60);

    const extraDays = Math.max(0, dias - 3);
    const extraCost = extraDays * 20 * qtd;

    return basePrice + extraCost;
  };

  const total = calculateTotal();
  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden grid lg:grid-cols-2">
      <div className="p-8 md:p-12 space-y-10">
        <div>
          <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
            <Trash2 className="w-4 h-4 text-brand-yellow" />
            Quantidade de Tambores
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQtd(Math.max(1, qtd - 1))}
              className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-2xl font-black hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <div className="flex-1 bg-gray-50 rounded-2xl h-14 flex items-center justify-center text-2xl font-black">
              {qtd} {qtd === 1 ? "Tambor" : "Tambores"}
            </div>
            <button
              onClick={() => setQtd(qtd + 1)}
              className="w-14 h-14 rounded-2xl border-2 border-brand-yellow bg-brand-yellow flex items-center justify-center text-2xl font-black hover:bg-brand-yellow/80 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
            <Calendar className="w-4 h-4 text-brand-yellow" />
            Tempo de Permanência
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDias(Math.max(1, dias - 1))}
              className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-2xl font-black hover:bg-gray-50 transition-colors"
            >
              -
            </button>
            <div className="flex-1 bg-gray-50 rounded-2xl h-14 flex items-center justify-center text-2xl font-black text-center">
              {dias} {dias === 1 ? "Dia" : "Dias"}
              <span className="block text-[10px] text-gray-400 font-bold uppercase mt-1 leading-none">
                {dias > 3 ? `(+${dias - 3} extras)` : "(Até 3 dias inclusos)"}
              </span>
            </div>
            <button
              onClick={() => setDias(dias + 1)}
              className="w-14 h-14 rounded-2xl border-2 border-brand-yellow bg-brand-yellow flex items-center justify-center text-2xl font-black hover:bg-brand-yellow/80 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
            <Zap className="w-4 h-4 text-brand-yellow" />
            Tipo de Serviço
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setExpress(false)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                !express ? "border-brand-yellow bg-brand-yellow/5" : "border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="block font-black text-lg">Convencional</span>
              <span className="text-xs text-gray-500">Entrega em até 24h</span>
            </button>
            <button
              onClick={() => setExpress(true)}
              className={`p-4 rounded-2xl border-2 transition-all text-left ${
                express ? "border-brand-yellow bg-brand-yellow/5" : "border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="block font-black text-lg">Express</span>
              <span className="text-xs text-gray-500">Entrega em até 8h</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-brand-dark p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-sm font-black uppercase tracking-widest text-brand-yellow mb-8">Resumo do Pedido</h3>
          <ul className="space-y-4 mb-10">
            <li className="flex justify-between items-center text-lg">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Serviço</span>
              <span className="font-bold">{express ? "Express (8h)" : "Convencional (24h)"}</span>
            </li>
            <li className="flex justify-between items-center text-lg">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Quantidade</span>
              <span className="font-bold">{qtd} {qtd === 1 ? "Tambor" : "Tambores"}</span>
            </li>
            <li className="flex justify-between items-center text-lg">
              <span className="text-gray-400 font-bold uppercase text-xs tracking-wider">Período</span>
              <span className="font-bold">{dias} {dias === 1 ? "Dia" : "Dias"}</span>
            </li>
          </ul>
        </div>

        <div className="relative z-10 pt-8 border-t border-white/10">
          <div className="flex items-baseline justify-between mb-8">
            <span className="text-gray-400 font-black uppercase tracking-widest text-xs">Total Estimado</span>
            <span className="text-5xl md:text-6xl font-display font-black text-brand-yellow">{fmt(total)}</span>
          </div>
          <a
            href={`${WHATSAPP_LINK}%20*Pedido%20Simulado*%3A%0A•%20${qtd}%20tambor${qtd > 1 ? "es" : ""}%20por%20${dias}%20dia${dias > 1 ? "s" : ""}%0A•%20Serviço%3A%20${express ? "Express (8h)" : "Convencional (24h)"}%0A•%20Total%20estimado%3A%20${fmt(total)}%0A%0APode%20confirmar%20disponibilidade?`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-brand-yellow text-brand-dark py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-brand-yellow/20 group"
          >
            Confirmar no WhatsApp
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
