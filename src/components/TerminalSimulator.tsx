import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Trash2, ArrowRight, CornerDownLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { TerminalMessage } from '../types';

interface TerminalSimulatorProps {
  onRunSuccess?: () => void;
}

type Step = 'WAIT_OPTION' | 'WAIT_NUM1' | 'WAIT_NUM2' | 'FINISHED';

const INITIAL_MENU = `================================
      CALCULADORA PYTHON      
================================
1 - Adição (+)
2 - Subtração (-)
3 - Multiplicação (*)
4 - Divisão (/)
0 - Sair do programa
================================`;

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ onRunSuccess }) => {
  const [messages, setMessages] = useState<TerminalMessage[]>([
    { id: '1', type: 'system', text: '$ python calculadora.py' },
    { id: '2', type: 'system', text: 'Bem-vindo(a) à sua Calculadora em Python!' },
    { id: '3', type: 'menu', text: INITIAL_MENU },
    { id: '4', type: 'prompt', text: 'Escolha uma opção (0 a 4): ' },
  ]);

  const [currentStep, setCurrentStep] = useState<Step>('WAIT_OPTION');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [num1, setNum1] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [mode, setMode] = useState<'app' | 'repl'>('app');
  const [replInput, setReplInput] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const resetCalculator = () => {
    setCurrentStep('WAIT_OPTION');
    setSelectedOption('');
    setNum1(null);
    setInputValue('');
    setMessages([
      { id: Date.now().toString() + '-1', type: 'system', text: '$ python calculadora.py' },
      { id: Date.now().toString() + '-2', type: 'system', text: 'Bem-vindo(a) à sua Calculadora em Python!' },
      { id: Date.now().toString() + '-3', type: 'menu', text: INITIAL_MENU },
      { id: Date.now().toString() + '-4', type: 'prompt', text: 'Escolha uma opção (0 a 4): ' },
    ]);
  };

  const clearTerminal = () => {
    setMessages([]);
  };

  const handleUserInput = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val) return;

    // Echo user's typed value in terminal
    const userMsg: TerminalMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: val,
    };

    const newMsgs = [...messages, userMsg];

    if (currentStep === 'WAIT_OPTION') {
      if (val === '0') {
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          type: 'system',
          text: '\nObrigado por usar a calculadora. Bons estudos na programação! Até logo!',
        });
        setCurrentStep('FINISHED');
      } else if (!['1', '2', '3', '4'].includes(val)) {
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: '\n[!] Opção inválida! Por favor, digite um número de 0 a 4.',
        });
        newMsgs.push({
          id: (Date.now() + 2).toString(),
          type: 'menu',
          text: INITIAL_MENU,
        });
        newMsgs.push({
          id: (Date.now() + 3).toString(),
          type: 'prompt',
          text: 'Escolha uma opção (0 a 4): ',
        });
      } else {
        setSelectedOption(val);
        const opNames: Record<string, string> = {
          '1': 'Adição (+)',
          '2': 'Subtração (-)',
          '3': 'Multiplicação (*)',
          '4': 'Divisão (/)',
        };
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          type: 'system',
          text: `[Operação selecionada: ${opNames[val]}]`,
        });
        newMsgs.push({
          id: (Date.now() + 2).toString(),
          type: 'prompt',
          text: 'Digite o primeiro número: ',
        });
        setCurrentStep('WAIT_NUM1');
      }
    } else if (currentStep === 'WAIT_NUM1') {
      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: '[!] Erro (ValueError): Você deve digitar um número válido (ex: 10 ou 4.5)!',
        });
        newMsgs.push({
          id: (Date.now() + 2).toString(),
          type: 'prompt',
          text: 'Digite o primeiro número: ',
        });
      } else {
        setNum1(parsed);
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          type: 'prompt',
          text: 'Digite o segundo número: ',
        });
        setCurrentStep('WAIT_NUM2');
      }
    } else if (currentStep === 'WAIT_NUM2') {
      const parsed2 = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed2)) {
        newMsgs.push({
          id: (Date.now() + 1).toString(),
          type: 'error',
          text: '[!] Erro (ValueError): Você deve digitar um número válido!',
        });
        newMsgs.push({
          id: (Date.now() + 2).toString(),
          type: 'prompt',
          text: 'Digite o segundo número: ',
        });
      } else {
        const n1 = num1 ?? 0;
        const n2 = parsed2;
        let resText = '';
        let isErr = false;

        if (selectedOption === '1') {
          resText = `\n>>> Resultado: ${n1} + ${n2} = ${n1 + n2}`;
        } else if (selectedOption === '2') {
          resText = `\n>>> Resultado: ${n1} - ${n2} = ${n1 - n2}`;
        } else if (selectedOption === '3') {
          resText = `\n>>> Resultado: ${n1} * ${n2} = ${n1 * n2}`;
        } else if (selectedOption === '4') {
          if (n2 === 0) {
            resText = `\n>>> Erro: Não é possível dividir por zero!`;
            isErr = true;
          } else {
            const divRes = n1 / n2;
            const formatted = Number.isInteger(divRes) ? divRes.toString() : divRes.toFixed(4).replace(/\.?0+$/, '');
            resText = `\n>>> Resultado: ${n1} / ${n2} = ${formatted}`;
          }
        }

        newMsgs.push({
          id: (Date.now() + 1).toString(),
          type: isErr ? 'error' : 'result',
          text: resText,
        });

        // Loop back to menu for another calculation
        newMsgs.push({
          id: (Date.now() + 2).toString(),
          type: 'menu',
          text: INITIAL_MENU,
        });
        newMsgs.push({
          id: (Date.now() + 3).toString(),
          type: 'prompt',
          text: 'Escolha uma opção (0 a 4): ',
        });

        setCurrentStep('WAIT_OPTION');
        setSelectedOption('');
        setNum1(null);
        if (onRunSuccess) onRunSuccess();
      }
    }

    setMessages(newMsgs);
    setInputValue('');
  };

  // Quick Preset Simulator
  const runQuickTest = (op: string, a: number, b: number) => {
    resetCalculator();
    setTimeout(() => {
      let calcRes: number | string = 0;
      let symbol = '+';
      if (op === '1') {
        symbol = '+';
        calcRes = a + b;
      } else if (op === '2') {
        symbol = '-';
        calcRes = a - b;
      } else if (op === '3') {
        symbol = '*';
        calcRes = a * b;
      } else if (op === '4') {
        symbol = '/';
        calcRes = b === 0 ? 'Erro: Não é possível dividir por zero!' : a / b;
      }

      setMessages([
        { id: '1', type: 'system', text: '$ python calculadora.py' },
        { id: '2', type: 'menu', text: INITIAL_MENU },
        { id: '3', type: 'prompt', text: 'Escolha uma opção (0 a 4): ' },
        { id: '4', type: 'user', text: op },
        { id: '5', type: 'prompt', text: 'Digite o primeiro número: ' },
        { id: '6', type: 'user', text: a.toString() },
        { id: '7', type: 'prompt', text: 'Digite o segundo número: ' },
        { id: '8', type: 'user', text: b.toString() },
        {
          id: '9',
          type: typeof calcRes === 'string' ? 'error' : 'result',
          text:
            typeof calcRes === 'string'
              ? `\n>>> ${calcRes}`
              : `\n>>> Resultado: ${a} ${symbol} ${b} = ${calcRes}`,
        },
        { id: '10', type: 'menu', text: INITIAL_MENU },
        { id: '11', type: 'prompt', text: 'Escolha uma opção (0 a 4): ' },
      ]);
      setCurrentStep('WAIT_OPTION');
    }, 150);
  };

  // REPL execution
  const handleReplSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = replInput.trim();
    if (!cmd) return;

    const newMsgs = [
      ...messages,
      { id: Date.now().toString(), type: 'user' as const, text: `>>> ${cmd}` },
    ];

    try {
      let output = '';
      if (cmd.startsWith('print(') && cmd.endsWith(')')) {
        const inner = cmd.slice(6, -1);
        output = inner.replace(/^["']|["']$/g, '');
      } else if (cmd.includes('somar(')) {
        const match = /somar\(\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/.exec(cmd);
        if (match) output = (parseFloat(match[1]) + parseFloat(match[2])).toString();
      } else if (cmd.includes('dividir(')) {
        const match = /dividir\(\s*([\d.]+)\s*,\s*([\d.]+)\s*\)/.exec(cmd);
        if (match) {
          const d2 = parseFloat(match[2]);
          output = d2 === 0 ? 'Erro: Não é possível dividir por zero!' : (parseFloat(match[1]) / d2).toString();
        }
      } else {
        // Safe evaluation of simple math
        const sanitized = cmd.replace(/\*\*/g, '^').replace(/[^0-9+\-*/^.() ]/g, '');
        if (sanitized) {
          const evalMath = Function(`'use strict'; return (${sanitized.replace(/\^/g, '**')})`)();
          output = evalMath.toString();
        } else {
          output = `Comando interpretado: ${cmd}`;
        }
      }

      newMsgs.push({
        id: (Date.now() + 1).toString(),
        type: 'result',
        text: output,
      });
    } catch {
      newMsgs.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `SyntaxError: comando inválido '${cmd}'`,
      });
    }

    setMessages(newMsgs);
    setReplInput('');
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <TerminalIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>terminal_python — bash — 80x24</span>
          </div>
        </div>

        {/* Mode selector buttons */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setMode('app');
              resetCalculator();
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'app'
                ? 'bg-slate-800 text-amber-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Execução: calculadora.py
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('repl');
              setMessages([
                { id: '1', type: 'system', text: 'Python 3.12.0 (Interactive Console REPL)' },
                { id: '2', type: 'system', text: 'Digite expressões como: somar(15, 25), 10 * 8, ou 2 ** 6' },
              ]);
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              mode === 'repl'
                ? 'bg-slate-800 text-amber-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Console REPL (&gt;&gt;&gt;)
          </button>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetCalculator}
            title="Reiniciar programa Python"
            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={clearTerminal}
            title="Limpar tela do terminal"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Test Bar (shortcuts for quick learner demonstration) */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Testes Rápidos:
        </span>
        <button
          onClick={() => runQuickTest('1', 25.5, 14.5)}
          className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded border border-slate-700/60 transition-colors"
        >
          25.5 + 14.5 (Adição)
        </button>
        <button
          onClick={() => runQuickTest('2', 100, 37)}
          className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded border border-slate-700/60 transition-colors"
        >
          100 - 37 (Subtração)
        </button>
        <button
          onClick={() => runQuickTest('3', 8, 7.5)}
          className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded border border-slate-700/60 transition-colors"
        >
          8 * 7.5 (Multiplicação)
        </button>
        <button
          onClick={() => runQuickTest('4', 15, 0)}
          className="px-2 py-1 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 rounded border border-rose-800/60 transition-colors"
        >
          15 / 0 (Divisão por zero!)
        </button>
      </div>

      {/* Output Console Body */}
      <div className="flex-1 p-4 font-mono text-xs md:text-sm text-slate-200 overflow-y-auto space-y-2 select-text">
        {messages.map((msg) => {
          if (msg.type === 'system') {
            return (
              <div key={msg.id} className="text-sky-400 whitespace-pre-wrap">
                {msg.text}
              </div>
            );
          }
          if (msg.type === 'menu') {
            return (
              <div key={msg.id} className="text-amber-300/90 whitespace-pre-wrap leading-tight my-2">
                {msg.text}
              </div>
            );
          }
          if (msg.type === 'user') {
            return (
              <div key={msg.id} className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="text-slate-500 font-normal">↳</span>
                <span>{msg.text}</span>
              </div>
            );
          }
          if (msg.type === 'prompt') {
            return (
              <div key={msg.id} className="text-amber-200/90 font-medium flex items-center gap-1">
                <span className="text-amber-500">?</span>
                <span>{msg.text}</span>
              </div>
            );
          }
          if (msg.type === 'result') {
            return (
              <div key={msg.id} className="text-emerald-300 font-bold bg-emerald-950/40 p-2.5 rounded border border-emerald-800/50 my-2 whitespace-pre-wrap">
                {msg.text}
              </div>
            );
          }
          if (msg.type === 'error') {
            return (
              <div key={msg.id} className="text-rose-300 font-semibold bg-rose-950/40 p-2.5 rounded border border-rose-800/50 my-2 whitespace-pre-wrap">
                {msg.text}
              </div>
            );
          }
          return null;
        })}

        <div ref={terminalEndRef} />
      </div>

      {/* Input Bar at Bottom */}
      <div className="p-3 bg-slate-900 border-t border-slate-800">
        {mode === 'app' ? (
          currentStep === 'FINISHED' ? (
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Programa finalizado (opção 0). Deseja recomeçar?
              </span>
              <button
                onClick={resetCalculator}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar Calculadora
              </button>
            </div>
          ) : (
            <form onSubmit={handleUserInput} className="flex items-center gap-2">
              <span className="text-amber-400 font-mono font-bold select-none">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  currentStep === 'WAIT_OPTION'
                    ? 'Digite a opção (ex: 1 para somar, 0 para sair)...'
                    : currentStep === 'WAIT_NUM1'
                    ? 'Digite o 1º número (ex: 15 ou 7.5)...'
                    : 'Digite o 2º número (ex: 3)...'
                }
                className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 font-mono text-sm px-3 py-2 rounded border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="flex items-center gap-1 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded transition-colors cursor-pointer"
              >
                <span>Enviar</span>
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleReplSubmit} className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono font-bold select-none">&gt;&gt;&gt;</span>
            <input
              type="text"
              autoFocus
              value={replInput}
              onChange={(e) => setReplInput(e.target.value)}
              placeholder="Digite código Python (ex: somar(10, 5) ou 12 * 4)..."
              className="flex-1 bg-slate-950 text-slate-100 placeholder-slate-500 font-mono text-sm px-3 py-2 rounded border border-slate-700 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              <span>Executar</span>
              <Play className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
