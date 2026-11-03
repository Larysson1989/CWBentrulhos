import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle, Menu, X, ShieldCheck, Clock, Leaf, BadgeCheck, MapPin,
  CheckCircle2, Truck, Recycle, AlertCircle, ArrowRight, Home, HardHat, Store,
  Building2, Ruler, Wallet, PackageOpen, CalendarCheck, Minus, Plus,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import OrderModal from "./OrderModal";

// ─── CONTATO — APENAS WHATSAPP ───────────────────────────────────────────────
const WHATSAPP_NUMBER = "554137985108";
const WHATSAPP_DISPLAY = "(41) 3798-5108";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá, gostaria de um orçamento para locação de tambores em Curitiba.",
)}`;

const NAV = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Preços",        href: "#precos" },
  { label: "Para quem",     href: "#para-quem" },
  { label: "Área atendida", href: "#cobertura" },
  { label: "Dúvidas",       href: "#faq" },
];

const Logo = ({ className = "h-11 md:h-12" }: { className?: string }) => (
  <img src="/images/Logo_CWB_entulho.png" alt="CWB Entulhos" className={`${className} w-auto object-contain`} />
);

// Aparece ao rolar (uma vez).
const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Eyebrow = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] mb-4 ${dark ? "text-brand-yellow" : "text-brand-navy"}`}>
    <span className="w-6 h-1 bg-brand-yellow rounded-full" />
    {children}
  </span>
);

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-[0_2px_20px_rgba(6,30,62,0.08)]" : ""}`}>
      <div className="container mx-auto px-4 md:px-6 h-18 md:h-20 flex items-center justify-between gap-6 py-3">
        <a href="#" aria-label="CWB Entulhos — início"><Logo /></a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-brand-gray hover:text-brand-navy transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-[#128C4B] transition-colors">
            <MessageCircle className="w-4 h-4" /> {WHATSAPP_DISPLAY}
          </a>
          <a href="#precos" className="bg-brand-navy hover:bg-brand-dark text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors">
            Pedir tambores
          </a>
        </div>

        <button className="lg:hidden p-2 -mr-2 text-brand-navy" onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
          {open ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
      <div className="hazard h-1.5" aria-hidden />

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-b border-gray-100 shadow-lg" aria-label="Menu">
            <div className="flex flex-col px-4 py-3">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className="py-3 text-base font-semibold text-brand-dark border-b border-gray-100 last:border-0">
                  {n.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative bg-brand-dark text-white overflow-hidden" aria-label="Apresentação">
      {/* traço amarelo diagonal — o "swoosh" do caminhão */}
      <div className="absolute -right-32 top-0 h-full w-[46%] bg-brand-navy skew-x-[-12deg] origin-top hidden lg:block" aria-hidden />
      <div className="absolute right-[44%] top-0 h-full w-3 bg-brand-yellow skew-x-[-12deg] origin-top hidden lg:block" aria-hidden />

      <div className="container mx-auto px-4 md:px-6 relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
            <MapPin className="w-3.5 h-3.5 text-brand-yellow" /> Curitiba e Região Metropolitana
          </span>
          <h1 className="font-display font-black text-[2.6rem] leading-[0.95] sm:text-6xl tracking-tight mb-6 text-balance">
            Tambor de entulho na sua obra em <span className="text-brand-yellow whitespace-nowrap">até 24h.</span>
          </h1>
          <p className="text-lg text-white/75 max-w-xl mb-8 leading-relaxed">
            Locação de tambores de 200 L para reforma, limpeza e obra. Você enche, a gente recolhe e dá o destino correto.
            Sem caçamba na calçada, sem burocracia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href="#precos"
              className="group bg-brand-yellow hover:bg-brand-yellow-600 text-brand-dark px-7 py-4 rounded-xl font-display font-extrabold text-lg flex items-center justify-center gap-2 transition-colors">
              Simular e pedir
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="border-2 border-white/25 hover:border-white hover:bg-white hover:text-brand-dark px-7 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
            </a>
          </div>

          <dl className="grid grid-cols-3 gap-4 max-w-lg border-t border-white/15 pt-6">
            {[
              { k: "a partir de", v: "R$ 140" },
              { k: "por tambor", v: "200 L" },
              { k: "de locação", v: "5 dias" },
            ].map(({ k, v }) => (
              <div key={k}>
                <dt className="sr-only">{k}</dt>
                <dd className="font-display font-black text-2xl md:text-3xl text-white">{v}</dd>
                <dd className="text-xs text-white/55 mt-0.5">{k}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.figure initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-[440px]">
          <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl bg-brand-yellow" aria-hidden />
          <img src="/images/pagina1.jpg" alt="Equipe da CWB Entulhos carregando tambores amarelos no caminhão"
            className="relative rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl" loading="eager" fetchPriority="high" />
          <figcaption className="absolute bottom-5 right-5 left-5 sm:left-auto bg-white text-brand-dark rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-brand-navy text-white grid place-items-center"><Truck className="w-5 h-5" /></span>
            <span className="text-sm leading-tight"><strong className="block">Frota e equipe próprias</strong>entrega e retirada no endereço</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

// ─── FAIXA DE CONFIANÇA ──────────────────────────────────────────────────────
const TrustBar = () => (
  <div className="bg-brand-yellow text-brand-dark">
    <ul className="container mx-auto px-4 md:px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs sm:text-sm font-bold">
      {[
        { icon: ShieldCheck, text: "Descarte legalizado" },
        { icon: Clock,       text: "Entrega em até 24h úteis" },
        { icon: Leaf,        text: "Destinação sustentável" },
        { icon: BadgeCheck,  text: "Empresa licenciada" },
      ].map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-2 justify-center"><Icon className="w-4 h-4 shrink-0" />{text}</li>
      ))}
    </ul>
  </div>
);

// ─── COMO FUNCIONA ───────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { icon: CalendarCheck, title: "Peça pelo site",        desc: "Escolha quantos tambores, a data e o endereço. Leva 2 minutos." },
    { icon: Truck,         title: "Receba em até 24h",     desc: "Entregamos os tambores vazios no local combinado." },
    { icon: PackageOpen,   title: "Encha no seu ritmo",    desc: "Você tem até 5 dias para preencher. Sem diária extra." },
    { icon: Recycle,       title: "Recolhemos e descartamos", desc: "Retiramos os tambores e levamos a um destino licenciado." },
  ];
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="max-w-2xl mb-14">
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-brand-dark">Do pedido ao descarte em 4 passos.</h2>
        </Reveal>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <li className="h-full relative rounded-2xl border border-gray-200 p-6 hover:border-brand-navy transition-colors">
                <span className="absolute top-5 right-6 font-display font-black text-5xl text-brand-mist" aria-hidden>{i + 1}</span>
                <span className="relative w-12 h-12 rounded-xl bg-brand-navy text-brand-yellow grid place-items-center mb-5"><Icon className="w-6 h-6" /></span>
                <h3 className="relative font-display font-extrabold text-xl text-brand-dark mb-2">{title}</h3>
                <p className="relative text-brand-gray text-sm leading-relaxed">{desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-8">
          <p className="flex items-start gap-3 bg-brand-mist rounded-2xl px-5 py-4 text-sm text-brand-dark max-w-3xl">
            <AlertCircle className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
            <span><strong>Importante:</strong> o serviço é a locação dos tambores. Quem enche é o cliente. Não fazemos coleta manual do entulho.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── POR QUE TAMBOR ──────────────────────────────────────────────────────────
function WhyDrum() {
  const items = [
    { icon: Ruler,  title: "Cabe onde a caçamba não cabe", desc: "Apartamento, garagem, corredor ou quintal pequeno. O tambor de 200 L passa por qualquer porta." },
    { icon: Wallet, title: "Pague pelo volume que usa",    desc: "A partir de 1 tambor. Precisa de mais? Cada tambor extra sai mais barato." },
    { icon: Clock,  title: "Rápido de verdade",            desc: "Pedido hoje, tambor no local em até 24h úteis. Retirada no prazo combinado." },
  ];
  return (
    <section className="py-20 md:py-28 bg-brand-dark text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
        <Reveal>
          <Eyebrow dark>Por que tambor</Eyebrow>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight mb-5">A solução do tamanho da sua obra.</h2>
          <p className="text-white/70 leading-relaxed mb-8">1 tambor equivale a cerca de 5 carrinhos de mão cheios. Ideal para reformas e obras que não precisam de uma caçamba inteira.</p>
          <a href="#precos" className="inline-flex items-center gap-2 text-brand-yellow font-bold hover:gap-3 transition-all">
            Ver preços <ArrowRight className="w-4 h-4" />
          </a>
        </Reveal>
        <div className="grid gap-4">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="flex gap-5 rounded-2xl bg-white/5 border border-white/10 p-6">
                <span className="w-12 h-12 rounded-xl bg-brand-yellow text-brand-dark grid place-items-center shrink-0"><Icon className="w-6 h-6" /></span>
                <div>
                  <h3 className="font-display font-extrabold text-xl mb-1">{title}</h3>
                  <p className="text-white/65 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PREÇOS ──────────────────────────────────────────────────────────────────
const Pricing = () => (
  <section id="precos" className="py-20 md:py-28 bg-brand-mist scroll-mt-20">
    <div className="container mx-auto px-4 md:px-6">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <Eyebrow>Preço na hora</Eyebrow>
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-brand-dark mb-4">Simule e faça seu pedido.</h2>
        <p className="text-brand-gray">Escolha a quantidade e veja o valor final. Locação de até 5 dias e descarte inclusos.</p>
      </Reveal>
      <PricingSimulator />
    </div>
  </section>
);

// ─── PARA QUEM ───────────────────────────────────────────────────────────────
function Segments() {
  const items = [
    { icon: Home,      title: "Residencial",          desc: "Reformas, limpeza de quintal e pequenas demolições em casas e apartamentos.", tag: "Mais pedido" },
    { icon: HardHat,   title: "Obras e construtoras", desc: "Atendimento recorrente para canteiros, com documentação da destinação." },
    { icon: Store,     title: "Comércio e empresas",  desc: "Lojas, escritórios e restaurantes. Certificado de destinação para seus relatórios." },
    { icon: Building2, title: "Condomínios",          desc: "Atendimento programado para manter áreas comuns sempre organizadas." },
  ];
  return (
    <section id="para-quem" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <Reveal className="max-w-2xl mb-12">
          <Eyebrow>Para quem</Eyebrow>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-brand-dark">Da reforma do apartamento ao canteiro de obras.</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ icon: Icon, title, desc, tag }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <article className="relative h-full rounded-2xl bg-brand-mist p-6 flex flex-col">
                {tag && <span className="absolute top-5 right-5 bg-brand-yellow text-brand-dark text-[11px] font-bold px-2.5 py-1 rounded-full">{tag}</span>}
                <Icon className="w-9 h-9 text-brand-navy mb-5" strokeWidth={1.75} />
                <h3 className="font-display font-extrabold text-xl text-brand-dark mb-2">{title}</h3>
                <p className="text-brand-gray text-sm leading-relaxed flex-1">{desc}</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:gap-2.5 transition-all">
                  Pedir orçamento <ArrowRight className="w-4 h-4" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROVA SOCIAL ────────────────────────────────────────────────────────────
function SocialProof() {
  const stats = [
    { value: "100+",   label: "clientes atendidos" },
    { value: "93%",    label: "de satisfação" },
    { value: "24h",    label: "prazo de entrega" },
    { value: "100%",   label: "descarte legalizado" },
  ];
  const reviews = [
    { name: "Ana Paula Ferreira", role: "Reforma residencial",
      text: "Contratei para uma reforma no apartamento e fiquei impressionada com a agilidade. O tambor chegou no dia seguinte e a coleta foi feita rapidinho. Super indico!" },
    { name: "Carlos Augusto", role: "Engenheiro civil, construtora",
      text: "Usamos os serviços da CWB Entulhos em vários canteiros. Além de ágeis, fornecem o certificado de destinação que precisamos para documentação. Parceiros de confiança." },
    { name: "Mariana Souza", role: "Síndica, Condomínio Portão",
      text: "Fechamos contrato mensal para o condomínio. O preço é justo, o pessoal é educado e o serviço impecável. Resolveu um problema antigo que tínhamos com descarte." },
  ];
  return (
    <section className="py-20 md:py-28 bg-brand-mist">
      <div className="container mx-auto px-4 md:px-6">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden mb-16">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-white p-6 md:p-8 text-center">
              <dd className="font-display font-black text-4xl md:text-5xl text-brand-navy">{value}</dd>
              <dt className="text-sm text-brand-gray mt-1">{label}</dt>
            </div>
          ))}
        </dl>
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <Eyebrow>Quem já contratou</Eyebrow>
            <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-brand-dark">O que dizem nossos clientes.</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map(({ name, role, text }, i) => (
            <Reveal key={name} delay={i * 0.08}>
              <figure className="h-full bg-white rounded-2xl p-7 flex flex-col gap-5 border-t-4 border-brand-yellow">
                <blockquote className="text-brand-dark leading-relaxed flex-1">“{text}”</blockquote>
                <figcaption className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-brand-navy text-white grid place-items-center font-bold text-sm">
                    {name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </span>
                  <span className="text-sm"><strong className="block text-brand-dark">{name}</strong><span className="text-brand-gray">{role}</span></span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COBERTURA ───────────────────────────────────────────────────────────────
function Coverage() {
  const bairros = [
    "Água Verde", "Ahú", "Alto da Glória", "Alto da XV", "Bacacheri", "Barreirinha",
    "Batel", "Bigorrilho", "Boa Vista", "Boqueirão", "Cabral", "Cajuru",
    "Campo Comprido", "Capão da Imbuia", "Centro", "Cristo Rei", "Fazendinha",
    "Guaíra", "Hauer", "Hugo Lange", "Jardim Botânico", "Jardim das Américas",
    "Juvevê", "Mercês", "Mossunguê", "Novo Mundo", "Pinheirinho", "Portão",
    "Rebouças", "Santa Cândida", "Santa Felicidade", "Seminário", "Uberaba", "Vista Alegre",
  ];
  const rmc = ["São José dos Pinhais", "Colombo", "Pinhais", "Araucária"];
  return (
    <section id="cobertura" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
        <Reveal>
          <Eyebrow>Área atendida</Eyebrow>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-brand-dark mb-5">Curitiba inteira e Região Metropolitana.</h2>
          <p className="text-brand-gray mb-8">Não achou seu bairro? Atendemos toda a cidade. Confirme pelo WhatsApp em segundos.</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-dark text-white px-6 py-3.5 rounded-xl font-bold transition-colors">
            <MapPin className="w-5 h-5" /> Confirmar meu endereço
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-3">Curitiba</p>
          <ul className="flex flex-wrap gap-2 mb-8">
            {bairros.map((b) => <li key={b} className="text-sm px-3 py-1.5 rounded-lg bg-brand-mist text-brand-dark">{b}</li>)}
          </ul>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-3">Região Metropolitana</p>
          <ul className="flex flex-wrap gap-2">
            {rmc.map((b) => <li key={b} className="text-sm font-semibold px-3 py-1.5 rounded-lg bg-brand-yellow text-brand-dark">{b}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
const FAQ = [
  { q: "Qual o tamanho do tambor?", a: "Os tambores têm 200 litros, o equivalente a cerca de 5 carrinhos de mão cheios de entulho. São ideais para espaços reduzidos como apartamentos, reformas e comércios." },
  { q: "Vocês recolhem o entulho dos tambores?", a: "Não. O serviço é a locação dos tambores. O cliente preenche os tambores com o entulho. Depois, agendamos a retirada e fazemos o descarte legalizado." },
  { q: "Qual o prazo máximo de locação?", a: "O prazo padrão é de até 5 dias corridos. Para períodos mais longos, fale com a gente pelo WhatsApp." },
  { q: "Quais bairros vocês atendem?", a: "Toda Curitiba e região metropolitana, incluindo São José dos Pinhais, Pinhais, Colombo e Araucária. Confirme seu endereço pelo WhatsApp." },
  { q: "O descarte é legalizado?", a: "Sim. Todo entulho é descartado em locais licenciados pela Prefeitura de Curitiba, conforme a legislação ambiental. Emitimos Certificado de Destinação Final." },
  { q: "Vocês atendem condomínios com contrato fixo?", a: "Sim. Temos planos para condomínios com atendimento programado e valores diferenciados. Peça uma proposta pelo WhatsApp." },
];

function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-brand-mist scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
        <Reveal>
          <Eyebrow>Dúvidas</Eyebrow>
          <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-brand-dark mb-5">Perguntas frequentes.</h2>
          <p className="text-brand-gray">Ficou alguma dúvida? <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-navy underline underline-offset-4">Chame no WhatsApp</a>.</p>
        </Reveal>
        <div className="flex flex-col gap-3">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group bg-white rounded-2xl px-6 open:pb-5">
              <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-display font-bold text-lg text-brand-dark">
                {q}
                <Plus className="w-5 h-5 text-brand-navy shrink-0 transition-transform group-open:rotate-45" />
              </summary>
              <p className="text-brand-gray leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA FINAL + RODAPÉ ──────────────────────────────────────────────────────
const FinalCta = () => (
  <section className="bg-brand-yellow">
    <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
      <div>
        <h2 className="font-display font-black text-4xl md:text-5xl tracking-tight text-brand-dark mb-3">Seu tambor amanhã na obra.</h2>
        <p className="text-brand-dark/75 text-lg">Peça agora pelo site ou chame no WhatsApp. Orçamento sem compromisso.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <a href="#precos" className="bg-brand-dark hover:bg-brand-navy text-white px-7 py-4 rounded-xl font-display font-extrabold text-lg flex items-center justify-center gap-2 transition-colors">
          Fazer pedido <ArrowRight className="w-5 h-5" />
        </a>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
          className="border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white px-7 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors">
          <MessageCircle className="w-5 h-5" /> {WHATSAPP_DISPLAY}
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-dark text-white/70 pb-24 md:pb-0">
    <div className="hazard h-1.5" aria-hidden />
    <div className="container mx-auto px-4 md:px-6 py-14 grid md:grid-cols-3 gap-10">
      <div>
        <span className="inline-block bg-white rounded-xl px-4 py-3 mb-4"><Logo className="h-10" /></span>
        <p className="text-sm leading-relaxed max-w-xs">Locação de tambores para entulho em Curitiba e região. Descarte 100% legalizado.</p>
      </div>
      <nav aria-label="Rodapé">
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-4">Navegação</h3>
        <ul className="flex flex-col gap-2 text-sm">
          {NAV.map((n) => <li key={n.href}><a href={n.href} className="hover:text-white transition-colors">{n.label}</a></li>)}
        </ul>
      </nav>
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-brand-yellow mb-4">Contato</h3>
        <ul className="flex flex-col gap-3 text-sm">
          <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><MessageCircle className="w-4 h-4" /> WhatsApp {WHATSAPP_DISPLAY}</a></li>
          <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Curitiba e Região Metropolitana, PR</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <p className="container mx-auto px-4 md:px-6 py-6 text-xs text-white/45">
        © {new Date().getFullYear()} CWB Entulhos · Empresa licenciada · Descarte ambientalmente responsável
      </p>
    </div>
  </footer>
);

// Barra fixa no celular: as duas ações que vendem sempre à mão.
const MobileBar = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-gray-200 px-4 py-3 grid grid-cols-[1fr_auto] gap-3">
    <a href="#precos" className="bg-brand-navy text-white rounded-xl py-3.5 font-display font-extrabold text-center">Pedir tambores</a>
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
      className="bg-[#25D366] text-white rounded-xl px-5 grid place-items-center"><MessageCircle className="w-6 h-6" /></a>
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-brand-dark selection:bg-brand-yellow/40">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Pricing />
        <WhyDrum />
        <Segments />
        <SocialProof />
        <Coverage />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
        className="hidden md:grid fixed bottom-8 right-8 z-50 w-16 h-16 place-items-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-transform">
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
}

// ─── SIMULADOR ───────────────────────────────────────────────────────────────
// Tabela real: 1 tambor R$140 (R$100 + R$40 entrega avulsa); 2–5 com entrega
// grátis; 6–10 sob consulta. O banco recalcula o total no insert.
const PRICES: Record<number, number> = { 1: 140, 2: 200, 3: 270, 4: 320, 5: 350 };
const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function PricingSimulator() {
  const [qtd, setQtd] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const total = qtd <= 5 ? PRICES[qtd] : null;
  const consultaLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Olá, gostaria de um orçamento para locação de ${qtd} tambores em Curitiba.`,
  )}`;

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-[1.15fr_0.85fr] bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(6,30,62,0.12)]">
      <div className="p-6 md:p-10 flex flex-col gap-8">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-brand-gray">Quantos tambores?</label>
          <div className="mt-3 flex items-center gap-4">
            <button onClick={() => setQtd(Math.max(1, qtd - 1))} disabled={qtd <= 1} aria-label="Diminuir quantidade"
              className="w-12 h-12 rounded-xl border-2 border-gray-200 grid place-items-center text-brand-navy hover:border-brand-navy disabled:opacity-30 transition-colors">
              <Minus className="w-5 h-5" />
            </button>
            <output className="flex-1 text-center" aria-live="polite">
              <span className="font-display font-black text-5xl text-brand-dark">{qtd}</span>
              <span className="block text-sm text-brand-gray">tambor{qtd > 1 ? "es" : ""} de 200 L · ≈ {qtd * 5} carrinhos de mão</span>
            </output>
            <button onClick={() => setQtd(Math.min(10, qtd + 1))} disabled={qtd >= 10} aria-label="Aumentar quantidade"
              className="w-12 h-12 rounded-xl bg-brand-navy text-white grid place-items-center hover:bg-brand-dark disabled:opacity-30 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-gray mb-3">Tabela</p>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setQtd(n)} aria-pressed={qtd === n}
                className={`rounded-xl py-3 text-center border-2 transition-colors ${
                  qtd === n ? "border-brand-navy bg-brand-navy text-white" : "border-gray-200 hover:border-brand-navy text-brand-dark"
                }`}>
                <span className="block font-display font-black text-lg">{n}×</span>
                <span className={`block text-[11px] ${qtd === n ? "text-white/80" : "text-brand-gray"}`}>{fmt(PRICES[n]).replace(",00", "")}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-brand-gray mt-3">De 6 a 10 tambores: sob consulta.</p>
        </div>

        <ul className="grid gap-2 text-sm text-brand-dark">
          {["Locação de até 5 dias corridos", qtd === 1 ? "Entrega R$ 40 incluída no valor" : "Entrega grátis", "Retirada e descarte legalizado inclusos"].map((t) => (
            <li key={t} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-navy shrink-0" />{t}</li>
          ))}
        </ul>
      </div>

      <div className="bg-brand-dark text-white p-6 md:p-10 flex flex-col">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-yellow">Total</p>
        {total !== null ? (
          <>
            <p className="font-display font-black text-6xl mt-2 leading-none">{fmt(total).replace(",00", "")}</p>
            <p className="text-white/60 text-sm mt-3">{qtd > 1 ? `${fmt(total / qtd)} por tambor · ` : ""}sem taxa escondida</p>
          </>
        ) : (
          <>
            <p className="font-display font-black text-4xl mt-2 leading-tight">Sob consulta</p>
            <p className="text-white/60 text-sm mt-3">Para {qtd} tambores montamos um orçamento sob medida.</p>
          </>
        )}
        <div className="flex-1 min-h-8" />
        {total !== null ? (
          <button onClick={() => setShowModal(true)}
            className="w-full bg-brand-yellow hover:bg-brand-yellow-600 text-brand-dark py-4 rounded-xl font-display font-extrabold text-lg flex items-center justify-center gap-2 transition-colors">
            Fazer pedido <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <a href={consultaLink} target="_blank" rel="noopener noreferrer"
            className="w-full bg-brand-yellow hover:bg-brand-yellow-600 text-brand-dark py-4 rounded-xl font-display font-extrabold text-lg flex items-center justify-center gap-2 transition-colors">
            <MessageCircle className="w-5 h-5" /> Pedir orçamento
          </a>
        )}
        <p className="text-xs text-white/50 mt-4 text-center">Locação dos tambores. Não inclui mão de obra.</p>
      </div>

      {showModal && total !== null && (
        <OrderModal
          order={{
            qtd, dias: 5, express: false, total, totalFmt: fmt(total),
            servicoLabel: `Locação de ${qtd} tambor${qtd > 1 ? "es" : ""} (até 5 dias)`,
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
