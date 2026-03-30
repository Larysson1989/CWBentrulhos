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
    width={160}
    height={64}
  />
);

const faqData = [
  {
    q: "Quais tipos de material os latões podem receber?",
    a: "Entulho de construção (tijolos, concreto, azulejo, caliça), madeira, terra e areia. Não aceitamos lixo doméstico, produtos químicos ou materiais perigosos.",
  },
  {
    q: "Em quanto tempo os latões são entregues?",
    a: "Realizamos a entrega em até 12 horas após a solicitação, em Curitiba e região metropolitana.",
  },
  {
    q: "Quais bairros de Curitiba vocês atendem?",
    a: "Atendemos toda Curitiba e região metropolitana. Entre em contato para confirmar disponibilidade na sua região.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos diversas formas de pagamento. Entre em contato pelo WhatsApp para mais detalhes.",
  },
  {
    q: "O que está incluído no preço do plano?",
    a: "Cada plano inclui entrega do latão e período de uso conforme o plano escolhido. A retirada é agendada conforme sua necessidade e cobrada separadamente (R$ 50 por retirada).",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left font-bold text-brand-dark hover:bg-brand-yellow/5 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-brand-yellow flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brand-yellow flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 text-brand-gray leading-relaxed">{a}</div>
      )}
    </div>
  );
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Diferenciais", "Como Funciona", "Para Quem", "Preços"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="text-sm font-semibold hover:text-brand-yellow transition-colors"
              >
                {item}
              </button>
            ))}
            <a
              href={PHONE_LINK}
              className="text-sm font-bold text-brand-dark hover:text-brand-yellow transition-colors"
              aria-label={`Ligar para ${PHONE_DISPLAY}`}
            >
              📞 {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-dark text-white text-sm font-bold py-2.5 px-6 rounded-full hover:bg-brand-gray transition-all"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-brand-dark"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden"
          >
            {["Diferenciais", "Como Funciona", "Para Quem", "Preços"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(" ", "-"))}
                className="text-left py-2 font-semibold"
              >
                {item}
              </button>
            ))}
            <a href={PHONE_LINK} className="py-2 font-bold text-brand-dark">
              📞 {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#F9FAFB] overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Clock className="w-4 h-4" />
              Entrega Express em até 12 horas
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
              Remoção de Entulho em{" "}
              <span className="text-brand-yellow underline decoration-brand-yellow/30 underline-offset-8">
                Curitiba
              </span>{" "}
              com Rapidez e Responsabilidade.
            </h1>
            <p className="text-lg md:text-xl text-brand-gray mb-10 max-w-lg">
              Latões para obra, reforma e limpeza de terreno. Atendemos toda Curitiba e região metropolitana. Você chama, nós buscamos — sem complicação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                💬 Pedir Orçamento pelo WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={PHONE_LINK}
                className="flex items-center justify-center gap-2 border-2 border-brand-dark text-brand-dark font-bold py-3 px-6 rounded-full hover:bg-brand-dark hover:text-white transition-all min-h-[48px]"
              >
                📞 {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(245,158,11,0.15)] border-4 border-white max-w-md w-full">
              <img
                src={HERO_IMG_URL}
                alt="Latões de remoção de entulho CWB Entulhos em obra em Curitiba"
                className="w-full h-auto object-cover"
                width={600}
                height={450}
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-yellow rounded-full blur-[100px] opacity-20 -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-dark rounded-full blur-[100px] opacity-10 -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Por que escolher a CWB Entulhos?</h2>
            <p className="section-subtitle">
              Inovamos no mercado de Curitiba para oferecer o que há de mais moderno e eficiente em remoção de resíduos de construção.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Clock />, title: "Entrega Express", desc: "Receba seus latões em até 12 horas após a solicitação. Rapidez imbatível." },
              { icon: <Calendar />, title: "Horário Marcado", desc: "Agendamos a entrega e a coleta conforme a sua necessidade e cronograma." },
              { icon: <Trash2 />, title: "Sem Caçamba Tradicional", desc: "Ideal para locais sem espaço ou onde a caçamba tradicional é proibida." },
              { icon: <CheckCircle2 />, title: "Obra Organizada", desc: "Latões de 200L que mantêm o ambiente limpo e facilitam a movimentação." },
              { icon: <Building2 />, title: "Sem Burocracia", desc: "Livre-se de licenças complicadas para ocupação de via pública." },
              { icon: <Phone />, title: "Atendimento Direto", desc: "Fale diretamente conosco via WhatsApp. Sem esperas, sem complicação." },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-[#F9FAFB] border border-gray-100 hover:border-brand-yellow/30 transition-all group"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-yellow shadow-sm mb-6 group-hover:bg-brand-yellow group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-brand-gray leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
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
          <div className="
