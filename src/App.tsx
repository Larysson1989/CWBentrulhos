/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle, Menu, X, Calculator, Star,
  Shield, Clock, Leaf, Award, MapPin,
  ChevronRight, CheckCircle, Truck, Recycle,
  Users, ThumbsUp, AlertCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import OrderModal from "./OrderModal";

// ─── CONTATO — APENAS WHATSAPP ───────────────────────────────────────────────
const WHATSAPP_NUMBER = "554137985108";
const WHATSAPP_DISPLAY = "(41) 3798-5108";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20loca%C3%A7%C3%A3o%20de%20tambores%20em%20Curitiba.`;

const HERO_IMG_URL = "/images/pagina1.jpg";

// ─── LOGO ────────────────────────────────────────────────────────────────────
const Logo = () => (
  <img
    src="/images/Logo_CWB_entulho.png"
    alt="CWB Entulhos - Locação de Tambores para Entulho em Curitiba"
    className="h-14 md:h-16 min-w-[120px] w-auto object-contain"
  />
);

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── TRUST BAR ───────────────────────────────────────────────────────────────
const TrustBar = () => (
  <div className="bg-brand-yellow border-b-2 border-yellow-400 py-2.5">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-brand-dark text-xs font-black uppercase tracking-wider">
        {[
          { icon: Shield, text: "Descarte 100% Legalizado" },
          { icon: Clock,  text: "Entrega em até 24h" },
          { icon: Leaf,   text: "Destinação Sustentável" },
          { icon: Award,  text: "Empresa Licenciada" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── ESTATÍSTICAS ─────────────────────────────────────────────────────────────
const Stats = () => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className="bg-white py-16 border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "2.400+", label: "Clientes Atendidos",   icon: Users },
            { value: "98%",    label: "Satisfação Garantida", icon: ThumbsUp },
            { value: "24h",    label: "Prazo de Entrega",     icon: Truck },
            { value: "100%",   label: "Descarte Legalizado",  icon: Recycle },
          ].map(({ value, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 flex items-center justify-center mb-1">
                <Icon className="w-6 h-6 text-brand-yellow" />
              </div>
              <span className="text-4xl font-display font-black text-brand-dark">{value}</span>
              <span className="text-sm text-gray-500 font-medium">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SERVIÇOS ────────────────────────────────────────────────────────────────
const Services = () => {
  const { ref, inView } = useInView();
  const items = [
    {
      icon: "🏠",
      title: "Residencial",
      desc: "Reformas, limpeza de quintal e demolições domésticas. Ideal para apartamentos e casas com espaço reduzido.",
      tag: "Mais popular",
    },
    {
      icon: "🏗️",
      title: "Obras & Construtoras",
      desc: "Contratos recorrentes para canteiros. Gestão de resíduos de construção civil com documentação completa.",
      tag: null,
    },
    {
      icon: "🏢",
      title: "Comercial & Empresas",
      desc: "Escritórios, lojas, restaurantes. Certificado de Destinação Final para relatórios de sustentabilidade.",
      tag: null,
    },
    {
      icon: "🏘️",
      title: "Condomínios",
      desc: "Solução permanente com atendimento programado. Mantenha o condomínio sempre organizado.",
      tag: null,
    },
  ];

  return (
    <section id="serviços" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-4 py-1.5 rounded-full mb-4">
            O que oferecemos
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark mb-4">
            Locação de Tambores para cada necessidade
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Entregamos os tambores no local — você enche, a gente recolhe e descarta corretamente.
          </p>
        </div>

        {/* Aviso sem mão de obra */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-start gap-3 bg-amber-50 border border-brand-yellow/50 rounded-2xl px-5 py-4">
            <AlertCircle className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
            <p className="text-sm text-brand-dark leading-relaxed">
              <strong>Importante:</strong> nosso serviço é exclusivamente a{" "}
              <strong>locação dos tambores</strong>. O cliente preenche os tambores com o entulho.
              {" "}Não oferecemos mão de obra para coleta ou remoção manual do entulho.
            </p>
          </div>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon, title, desc, tag }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative bg-white rounded-3xl p-7 border border-gray-100 hover:border-brand-yellow hover:shadow-xl hover:shadow-brand-yellow/10 transition-all duration-300 group"
            >
              {tag && (
                <span className="absolute -top-3 left-6 bg-brand-yellow text-brand-dark text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                  {tag}
                </span>
              )}
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-display font-black text-xl text-brand-dark mb-2 group-hover:text-brand-yellow transition-colors">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              <div className="mt-5 flex items-center gap-1 text-brand-yellow text-sm font-bold">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Solicitar agora
                </a>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── DEPOIMENTOS ─────────────────────────────────────────────────────────────
const Testimonials = () => {
  const { ref, inView } = useInView();
  const reviews = [
    {
      name: "Ana Paula Ferreira",
      role: "Proprietária — Reforma residencial",
      text: "Contratei para uma reforma no apartamento e fiquei impressionada com a agilidade. O tambor chegou no dia seguinte e a coleta foi feita rapidinho. Super indico!",
      stars: 5,
      initials: "AF",
    },
    {
      name: "Carlos Augusto",
      role: "Engenheiro Civil — Construtora",
      text: "Usamos os serviços da CWB Entulhos em vários canteiros. Além de ágeis, fornecem o certificado de destinação que precisamos para documentação. Parceiros de confiança.",
      stars: 5,
      initials: "CA",
    },
    {
      name: "Mariana Souza",
      role: "Síndica — Condomínio Portão",
      text: "Fechamos contrato mensal para o condomínio. O preço é justo, o pessoal é educado e o serviço impecável. Resolveu um problema antigo que tínhamos com descarte.",
      stars: 5,
      initials: "MS",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-4 py-1.5 rounded-full mb-4">
            Avaliações reais
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark mb-4">
            O que nossos clientes dizem
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 fill-brand-yellow text-brand-yellow" />
              ))}
            </div>
            <span className="font-black text-brand-dark">5.0</span>
            <span className="text-gray-400 text-sm">· 98% de satisfação</span>
          </div>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map(({ name, role, text, stars, initials }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-gray-50 rounded-3xl p-7 border border-gray-100 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-brand-yellow text-brand-yellow" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed italic">"{text}"</p>
              <div className="flex items-center gap-3 mt-auto pt-2 border-t border-gray-200">
                <div className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center text-brand-dark font-black text-sm flex-shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-brand-dark">{name}</p>
                  <p className="text-xs text-gray-400">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── BAIRROS ATENDIDOS ────────────────────────────────────────────────────────
const Coverage = () => {
  const { ref, inView } = useInView();
  const bairros = [
    "Água Verde","Ahú","Alto da Glória","Alto da XV","Bacacheri","Barreirinha",
    "Batel","Bigorrilho","Boa Vista","Boqueirão","Cabral","Cajuru",
    "Campo Comprido","Capão da Imbuia","Centro","Cristo Rei","Fazendinha",
    "Guaíra","Hauer","Hugo Lange","Jardim Botânico","Jardim das Américas",
    "Juvevê","Mercês","Mossunguê","Novo Mundo","Pinheirinho","Portão",
    "Rebouças","Santa Cândida","Santa Felicidade","Seminário","Uberaba",
    "Vista Alegre","São José dos Pinhais","Colombo","Pinhais","Araucária",
  ];

  return (
    <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-yellow blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-yellow blur-3xl" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-4 py-1.5 rounded-full mb-4">
            Área de cobertura
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-4">
            Curitiba e Região Metropolitana
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Atendemos todos os bairros de Curitiba e principais municípios da região.
            Dúvidas? Consulte via WhatsApp.
          </p>
        </div>
        <div ref={ref} className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
          {bairros.map((bairro, i) => (
            <motion.span
              key={bairro}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.02, duration: 0.3 }}
              className="bg-white/5 hover:bg-brand-yellow hover:text-brand-dark text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10 hover:border-brand-yellow transition-all cursor-default"
            >
              {bairro}
            </motion.span>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-2xl font-black hover:bg-yellow-400 transition-all hover:scale-105"
          >
            <MapPin className="w-5 h-5" />
            Confirmar atendimento no meu bairro
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function App() {
  const scrolled = useScrolled();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavClick = () => setIsMenuOpen(false);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setIsMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark selection:bg-brand-yellow/30">

      {/* ===== NAVBAR ===== */}
      <nav
        className={`sticky top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-brand-dark py-4"
        }`}
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" aria-label="CWB Entulhos — página inicial"><Logo /></a>

          <div className="hidden lg:flex items-center gap-8">
            {[
              { label: "Serviços",      href: "#serviços" },
              { label: "Simulador",     href: "#simulador" },
              { label: "Como Funciona", href: "#como-funciona" },
              { label: "FAQ",           href: "#faq" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-bold hover:text-brand-yellow transition-colors uppercase tracking-wider ${
                  scrolled ? "text-brand-dark" : "text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 text-sm font-bold transition-colors ${
                scrolled ? "text-brand-dark hover:text-[#25D366]" : "text-white hover:text-[#25D366]"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              {WHATSAPP_DISPLAY}
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-yellow hover:bg-yellow-400 text-brand-dark px-6 py-3 rounded-xl font-black transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-yellow/20"
            >
              Orçamento Rápido
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
              className="bg-[#25D366] text-white p-2 rounded-xl">
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              className={`transition-colors ${scrolled ? "text-brand-dark" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-4">
                {[
                  { label: "Serviços",      href: "#serviços" },
                  { label: "Simulador",     href: "#simulador" },
                  { label: "Como Funciona", href: "#como-funciona" },
                  { label: "FAQ",           href: "#faq" },
                ].map((item) => (
                  <a key={item.label} href={item.href} onClick={handleNavClick}
                    className="text-brand-dark font-bold text-lg py-2 border-b border-gray-100 hover:text-brand-yellow transition-colors">
                    {item.label}
                  </a>
                ))}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="bg-brand-yellow text-brand-dark text-center px-6 py-4 rounded-xl font-black text-base mt-2 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp · {WHATSAPP_DISPLAY}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== TRUST BAR ===== */}
      <TrustBar />

      {/* ===== HERO ===== */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-brand-dark" aria-label="Banner principal">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG_URL} alt="Locação de Tambores para Entulho em Curitiba"
            className="w-full h-full object-cover opacity-35" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/30" />
        </div>
        <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: "easeOut" }}>
              <span className="inline-block bg-brand-yellow text-brand-dark px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 shadow-xl">
                🏆 Líder em Curitiba e Região
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-[0.9] mb-6">
                Locação de Tambores <br />
                <span className="text-brand-yellow">para Entulho.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed max-w-xl">
                Entregamos os tambores no seu local — você preenche, a gente recolhe e descarta 100% legalizado. Sem caçamba, sem burocracia.
              </p>
              <ul className="flex flex-col sm:flex-row gap-3 mb-10 text-sm text-white/80 font-medium">
                {[
                  "Tambores de 200L — cabe em qualquer espaço",
                  "Locação de até 5 dias",
                  "Descarte legalizado com certificado",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#simulador"
                  className="bg-brand-yellow text-brand-dark px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-yellow/40 group">
                  <Calculator className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Simular Preço
                </a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all hover:bg-white hover:text-brand-dark">
                  <MessageCircle className="w-6 h-6 text-brand-yellow" />
                  Falar Agora
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Stats />
      <Services />

      {/* ===== SIMULADOR ===== */}
      <section id="simulador" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-4 py-1.5 rounded-full mb-4">
              Transparência total
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black mb-4">Simulador de Preços</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Selecione a quantidade de tambores e veja o valor na hora. Locação de até 5 dias. Sem surpresas.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <PricingSimulator />
          </div>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section id="como-funciona" className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-yellow/5 skew-x-12 transform translate-x-1/2 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-4 py-1.5 rounded-full mb-4">
              Processo simples
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black mb-4">Como funciona em 5 passos</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Você cuida do entulho, nós cuidamos do restante.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Solicite",   desc: "Peça pelo WhatsApp em segundos. Respondemos na hora." },
              { step: "02", title: "Receba",     desc: "Tambores entregues no seu local em até 24h." },
              { step: "03", title: "Preencha",   desc: "Você mesmo enche os tambores com o entulho gerado." },
              { step: "04", title: "Recolhemos", desc: "Agendamos a retirada rápida no prazo combinado." },
              { step: "05", title: "Descarte",   desc: "Fazemos o descarte legalizado com certificado." },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-5xl font-display font-black text-brand-yellow/20 mb-4 group-hover:text-brand-yellow transition-colors duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-yellow text-brand-dark px-8 py-4 rounded-2xl font-black hover:bg-yellow-400 transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Começar agora via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Testimonials />
      <Coverage />

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-black uppercase tracking-widest text-brand-yellow bg-brand-yellow/10 px-4 py-1.5 rounded-full mb-4">
              Dúvidas comuns
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black mb-4">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Qual o tamanho do tambor?",
                a: "Nossos tambores têm capacidade de 200 litros — o equivalente a aproximadamente 5 carrinhos de mão cheios de entulho. São ideais para espaços reduzidos como apartamentos, obras de reforma e estabelecimentos comerciais.",
              },
              {
                q: "Vocês recolhem o entulho dos tambores?",
                a: "Não. Nosso serviço é exclusivamente a locação dos tambores. O cliente é responsável por preencher os tambores com o entulho. Após o preenchimento, agendamos a retirada e realizamos o descarte legalizado.",
              },
              {
                q: "Qual o prazo máximo de locação?",
                a: "O prazo padrão de locação é de até 5 dias corridos. Para períodos mais longos, entre em contato via WhatsApp para ajustarmos a locação conforme sua necessidade.",
              },
              {
                q: "Quais bairros vocês atendem?",
                a: "Atendemos toda Curitiba e região metropolitana, incluindo São José dos Pinhais, Pinhais, Colombo e Araucária. Entre em contato via WhatsApp para confirmar disponibilidade no seu bairro.",
              },
              {
                q: "O descarte é legalizado?",
                a: "Sim. Todo entulho é descartado em locais licenciados pela Prefeitura de Curitiba, em conformidade com a legislação ambiental vigente. Emitimos Certificado de Destinação Final.",
              },
              {
                q: "Vocês atendem condomínios com contrato fixo?",
                a: "Sim! Temos planos para condomínios com atendimento programado e valores diferenciados. Entre em contato via WhatsApp para uma proposta personalizada.",
              },
            ].map((item, index) => (
              <FaqItem key={index} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-20 bg-brand-yellow">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-black text-brand-dark mb-4">
            Pronto para resolver o problema?
          </h2>
          <p className="text-brand-dark/70 text-lg mb-10 max-w-xl mx-auto">
            Fale agora pelo WhatsApp e receba seu orçamento em minutos. Sem compromisso.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all hover:scale-105 shadow-xl">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
            Falar no WhatsApp · {WHATSAPP_DISPLAY}
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-brand-dark text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-12 pb-12 border-b border-white/10">
            <div className="flex flex-col gap-4">
              <Logo />
              <p className="text-gray-400 text-sm leading-relaxed">
                Locação de tambores para coleta de entulho em Curitiba e região.
                Sem caçamba, sem burocracia — descarte 100% legalizado.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-brand-yellow mb-4">Navegação</h4>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Serviços",      href: "#serviços" },
                  { label: "Simulador",     href: "#simulador" },
                  { label: "Como Funciona", href: "#como-funciona" },
                  { label: "FAQ",           href: "#faq" },
                ].map(item => (
                  <li key={item.label}>
                    <a href={item.href} className="text-gray-400 hover:text-brand-yellow transition-colors text-sm">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest text-brand-yellow mb-4">Contato</h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-[#25D366] transition-colors text-sm">
                    <MessageCircle className="w-4 h-4 flex-shrink-0" />
                    WhatsApp · {WHATSAPP_DISPLAY}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  Curitiba e Região Metropolitana, PR
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} CWB Entulhos. Todos os direitos reservados.</p>
            <p className="text-xs">
              Empresa licenciada · Descarte ambientalmente responsável ·{" "}
              <a href="#" className="hover:text-brand-yellow transition-colors">Política de Privacidade</a>
            </p>
          </div>
        </div>
      </footer>

      {/* ===== FLOAT WHATSAPP ===== */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center group"
        aria-label="Falar com especialista via WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold whitespace-nowrap">
          Falar com Especialista
        </span>
      </motion.a>
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left font-bold text-base hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span>{question}</span>
        <span className={`ml-4 flex-shrink-0 transition-transform duration-300 text-brand-yellow text-lg ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── PRICING SIMULATOR — REFORMULADO ─────────────────────────────────────────
// Regras: locação fixa até 5 dias · sem cobrança de diária extra
// Preço varia apenas pela quantidade de tambores
// 1 tambor 200L ≈ 5 carrinhos de mão cheios

const PRICES: Record<number, number> = { 1: 100, 2: 180, 3: 240, 4: 280, 5: 320 };
function precoParaQtd(q: number): number {
  return q <= 5 ? (PRICES[q] ?? q * 60) : q * 60;
}

function PricingSimulator() {
  const [qtd, setQtd] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const total = precoParaQtd(qtd);
  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const carrinhos = qtd * 5;
  const tabelaRefs = [1, 2, 3, 4, 5];

  return (
    <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-3xl mx-auto">

      {/* LEFT */}
      <div className="p-8 flex flex-col gap-6 border-r border-gray-100">
        <div>
          <h3 className="font-display text-xl font-bold text-brand-dark">Simulador de Locação</h3>
          <p className="text-sm text-gray-500 mt-1">Locação por até 5 dias · sem cobrança extra</p>
        </div>

        {/* QUANTIDADE */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">Quantidade de tambores</label>
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <button
              onClick={() => setQtd(Math.max(1, qtd - 1))}
              disabled={qtd <= 1}
              aria-label="Diminuir quantidade"
              className="w-10 h-10 rounded-xl border-2 border-gray-200 bg-white flex items-center justify-center text-xl font-black hover:border-brand-yellow hover:bg-brand-yellow hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >−</button>
            <div className="flex-1 text-center">
              <span className="text-2xl font-black text-brand-dark">{qtd}</span>
              <span className="text-sm text-gray-400 ml-2">tambor{qtd > 1 ? "es" : ""} de 200L</span>
            </div>
            <button
              onClick={() => setQtd(Math.min(10, qtd + 1))}
              disabled={qtd >= 10}
              aria-label="Aumentar quantidade"
              className="w-10 h-10 rounded-xl border-2 border-brand-yellow bg-brand-yellow flex items-center justify-center text-xl font-black hover:bg-yellow-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >+</button>
          </div>
          <p className="text-xs text-gray-400">Mínimo 1 · Máximo 10 tambores</p>
        </div>

        {/* EQUIVALÊNCIA CARRINHOS DE MÃO */}
        <div className="bg-amber-50 border border-brand-yellow/30 rounded-2xl p-4">
          <p className="text-xs font-black uppercase tracking-wider text-brand-yellow mb-2">
            📦 Capacidade equivalente
          </p>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-black text-brand-dark">{carrinhos}</span>
            <span className="text-sm text-gray-600 mb-0.5">carrinhos de mão cheios</span>
          </div>
          {/* Ícones visuais */}
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: Math.min(carrinhos, 20) }).map((_, i) => (
              <span key={i} className="text-base leading-none" title="1 carrinho de mão">🧺</span>
            ))}
            {carrinhos > 20 && (
              <span className="text-xs text-gray-400 font-bold self-center ml-1">+{carrinhos - 20} mais</span>
            )}
          </div>
          <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
            1 tambor de 200L ≈ 5 carrinhos de mão cheios
          </p>
        </div>

        {/* PRAZO */}
        <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3.5">
          <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-brand-dark uppercase tracking-wider">Prazo de locação</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Até <strong className="text-brand-dark">5 dias corridos</strong> inclusos no valor. Para mais tempo, entre em contato.
            </p>
          </div>
        </div>

        {/* TABELA RÁPIDA */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Seleção rápida</p>
          <div className="grid grid-cols-5 gap-1.5">
            {tabelaRefs.map(n => (
              <button
                key={n}
                onClick={() => setQtd(n)}
                className={`rounded-xl py-2.5 text-center text-xs font-black transition-all border-2 ${
                  qtd === n
                    ? "bg-brand-yellow border-brand-yellow text-brand-dark scale-105"
                    : "bg-gray-50 border-gray-100 text-gray-500 hover:border-brand-yellow/50 hover:bg-amber-50"
                }`}
              >
                <span className="block text-sm font-black">{n}×</span>
                <span className="block text-[10px] opacity-70 mt-0.5">{fmt(precoParaQtd(n))}</span>
              </button>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5">6 a 10 tambores: R$ 60,00 por tambor</p>
        </div>
      </div>

      {/* RIGHT — RESUMO */}
      <div className="bg-brand-dark p-8 flex flex-col gap-6 text-white">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Resumo do pedido</span>
          <h3 className="font-display text-lg font-bold mt-1">Valor estimado</h3>
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex flex-col gap-3">
          {[
            { label: "Quantidade",   val: `${qtd} tambor${qtd > 1 ? "es" : ""} de 200L` },
            { label: "Capacidade",   val: `≈ ${carrinhos} carrinhos de mão` },
            { label: "Prazo",        val: "Até 5 dias corridos" },
            { label: "Tipo serviço", val: "Locação · sem mão de obra" },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-baseline gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{row.label}</span>
              <span className="text-sm font-semibold text-white/90 text-right">{row.val}</span>
            </div>
          ))}
        </div>
        <div className="h-px bg-white/10" />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/50">Total estimado</span>
          <span className="font-display text-5xl font-black text-brand-yellow leading-none">{fmt(total)}</span>
          <span className="text-xs text-white/40 mt-1">Locação de até 5 dias · descarte incluído</span>
        </div>
        {/* Aviso sem mão de obra */}
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/60 leading-relaxed">
            Apenas <strong className="text-white/80">locação dos tambores</strong>.
            O cliente preenche o tambor. Não realizamos coleta manual do entulho.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-auto w-full bg-brand-yellow text-brand-dark py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-yellow-400 active:scale-[0.98] transition-all shadow-lg shadow-brand-yellow/20"
        >
          <MessageCircle size={16} />
          Fazer Pedido →
        </button>
        {showModal && (
          <OrderModal
            order={{
              qtd,
              dias: 5,
              express: false,
              total,
              totalFmt: fmt(total),
              servicoLabel: `Locação de ${qtd} tambor${qtd > 1 ? "es" : ""} (até 5 dias)`,
            }}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </div>
  );
}
