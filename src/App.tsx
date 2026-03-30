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

const WHATSAPP_BASE = "5541997015424";
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

// ─── Lógica de Precificação ───────────────────────────────────────────────

function getBaseTotal(qtd: number, express: boolean): number {
  const tabela: Record<number, [number, number]> = {
    1: [100, 130],
    2: [150, 190],
    3: [210, 260],
    4: [260, 320],
  };
  if (tabela[qtd]) {
    return express ? tabela[qtd][1] : tabela[qtd][0];
  }
  return qtd * (express ? 75 : 60);
}

function calcularTotal(qtd: number, dias: number, express: boolean) {
  const valorBase = getBaseTotal(qtd, express);
  const diasExtras = Math.max(0, dias - 3);
  const custoDiarias = diasExtras * qtd * 20;
  return { valorBase, diasExtras, custoDiarias, total: valorBase + custoDiarias };
}

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ─── Simulador ───────────────────────────────────────────────────────────────

function Simulador() {
  const [qtd, setQtd] = useState(1);
  const [dias, setDias] = useState(3);
  const [express, setExpress] = useState(false);

  const { valorBase, diasExtras, custoDiarias, total } = calcularTotal(qtd, dias, express);

  const whatsappMsg = encodeURIComponent(
    `Olá! Gostaria de um orçamento:\n• ${qtd} tambor${qtd > 1 ? "es" : ""} por ${dias} dia${dias > 1 ? "s" : ""}\n• Serviço: ${express ? "Express (8h)" : "Convencional (24h)"}\n• Total estimado: ${fmt(total)}\n\nPode confirmar disponibilidade?`
  );

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-3xl mx-auto">
      <div className="bg-brand-dark text-white p-8">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6 text-brand-yellow" />
          <h3 className="text-2xl font-display font-black">Simulador de Preços</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Selecione a quantidade e o prazo e veja o valor na hora.
        </p>
      </div>

      <div className="p-8">
        {/* Tipo de Serviço */}
        <div className="mb-8">
          <p className="block text-sm font-black uppercase tracking-widest text-brand-gray mb-3">
            Tipo de Serviço
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Convencional", sub: "Entrega em até 24h", value: false },
              { label: "Express", sub: "Entrega em até 8h", value: true },
            ].map((opt) => (
              <button
                key={String(opt.value)}
                onClick={() => setExpress(opt.value)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  express === opt.value
                    ? "border-brand-yellow bg-brand-yellow/10"
                    : "border-gray-200 hover:border-brand-yellow/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {opt.value && <Zap className="w-4 h-4 text-brand-yellow" />}
                  <span className="font-bold text-brand-dark">{opt.label}</span>
                </div>
                <span className="text-xs text-brand-gray">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantidade de Tambores */}
        <div className="mb-8">
          <p className="block text-sm font-black uppercase tracking-widest text-brand-gray mb-3">
            Quantidade de Tambores (200L)
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQtd(Math.max(1, qtd - 1))}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand-yellow hover:text-brand-yellow transition-all"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-5xl font-display font-black text-brand-dark">{qtd}</span>
              <span className="text-brand-gray ml-2 text-sm">
                {qtd === 1 ? "tambor" : "tambores"}
              </span>
            </div>
            <button
              onClick={() => setQtd(qtd + 1)}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand-yellow hover:text-brand-yellow transition-all"
            >
              +
            </button>
          </div>
          <div className="flex gap-2 mt-3 justify-center flex-wrap">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => setQtd(n)}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                  qtd === n
                    ? "bg-brand-yellow text-brand-dark"
                    : "bg-gray-100 text-brand-gray hover:bg-brand-yellow/20"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Quantidade de Dias */}
        <div className="mb-8">
          <p className="block text-sm font-black uppercase tracking-widest text-brand-gray mb-3">
            Quantidade de Dias
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDias(Math.max(1, dias - 1))}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand-yellow hover:text-brand-yellow transition-all"
            >
              −
            </button>
            <div className="flex-1 text-center">
              <span className="text-5xl font-display font-black text-brand-dark">{dias}</span>
              <span className="text-brand-gray ml-2 text-sm">
                {dias === 1 ? "dia" : "dias"}
              </span>
            </div>
            <button
              onClick={() => setDias(dias + 1)}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl font-bold hover:border-brand-yellow hover:text-brand-yellow transition-all"
            >
              +
            </button>
          </div>
          <div className="flex gap-2 mt-3 justify-center flex-wrap">
            {[1, 2, 3, 5, 7, 10, 15, 30].map((n) => (
              <button
                key={n}
                onClick={() => setDias(n)}
                className={`px-3 py-1 rounded-full text-sm font-bold transition-all ${
                  dias === n
                    ? "bg-brand-yellow text-brand-dark"
                    : "bg-gray-100 text-brand-gray hover:bg-brand-yellow/20"
                }`}
              >
                {n}d
              </button>
            ))}
          </div>
          {dias <= 3 ? (
            <p className="text-center text-xs text-green-600 font-bold mt-2">
              Incluso nos primeiros 3 dias — sem cobrança de diária extra
            </p>
          ) : (
            <p className="text-center text-xs text-brand-yellow font-bold mt-2">
              +{diasExtras} dia{diasExtras > 1 ? "s" : ""} extra{diasExtras > 1 ? "s" : ""} — R$ 20 por tambor/dia
            </p>
          )}
        </div>

        {/* Resumo */}
        <div className="bg-[#F9FAFB] rounded-2xl p-6 mb-6">
          <p className="font-black text-brand-dark mb-4 uppercase text-xs tracking-widest">Resumo</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-gray">
                {qtd} tambor{qtd > 1 ? "es" : ""} × {Math.min(dias, 3)} dia{Math.min(dias, 3) > 1 ? "s" : ""} ({express ? "Express" : "Convencional"})
              </span>
              <span className="font-bold text-brand-dark">{fmt(valorBase)}</span>
            </div>
            {diasExtras > 0 && (
              <div className="flex justify-between">
                <span className="text-brand-gray">
                  {diasExtras} dia{diasExtras > 1 ? "s" : ""} extra{diasExtras > 1 ? "s" : ""} × {qtd} tambor{qtd > 1 ? "es" : ""} × R$ 20
                </span>
                <span className="font-bold text-brand-dark">{fmt(custoDiarias)}</span>
              </div>
            )}
            <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between items-center">
              <span className="font-black text-brand-dark">Total Estimado</span>
              <span className="text-3xl font-display font-black text-brand-yellow">
                {fmt(total)}
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/${WHATSAPP_BASE}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full justify-center"
        >
          Solicitar este Orçamento pelo WhatsApp
          <ArrowRight className="w-5 h-5" />
        </a>
        <p className="text-center text-xs text-brand-gray mt-3">
          Valores estimados. O orçamento final é confirmado pelo WhatsApp.
        </p>
      </div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqData = [
  {
    q: "Quais tipos de material os latões podem receber?",
    a: "Entulho de construção (tijolos, concreto, azulejo, caliça), madeira, terra e areia. Não aceitamos lixo doméstico, produtos químicos ou materiais perigosos.",
  },
  {
    q: "Em quanto tempo os latões são entregues?",
    a: "Serviço Convencional: entrega em até 24h. Serviço Express: entrega em até 8h. Ambos em Curitiba e região metropolitana.",
  },
  {
    q: "Quais bairros de Curitiba vocês atendem?",
    a: "Atendemos toda Curitiba e região metropolitana. Entre em contato para confirmar disponibilidade na sua região.",
  },
  {
    q: "Como funciona a cobrança de diárias extras?",
    a: "Os planos incluem até 3 dias de uso. A partir do 4º dia, é cobrado R$ 20,00 por tambor por dia adicional.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Aceitamos diversas formas de pagamento. Entre em contato pelo WhatsApp para mais detalhes.",
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
          <ChevronDown className="w-5 h-5 text-brand-yellow
