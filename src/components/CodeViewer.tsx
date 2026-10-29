import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Info, ExternalLink, HelpCircle, AlertTriangle } from 'lucide-react';
import { PythonSyntaxHighlighter } from './PythonSyntaxHighlighter';
import { CodeVariant, CodeLineAnnotation } from '../types';
import {
  INTERACTIVE_CALCULATOR_CODE,
  SIMPLE_CALCULATOR_CODE,
  ADVANCED_CALCULATOR_CODE,
  CODE_LINE_ANNOTATIONS,
} from '../data/pythonSnippets';

interface CodeViewerProps {
  onSelectConcept?: (conceptId: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onSelectConcept }) => {
  const [variant, setVariant] = useState<CodeVariant>('interactive');
  const [copied, setCopied] = useState(false);
  const [selectedLine, setSelectedLine] = useState<number | null>(12); // default to def somar

  const currentCode =
    variant === 'interactive'
      ? INTERACTIVE_CALCULATOR_CODE
      : variant === 'simple'
      ? SIMPLE_CALCULATOR_CODE
      : ADVANCED_CALCULATOR_CODE;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download =
      variant === 'interactive'
        ? 'calculadora.py'
        : variant === 'simple'
        ? 'calculadora_simples.py'
        : 'calculadora_avancada.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const annotatedLineNumbers =
    variant === 'interactive' ? CODE_LINE_ANNOTATIONS.map((a) => a.line) : [];

  const currentAnnotation =
    variant === 'interactive'
      ? CODE_LINE_ANNOTATIONS.find((a) => a.line === selectedLine)
      : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Code Editor Window */}
      <div className="lg:col-span-8 flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        {/* Editor Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs font-semibold text-slate-200">
              {variant === 'interactive'
                ? 'calculadora.py'
                : variant === 'simple'
                ? 'calculadora_simples.py'
                : 'calculadora_avancada.py'}
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">·</span>
            <span className="text-slate-400 text-xs hidden sm:inline">UTF-8 · Python 3</span>
          </div>

          {/* Code Version Switcher */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => {
                setVariant('interactive');
                setSelectedLine(12);
              }}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                variant === 'interactive'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Completa (Recomendada)
            </button>
            <button
              onClick={() => {
                setVariant('simple');
                setSelectedLine(null);
              }}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                variant === 'simple'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Versão Direta (Sem Loop)
            </button>
            <button
              onClick={() => {
                setVariant('advanced');
                setSelectedLine(null);
              }}
              className={`px-3 py-1.5 font-medium rounded-md transition-colors ${
                variant === 'advanced'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Com Dicionário
            </button>
          </div>

          {/* Copy and Download Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded transition-colors"
              title="Copiar código para a área de transferência"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded transition-colors"
              title="Baixar arquivo .py para rodar no seu computador"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Baixar .py</span>
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 text-xs text-amber-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              {variant === 'interactive'
                ? 'Dica: Clique em qualquer linha marcada com um ponto âmbar para ver a explicação detalhada de sua sintaxe e regras.'
                : 'Esta versão direta executa uma única conta sem laço de repetição, ideal para entender funções puras.'}
            </span>
          </div>
          <span className="text-[11px] text-amber-400/80 font-mono hidden md:inline">
            {currentCode.split('\n').length} linhas de código
          </span>
        </div>

        {/* Code Body */}
        <div className="max-h-[640px] overflow-y-auto bg-slate-950">
          <PythonSyntaxHighlighter
            code={currentCode}
            annotatedLines={annotatedLineNumbers}
            activeLine={selectedLine}
            onLineClick={(num) => {
              if (annotatedLineNumbers.includes(num)) {
                setSelectedLine(num);
              }
            }}
          />
        </div>
      </div>

      {/* Code Inspector / Explanation Panel */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {currentAnnotation ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 font-mono text-xs rounded border border-amber-500/30">
                  Linha {currentAnnotation.line}
                </span>
                <span className="text-xs text-slate-400 capitalize">
                  {currentAnnotation.category === 'function' && 'Função'}
                  {currentAnnotation.category === 'input' && 'Entrada'}
                  {currentAnnotation.category === 'condition' && 'Condicional'}
                  {currentAnnotation.category === 'loop' && 'Laço de Repetição'}
                  {currentAnnotation.category === 'error_handling' && 'Tratamento de Erro'}
                  {currentAnnotation.category === 'output' && 'Exibição'}
                  {currentAnnotation.category === 'header' && 'Boas Práticas'}
                </span>
              </div>
              <HelpCircle className="w-4 h-4 text-slate-500" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-100">
                {currentAnnotation.title}
              </h3>
              <div className="mt-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
                {currentAnnotation.code}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                O que este código faz?
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentAnnotation.explanation}
              </p>
            </div>

            <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
              <h4 className="text-xs font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                <span>Dica de ouro para iniciantes</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentAnnotation.beginnerTip}
              </p>
            </div>

            {currentAnnotation.pitfall && (
              <div className="p-3 bg-rose-950/30 rounded-lg border border-rose-900/40">
                <h4 className="text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Erro comum que iniciantes cometem:</span>
                </h4>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {currentAnnotation.pitfall}
                </p>
              </div>
            )}

            {/* Quick selector of other annotated lines */}
            <div className="border-t border-slate-800 pt-3">
              <span className="text-xs text-slate-500 block mb-2">
                Explorar outras partes importantes:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CODE_LINE_ANNOTATIONS.map((ann) => (
                  <button
                    key={ann.line}
                    onClick={() => setSelectedLine(ann.line)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      selectedLine === ann.line
                        ? 'bg-amber-500 text-slate-950 font-semibold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Linha {ann.line} ({ann.category})
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col items-center justify-center text-center py-10">
            <Info className="w-8 h-8 text-amber-400/80 mb-3" />
            <h3 className="text-base font-semibold text-slate-200">
              Inspetor de Linhas Interativo
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mt-2 leading-relaxed">
              Mude para a versão &ldquo;Completa&rdquo; e clique nas linhas com ponto indicador para entender a função de cada instrução em detalhes.
            </p>
            <button
              onClick={() => {
                setVariant('interactive');
                setSelectedLine(12);
              }}
              className="mt-4 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded transition-colors"
            >
              Ativar Modo Completo
            </button>
          </div>
        )}

        {/* Quick Guide on how to run on user machine */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
          <div className="font-semibold text-slate-100 flex items-center gap-1.5 mb-2">
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            Como rodar este código no seu computador:
          </div>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>Baixe o arquivo clicando no botão &ldquo;Baixar .py&rdquo;.</li>
            <li>Abra o terminal ou Prompt de Comando (CMD) na pasta do arquivo.</li>
            <li>
              Digite o comando:{' '}
              <code className="bg-slate-950 px-1.5 py-0.5 rounded text-amber-300 font-mono">
                python calculadora.py
              </code>
            </li>
            <li>Pronto! Sua calculadora funcionará interativamente no seu sistema.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
