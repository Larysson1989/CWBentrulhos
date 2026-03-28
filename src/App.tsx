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
  X
} from "lucide-react";
import { useState, useEffect } from "react";

const WHATSAPP_LINK = "https://wa.me/5541997015424?text=Olá%2C%20gostaria%20de%20um%20orçamento%20para%20remoção%20de%20entulho.";

// ✅ CAMINHOS CORRIGIDOS - repositório Larysson1989/CWBentrulhos
const LOGO_URL = "https://raw.githubusercontent.com/Larysson1989/CWBentrulhos/main/image/logo_CWB.png";
const HERO_IMG_URL = "https://raw.githubusercontent.com/Larysson1989/CWBentrulhos/main/image/hero.jpg";

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
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            {/* ✅ LOGO CORRIGIDA */}
            <img 
              src={LOGO_URL}
              alt="CWB Entulhos Logo" 
              className="h-12 md:h-16 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            <div className="hidden flex items-center gap-2">
              <div className="bg-brand-yellow p-1.5 rounded-lg">
                <Trash2 className="w-6 h-6 text-brand-dark" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">CWB <span className="text-brand-yellow">ENTULHOS</span></span>
            </div>
          </div>

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
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-dark text-white text-sm font-bold py-2.5 px-6 rounded-full hover:bg-brand-gray transition-all">
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-brand-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#F9FAFB] overflow-hidden">
        {/* Background Watermark Logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-[0.03] pointer-events-none -z-0">
          <img 
            src={LOGO_URL}
            alt="" 
            className="w-full h-full object-contain grayscale"
          />
        </div>
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-4 py-1.5 rounded-full text-sm font-bold mb-6">
              <Clock className="w-4 h-4" />
              Entrega Express em até 4 horas
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6">
              A forma mais <span className="text-brand-yellow underline decoration-brand-yellow/30 underline-offset-8">prática</span>, rápida e inteligente de remover entulho.
            </h1>
            <p className="text-lg md:text-xl text-brand-gray mb-10 max-w-lg">
              Atendimento em Curitiba e região metropolitana. Sem caçambas, sem burocracia, com organização total na sua obra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Solicitar orçamento no WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* ✅ HERO IMAGE - Foto dos tambores CWB Entulhos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(245,158,11,0.15)] border-4 border-white max-w-md w-full">
              <img 
                src={HERO_IMG_URL}
                alt="CWB Entulhos - Remoção de Entulho em Curitiba" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.currentTarget.src = LOGO_URL;
                }}
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-yellow rounded-full blur-[100px] opacity-20 -z-10"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand-dark rounded-full blur-[100px] opacity-10 -z-10"></div>
            
            <div className="absolute -bottom-4 -right-4 glass-card p-5 rounded-2xl shadow-2xl z-20 flex items-center gap-4 border-brand-yellow/20">
              <div className="bg-brand-yellow p-2.5 rounded-full shadow-lg shadow-brand-yellow/30">
                <CheckCircle2 className="w-6 h-6 text-brand-dark" />
              </div>
              <div>
                <p className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.2em]">Qualidade</p>
                <p className="text-base font-bold text-brand-dark">Serviço Premium</p>
              </div>
            </div>
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
              { icon: <Clock />, title: "Entrega Express", desc: "Receba seus latões em até 4 horas após a solicitação. Rapidez imbatível." },
              { icon: <Calendar />, title: "Horário Marcado", desc: "Agendamos a entrega e a coleta conforme a sua necessidade e cronograma." },
              { icon: <Trash2 />, title: "Sem Caçamba", desc: "Ideal para locais sem espaço ou onde a caçamba tradicional é proibida." },
              { icon: <CheckCircle2 />, title: "Obra Organizada", desc: "Latões de 200L que mantêm o ambiente limpo e facilitam a movimentação." },
              { icon: <Building2 />, title: "Sem Burocracia", desc: "Livre-se de licenças complicadas para ocupação de via pública." },
              { icon: <Phone />, title: "Atendimento Direto", desc: "Fale diretamente conosco via WhatsApp. Sem esperas, sem complicação." }
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

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "01", title: "Solicite", desc: "Peça pelo WhatsApp em segundos." },
              { step: "02", title: "Receba", desc: "Latões entregues no local da obra." },
              { step: "03", title: "Utilize", desc: "Encha os latões durante sua reforma." },
              { step: "04", title: "Coleta", desc: "Agendamos a retirada rápida." },
              { step: "05", title: "Descarte", desc: "Fazemos o descarte correto e legal." }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -top-4 -left-4 w-12 h-12 opacity-0 group-hover:opacity-10 transition-opacity">
                  <img src={LOGO_URL} alt="" className="w-full h-full object-contain" />
                </div>
                <div className="text-5xl font-display font-black text-brand-yellow/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                {index < 4 && (
                  <div className="hidden md:block absolute top-6 -right-4 text-brand-yellow/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Para Quem Section */}
      <section id="para-quem" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Soluções para todos os setores</h2>
            <p className="section-subtitle">Atendemos desde pequenas reformas residenciais até grandes demandas industriais.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Home />, label: "Apartamentos" },
              { icon: <Building2 />, label: "Residências" },
              { icon: <HardHat />, label: "Construtoras" },
              { icon: <ArrowRight />, label: "Engenheiros" },
              { icon: <ShoppingBag />, label: "Shoppings" },
              { icon: <Hospital />, label: "Hospitais" },
              { icon: <Factory />, label: "Indústrias" },
              { icon: <PartyPopper />, label: "Eventos" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#F9FAFB] border border-gray-100 hover:shadow-lg transition-all">
                <div className="text-brand-yellow mb-4">
                  {item.icon}
                </div>
                <span className="font-bold text-sm text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section id="preços" className="py-24 bg-[#F9FAFB]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Planos e Preços</h2>
            <p className="section-subtitle">Transparência total para o seu planejamento financeiro.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Plano 3 dias", price: "65", period: "por latão", highlight: false },
              { title: "Plano 7 dias", price: "100", period: "por latão", highlight: true },
              { title: "Plano 30 dias", price: "180", period: "por latão", highlight: false }
            ].map((plan, index) => (
              <div 
                key={index} 
                className={`p-10 rounded-3xl flex flex-col items-center text-center transition-all ${plan.highlight ? "bg-brand-dark text-white scale-105 shadow-2xl relative z-10" : "bg-white text-brand-dark"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-yellow text-brand-dark text-xs font-black uppercase px-4 py-1 rounded-full">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-6">{plan.title}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-2xl font-bold">R$</span>
                  <span className="text-6xl font-display font-black">{plan.price}</span>
                </div>
                <p className={`text-sm mb-8 ${plan.highlight ? "text-gray-400" : "text-brand-gray"}`}>{plan.period}</p>
                <div className="w-full h-px bg-gray-200 mb-8 opacity-20"></div>
                <ul className="space-y-4 mb-10 text-sm">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-yellow" /> Entrega inclusa</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-yellow" /> Retirada agendada</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-yellow" /> Descarte correto</li>
                </ul>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlight ? "bg-brand-yellow text-brand-dark hover:bg-yellow-500" : "bg-brand-dark text-white hover:bg-brand-gray"}`}>
                  Contratar Agora
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-12 max-w-2xl mx-auto glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-brand-yellow/10 p-2 rounded-lg">
                <Truck className="w-6 h-6 text-brand-yellow" />
              </div>
              <div>
                <p className="text-sm font-bold">Taxa de coleta</p>
                <p className="text-xs text-brand-gray">Valor fixo por retirada</p>
              </div>
            </div>
            <div className="text-2xl font-display font-black text-brand-yellow">R$ 50</div>
          </div>
          
          <p className="text-center text-sm text-brand-gray mt-8">
            * Atendemos qualquer volume. Valores podem variar conforme necessidade específica.
          </p>
        </div>
      </section>

      {/* Comparativo Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">CWB Entulhos vs Caçamba Tradicional</h2>
            <p className="section-subtitle">Entenda por que o nosso modelo é a escolha inteligente para obras urbanas.</p>
          </div>

          <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-gray-100 shadow-xl">
            <div className="grid grid-cols-2 bg-brand-dark text-white p-6 md:p-8">
              <div className="text-center font-display font-bold text-lg md:text-xl text-brand-yellow">CWB Entulhos</div>
              <div className="text-center font-display font-bold text-lg md:text-xl text-gray-400">Caçamba Comum</div>
            </div>
            
            {[
              { item: "Praticidade", cwb: true, trad: false, label: "Ideal para ambientes internos" },
              { item: "Espaço", cwb: true, trad: false, label: "Ocupa espaço na rua/calçada" },
              { item: "Burocracia", cwb: true, trad: false, label: "Exige autorização da prefeitura" },
              { item: "Organização", cwb: true, trad: false, label: "Visual agressivo e desorganizado" },
              { item: "Agilidade", cwb: true, trad: false, label: "Demora na entrega e retirada" }
            ].map((row, index) => (
              <div key={index} className={`grid grid-cols-2 p-6 md:p-8 border-b border-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-[#F9FAFB]"}`}>
                <div className="flex flex-col items-center text-center px-2">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mb-2" />
                  <span className="text-sm font-bold">{row.item === "Praticidade" ? "Mais prático" : row.item === "Espaço" ? "Compacto" : row.item === "Burocracia" ? "Sem burocracia" : "Mais organizado"}</span>
                </div>
                <div className="flex flex-col items-center text-center px-2 border-l border-gray-100">
                  <XCircle className="w-6 h-6 text-red-400 mb-2" />
                  <span className="text-sm text-brand-gray">{row.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area de Atendimento */}
      <section className="py-20 bg-brand-yellow">
        <div className="container mx-auto px-6 text-center">
          <MapPin className="w-12 h-12 text-brand-dark mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-display font-black text-brand-dark mb-4">
            Atendemos toda Curitiba e região metropolitana.
          </h2>
          <p className="text-brand-dark/70 font-bold uppercase tracking-widest">Sua obra merece essa facilidade.</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Precisa remover entulho com <br className="hidden md:block" /> rapidez e organização?
          </h2>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary mx-auto inline-flex">
            Falar no WhatsApp agora
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                {/* ✅ LOGO CORRIGIDA */}
                <img 
                  src={LOGO_URL}
                  alt="CWB Entulhos Logo" 
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden flex items-center gap-2">
                  <div className="bg-brand-yellow p-1.5 rounded-lg">
                    <Trash2 className="w-6 h-6 text-brand-dark" />
                  </div>
                  <span className="text-2xl font-display font-bold tracking-tight">CWB <span className="text-brand-yellow">ENTULHOS</span></span>
                </div>
              </div>
              <p className="text-brand-gray max-w-sm leading-relaxed">
                Solução moderna e eficiente em remoção de entulho para Curitiba e região metropolitana. Transformamos a logística da sua obra.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-brand-yellow">Horário de Funcionamento</h4>
              <ul className="text-sm text-brand-gray space-y-3">
                <li>Segunda a Sexta: 08:00 às 17:00</li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Plantão: Finais de semana e feriados
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-brand-yellow">Localização</h4>
              <ul className="text-sm text-brand-gray space-y-3">
                <li>Curitiba - PR</li>
                <li>Atendimento em toda a RMC</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} CWB Entulhos. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-brand-gray hover:text-brand-yellow transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fixed WhatsApp Button */}
      <motion.a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
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
