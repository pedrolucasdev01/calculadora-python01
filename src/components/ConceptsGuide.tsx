import React, { useState } from 'react';
import {
  Boxes,
  Keyboard,
  GitFork,
  ShieldAlert,
  Repeat,
  Sparkles,
  Check,
  X,
  Copy,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CONCEPTS_EXPLANATIONS } from '../data/pythonSnippets';
import { ConceptExplanation } from '../types';

export const ConceptsGuide: React.FC = () => {
  const [activeConceptId, setActiveConceptId] = useState<string>('functions');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-amber-400" />;
      case 'Keyboard':
        return <Keyboard className="w-5 h-5 text-sky-400" />;
      case 'GitFork':
        return <GitFork className="w-5 h-5 text-emerald-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case 'Repeat':
        return <Repeat className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      default:
        return <Boxes className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Introduction Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-100">
          Componentes Fundamentais da Calculadora em Python
        </h2>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          Para criar uma calculadora simples e bem organizada, você combina os pilares centrais da programação: funções reutilizáveis, conversão de dados, tomada de decisões lógicas e laços de repetição. Veja a explicação detalhada de cada elemento abaixo:
        </p>
      </div>

      {/* Grid of Concept Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CONCEPTS_EXPLANATIONS.map((concept) => {
          const isActive = activeConceptId === concept.id;
          return (
            <button
              key={concept.id}
              onClick={() => setActiveConceptId(concept.id)}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-800/90 border-amber-400/80 shadow-lg ring-1 ring-amber-400/30'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                    {getIcon(concept.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-100">
                      {concept.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-1">
                      {concept.tagline}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                  {concept.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium">
                <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                  {isActive ? 'Exibindo detalhes' : 'Ver explicação completa'}
                </span>
                <span className="text-slate-500 font-mono">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep-Dive View for Selected Concept */}
      {(() => {
        const selected =
          CONCEPTS_EXPLANATIONS.find((c) => c.id === activeConceptId) ||
          CONCEPTS_EXPLANATIONS[0];

        return (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  {getIcon(selected.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">
                    {selected.title}
                  </h3>
                  <p className="text-xs text-slate-400">{selected.tagline}</p>
                </div>
              </div>

              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Guia Python para Iniciantes
              </span>
            </div>

            {/* Summary */}
            <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              {selected.summary}
            </div>

            {/* Syntax Example with copy button */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                  Sintaxe Recomendada em Python:
                </span>
                <button
                  onClick={() => handleCopy(selected.pythonSyntax, selected.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-800 rounded border border-slate-800 transition-colors"
                >
                  {copiedSnippet === selected.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Sintaxe</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 overflow-x-auto leading-relaxed">
                {selected.pythonSyntax.replace(/\\n/g, '\n')}
              </pre>
            </div>

            {/* Key Bullet Points */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Pontos-Chave para Lembrar:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selected.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded bg-amber-500/10 text-amber-400 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why is this important */}
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
              <strong className="font-semibold text-amber-300 block mb-1">
                Por que este componente é crucial no seu aprendizado?
              </strong>
              {selected.whyImportant}
            </div>

            {/* Wrong vs Right comparison */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Comparativo: O que Evitar vs Como Fazer Certo
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Wrong */}
                <div className="p-4 bg-rose-950/20 rounded-xl border border-rose-900/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 mb-2">
                    <X className="w-4 h-4" />
                    <span>Incorreto / Problemático:</span>
                  </div>
                  <pre className="p-2.5 bg-slate-950 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto">
                    {selected.commonMistake.wrong.replace(/\\n/g, '\n')}
                  </pre>
                </div>

                {/* Right */}
                <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
                    <Check className="w-4 h-4" />
                    <span>Correto / Recomendado:</span>
                  </div>
                  <pre className="p-2.5 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
                    {selected.commonMistake.right.replace(/\\n/g, '\n')}
                  </pre>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 italic">
                Motivo: {selected.commonMistake.reason}
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
