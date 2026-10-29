import React, { useState } from 'react';
import { Header, TabKey } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ConceptsGuide } from './components/ConceptsGuide';
import { VisualExecutionFlow } from './components/VisualExecutionFlow';
import { PracticeChallenges } from './components/PracticeChallenges';
import { DivisionLab } from './components/DivisionLab';
import {
  Code,
  Terminal,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Divide,
} from 'lucide-react';

const FAQS = [
  {
    question: 'Qual a diferença entre os operadores /, // e % para divisão?',
    answer:
      '• / (barra simples): Divisão comum decimal. Retorna sempre float (ex: 10 / 4 = 2.5).\n• // (barra dupla): Divisão inteira (piso). Descarta as casas decimais e retorna apenas o quociente inteiro (ex: 10 // 4 = 2).\n• % (porcentagem / módulo): Retorna o resto da divisão (ex: 10 % 4 = 2). Muito usado para verificar se um número é par (numero % 2 == 0).',
  },
  {
    question: 'Por que o Python exige identação (espaços no início da linha)?',
    answer:
      'Ao contrário de linguagens como C, Java ou JavaScript que usam chaves { } para delimitar blocos, o Python usa a identação (normalmente 4 espaços) para saber o que está dentro de uma função, de um if ou de um loop. Se você não identar corretamente, o Python acusará um "IndentationError".',
  },
  {
    question: 'Qual a diferença prática entre int() e float()?',
    answer:
      'int() armazena apenas números inteiros sem vírgula (ex: -5, 0, 42). Se o usuário digitar "3.5", o int() causará um erro. float() aceita números com casas decimais (ponto flutuante, ex: 10.5, 3.1415, 0.0), tornando a calculadora muito mais versátil para divisões e cálculos reais.',
  },
  {
    question: 'O que significa a linha "if __name__ == \'__main__\':"?',
    answer:
      'É uma convenção de ouro no Python! Quando você executa um arquivo diretamente pelo terminal (python calculadora.py), a variável especial interna __name__ recebe o valor "__main__". Isso garante que o menu só seja executado se o arquivo for rodado diretamente, e não quando alguém apenas importar as funções somar e subtrair em outro arquivo.',
  },
  {
    question: 'Por que usamos dois sinais de igual (==) em vez de um só (=)?',
    answer:
      'Um sinal só (=) é chamado de operador de atribuição: ele guarda um valor em uma variável (ex: x = 10). Dois sinais seguidos (==) são o operador de comparação: ele pergunta se dois valores são idênticos (ex: if opcao == "1").',
  },
  {
    question: 'Como faço para rodar esse arquivo no VS Code ou PyCharm?',
    answer:
      '1. Baixe o arquivo calculadora.py pelo botão no topo da página.\n2. Instale o Python (python.org) caso ainda não tenha no seu computador.\n3. Abra o VS Code ou PyCharm e abra a pasta onde salvou o arquivo.\n4. Clique no botão de "Play/Run" no canto superior direito do editor ou abra o terminal integrado e digite "python calculadora.py".',
  },
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('code');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Orientation Hero */}
        <section className="mb-8 p-6 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-850 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <GraduationCap className="w-4 h-4" />
                <span>Primeiros Passos na Programação</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                Aprenda a Criar sua Primeira Calculadora em Python
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Este ambiente foi projetado para facilitar o seu aprendizado com código limpo, explicações linha a linha, proteção contra divisão por zero e um console interativo onde você pode testar tudo sem precisar instalar nada!
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0">
              <button
                onClick={() => setCurrentTab('division')}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl transition-all shadow-md shadow-amber-500/20 cursor-pointer"
              >
                <Divide className="w-4 h-4" />
                <span>Como Calcular Divisão</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setCurrentTab('terminal')}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                <span>Testar no Terminal</span>
              </button>

              <button
                onClick={() => setCurrentTab('concepts')}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Componentes</span>
              </button>
            </div>
          </div>
        </section>

        {/* Dynamic Tab Views */}
        {currentTab === 'code' && <CodeViewer />}
        {currentTab === 'division' && <DivisionLab />}
        {currentTab === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[560px]">
            <div className="lg:col-span-8 h-[580px]">
              <TerminalSimulator />
            </div>
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>Como interagir com o Terminal</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Este terminal simula a execução real do interpretador Python rodando o arquivo{' '}
                  <code className="text-amber-300 font-mono">calculadora.py</code>.
                </p>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">1.</span>
                    <span>Digite o número da operação desejada no campo abaixo do terminal (ex: 1 para somar) e aperte Enter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">2.</span>
                    <span>Insira o primeiro número e o segundo número quando solicitado.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">3.</span>
                    <span>Experimente dividir por 0 para ver o tratamento de erro em ação!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">4.</span>
                    <span>Digite 0 para encerrar o programa a qualquer momento.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Você sabia?
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No terminal real do seu sistema operacional (como Linux, macOS ou Windows PowerShell), o comando <code className="text-sky-300 font-mono">input()</code> pausa a execução do programa na linha atual até você apertar a tecla Enter.
                </p>
              </div>
            </div>
          </div>
        )}
        {currentTab === 'concepts' && <ConceptsGuide />}
        {currentTab === 'flow' && <VisualExecutionFlow />}
        {currentTab === 'challenges' && <PracticeChallenges />}

        {/* Beginner FAQ Section */}
        <section className="mt-14 pt-10 border-t border-slate-800/80">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-400" />
              <span>Dúvidas Frequentes de Quem Começa a Programar em Python</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Perguntas essenciais respondidas de forma simples e direta para acelerar seu aprendizado.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 hover:bg-slate-850 cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-slate-200">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            <span>Calculadora em Python · Guia Didático para Iniciantes</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Python 3.x</span>
            <span>·</span>
            <span>4 Operações Básicas</span>
            <span>·</span>
            <span>Modular com Funções</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
