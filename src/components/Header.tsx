import React from 'react';
import {
  Code,
  Terminal,
  BookOpen,
  GitPullRequest,
  CheckCircle,
  Copy,
  Download,
  Flame,
  Divide,
} from 'lucide-react';
import { INTERACTIVE_CALCULATOR_CODE } from '../data/pythonSnippets';

export type TabKey = 'code' | 'terminal' | 'concepts' | 'division' | 'flow' | 'challenges';

interface HeaderProps {
  currentTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(INTERACTIVE_CALCULATOR_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([INTERACTIVE_CALCULATOR_CODE], {
      type: 'text/x-python;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calculadora.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-mono font-black text-xl shadow-lg shadow-amber-500/20">
              Py
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                  Calculadora em Python
                </h1>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                  · Guia para Iniciantes
                </span>
              </div>
              <p className="text-xs text-slate-400">
                As 4 operações matemáticas explicadas linha por linha com terminal ao vivo
              </p>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar .py</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadCode}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar calculadora.py</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 border-t border-slate-800/80 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => onTabChange('code')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'code'
                ? 'bg-slate-800 text-amber-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Código & Explicações</span>
          </button>

          <button
            onClick={() => onTabChange('terminal')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'terminal'
                ? 'bg-slate-800 text-amber-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Terminal Interativo</span>
          </button>

          <button
            onClick={() => onTabChange('concepts')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'concepts'
                ? 'bg-slate-800 text-amber-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Componentes Principais</span>
          </button>

          <button
            onClick={() => onTabChange('division')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'division'
                ? 'bg-slate-800 text-amber-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Divide className="w-4 h-4 text-amber-400" />
            <span>Laboratório da Divisão</span>
          </button>

          <button
            onClick={() => onTabChange('flow')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'flow'
                ? 'bg-slate-800 text-amber-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <GitPullRequest className="w-4 h-4" />
            <span>Simulador de Memória</span>
          </button>

          <button
            onClick={() => onTabChange('challenges')}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              currentTab === 'challenges'
                ? 'bg-slate-800 text-amber-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Desafios Práticos</span>
          </button>
        </div>
      </div>
    </header>
  );
};
