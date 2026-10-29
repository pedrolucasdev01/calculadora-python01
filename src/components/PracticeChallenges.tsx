import React, { useState } from 'react';
import { Lightbulb, Code2, CheckCircle2, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { PRACTICE_CHALLENGES } from '../data/pythonSnippets';
import { PythonSyntaxHighlighter } from './PythonSyntaxHighlighter';

export const PracticeChallenges: React.FC = () => {
  const [openSolutions, setOpenSolutions] = useState<Record<string, boolean>>({});
  const [copiedSolution, setCopiedSolution] = useState<string | null>(null);

  const toggleSolution = (id: string) => {
    setOpenSolutions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSolution(id);
    setTimeout(() => setCopiedSolution(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>Desafios Práticos para Expandir sua Calculadora</span>
        </h2>
        <p className="text-sm text-slate-300 mt-2 leading-relaxed">
          A melhor forma de aprender programação é colocando a mão na massa! Tente resolver cada um dos desafios abaixo adicionando novos recursos ao seu código Python. Quando terminar, abra a solução para comparar sua implementação.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRACTICE_CHALLENGES.map((challenge) => {
          const isSolutionOpen = !!openSolutions[challenge.id];

          return (
            <div
              key={challenge.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      challenge.difficulty === 'Fácil'
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'
                        : challenge.difficulty === 'Médio'
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800/80'
                        : 'bg-purple-950/60 text-purple-300 border border-purple-800/80'
                    }`}
                  >
                    Nível: {challenge.difficulty}
                  </span>
                  <Code2 className="w-4 h-4 text-slate-500" />
                </div>

                <h3 className="text-base font-semibold text-slate-100 mb-2">
                  {challenge.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {challenge.description}
                </p>

                {/* Hint Box */}
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800/80 mb-4 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <span className="font-semibold text-amber-300">Dica: </span>
                    {challenge.hint}
                  </div>
                </div>

                {/* Starter Code */}
                <div className="mb-4">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Ponto de Partida:
                  </span>
                  <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
                    {challenge.starterCode}
                  </pre>
                </div>
              </div>

              {/* Solution Accordion */}
              <div className="pt-3 border-t border-slate-800">
                <button
                  onClick={() => toggleSolution(challenge.id)}
                  className="w-full flex items-center justify-between py-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isSolutionOpen ? 'Ocultar Solução' : 'Revelar Solução em Python'}
                  </span>
                  {isSolutionOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isSolutionOpen && (
                  <div className="mt-3 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-400 font-medium">
                        Solução Recomendada:
                      </span>
                      <button
                        onClick={() => handleCopy(challenge.solutionCode, challenge.id)}
                        className="flex items-center gap-1 px-2 py-0.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-950 rounded border border-slate-800"
                      >
                        {copiedSolution === challenge.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                      {challenge.solutionCode}
                    </pre>

                    <p className="text-xs text-slate-400 italic">
                      Explicação: {challenge.solutionExplanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
