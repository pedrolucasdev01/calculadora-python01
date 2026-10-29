import React, { useState } from 'react';
import { Play, ArrowRight, ShieldCheck, AlertOctagon, Sparkles, Check, HelpCircle } from 'lucide-react';

export const VisualExecutionFlow: React.FC = () => {
  const [numA, setNumA] = useState<number>(10);
  const [numB, setNumB] = useState<number>(2);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');

  const getFunctionName = () => {
    switch (operation) {
      case '+':
        return 'somar';
      case '-':
        return 'subtrair';
      case '*':
        return 'multiplicar';
      case '/':
        return 'dividir';
    }
  };

  const isZeroDivision = operation === '/' && numB === 0;

  const calculate = () => {
    switch (operation) {
      case '+':
        return numA + numB;
      case '-':
        return numA - numB;
      case '*':
        return numA * numB;
      case '/':
        return isZeroDivision ? 'Erro: Não é possível dividir por zero!' : numA / numB;
    }
  };

  const rawResult = calculate();
  const formattedResult =
    typeof rawResult === 'number'
      ? Number.isInteger(rawResult)
        ? rawResult.toString()
        : rawResult.toFixed(2)
      : rawResult;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <span>Simulador do Fluxo de Execução</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Veja exatamente como as variáveis viajam entre o teclado do usuário, os parâmetros da função Python e o retorno final.
          </p>
        </div>

        {/* Zero division test shortcut */}
        <button
          onClick={() => {
            setOperation('/');
            setNumA(10);
            setNumB(0);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 text-rose-300 text-xs font-medium rounded-lg transition-colors cursor-pointer self-start md:self-center"
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>Simular Divisão por Zero (10 ÷ 0)</span>
        </button>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-6 items-center">
        {/* Number A Input */}
        <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-mono text-slate-400 block mb-1">
            Variável <span className="text-amber-400 font-semibold">num1</span> (float):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="any"
              value={numA}
              onChange={(e) => setNumA(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex gap-1.5 mt-2">
            {[5, 10, 25, 100].map((val) => (
              <button
                key={val}
                onClick={() => setNumA(val)}
                className="px-2 py-0.5 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-mono"
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Operator selector */}
        <div className="md:col-span-4 flex flex-col items-center justify-center bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-mono text-slate-400 block mb-2">
            Operação Matemática:
          </label>
          <div className="grid grid-cols-4 gap-2 w-full">
            {(['+', '-', '*', '/'] as const).map((op) => {
              const symbols: Record<string, string> = {
                '+': 'Adição',
                '-': 'Subtração',
                '*': 'Multiplicação',
                '/': 'Divisão',
              };
              return (
                <button
                  key={op}
                  onClick={() => setOperation(op)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                    operation === op
                      ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                  title={symbols[op]}
                >
                  <span className="text-lg font-mono">{op}</span>
                  <span className="text-[9px] uppercase tracking-wider opacity-80">
                    {op === '+' ? 'Soma' : op === '-' ? 'Sub' : op === '*' ? 'Mult' : 'Div'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Number B Input */}
        <div className="md:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <label className="text-xs font-mono text-slate-400 block mb-1">
            Variável <span className="text-amber-400 font-semibold">num2</span> (float):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="any"
              value={numB}
              onChange={(e) => setNumB(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-base focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex gap-1.5 mt-2">
            {[0, 2, 4, 10].map((val) => (
              <button
                key={val}
                onClick={() => setNumB(val)}
                className={`px-2 py-0.5 text-[11px] rounded font-mono ${
                  val === 0
                    ? 'bg-rose-950/60 border border-rose-800/80 text-rose-300 hover:bg-rose-900'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pipeline Diagram */}
      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
        <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Passo a Passo na Memória do Python:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          {/* Step 1: Input reading */}
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-slate-500 font-mono">1. Leitura</span>
              <p className="font-mono text-amber-300 mt-1">
                num1 = {numA}
                <br />
                num2 = {numB}
              </p>
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              Valores convertidos com <code className="text-sky-300">float()</code>
            </span>
          </div>

          {/* Step 2: Function Call */}
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-slate-500 font-mono">2. Invocação</span>
              <p className="font-mono text-yellow-300 mt-1">
                {getFunctionName()}(a={numA}, b={numB})
              </p>
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              Passagem de parâmetros para a função
            </span>
          </div>

          {/* Step 3: Condition check / logic */}
          <div
            className={`p-3 rounded-lg border flex flex-col justify-between ${
              isZeroDivision
                ? 'bg-rose-950/40 border-rose-800/80'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div>
              <span
                className={`font-mono ${isZeroDivision ? 'text-rose-400' : 'text-slate-500'}`}
              >
                3. Condição
              </span>
              {operation === '/' ? (
                isZeroDivision ? (
                  <p className="font-mono text-rose-300 mt-1 font-semibold">
                    b == 0 → True!
                    <br />
                    Ativa proteção!
                  </p>
                ) : (
                  <p className="font-mono text-emerald-300 mt-1">
                    b == 0 → False
                    <br />
                    Divisão permitida
                  </p>
                )
              ) : (
                <p className="font-mono text-sky-300 mt-1">
                  Operador direto
                  <br />
                  Sem restrições
                </p>
              )}
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              {isZeroDivision ? 'Evitou ZeroDivisionError' : 'Executa o cálculo'}
            </span>
          </div>

          {/* Step 4: Return */}
          <div
            className={`p-3 rounded-lg border flex flex-col justify-between ${
              isZeroDivision
                ? 'bg-rose-950/40 border-rose-800/80'
                : 'bg-emerald-950/30 border-emerald-800/60'
            }`}
          >
            <div>
              <span
                className={`font-mono ${
                  isZeroDivision ? 'text-rose-400' : 'text-emerald-400'
                }`}
              >
                4. Retorno (return)
              </span>
              <p
                className={`font-mono font-bold mt-1 ${
                  isZeroDivision ? 'text-rose-300 text-xs' : 'text-emerald-300 text-sm'
                }`}
              >
                {formattedResult}
              </p>
            </div>
            <span className="text-[11px] text-slate-400 mt-2">
              Exibido com <code className="text-amber-300">f-string</code>
            </span>
          </div>
        </div>

        {/* Generated Live Python Equivalent Code */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <span className="text-xs text-slate-400 font-mono block mb-2">
            Código Python executado nesta simulação:
          </span>
          <pre className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 overflow-x-auto border border-slate-800">
            {operation === '/'
              ? `# Verificação de segurança na divisão
if ${numB} == 0:
    resultado = "Erro: Não é possível dividir por zero!"
else:
    resultado = ${numA} / ${numB}  # -> ${formattedResult}

print(f"Resultado: {resultado}")`
              : `# Execução da função ${getFunctionName()}
resultado = ${getFunctionName()}(${numA}, ${numB})  # -> ${formattedResult}
print(f"Resultado: {resultado}")`}
          </pre>
        </div>
      </div>
    </div>
  );
};
