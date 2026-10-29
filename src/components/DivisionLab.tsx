import React, { useState } from 'react';
import {
  Divide,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Code2,
} from 'lucide-react';

export const DivisionLab: React.FC = () => {
  const [dividend, setDividend] = useState<number>(10);
  const [divisor, setDivisor] = useState<number>(3);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const isZero = divisor === 0;

  // Division calculations
  const floatDiv = isZero ? null : dividend / divisor;
  const floorDiv = isZero ? null : Math.floor(dividend / divisor);
  const modDiv = isZero ? null : ((dividend % divisor) + divisor) % divisor; // python style modulo

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeSimpleCheck = `# 1. Função de divisão com verificação if/else
def dividir(a, b):
    # Antes de dividir, verificamos se o divisor (b) é zero!
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

# Exemplo de uso:
resultado = dividir(10, 2)
print("Resultado:", resultado)  # Exibe: 5.0`;

  const codeInteractiveInput = `# 2. Pedindo valores para o usuário no terminal
dividendo = float(input("Digite o dividendo (número a ser dividido): "))
divisor = float(input("Digite o divisor (por quem vai dividir): "))

if divisor == 0:
    print("Aviso: Na matemática e no Python, divisão por zero não existe!")
else:
    resultado = dividendo / divisor
    print(f"Resultado: {dividendo} / {divisor} = {resultado:.2f}")`;

  const codeTryExcept = `# 3. Tratamento profissional com try / except
try:
    num1 = float(input("Primeiro número: "))
    num2 = float(input("Segundo número: "))
    resultado = num1 / num2
    print(f"Resultado: {resultado}")
except ZeroDivisionError:
    print("Erro capturado: Tentativa de divisão por zero!")
except ValueError:
    print("Erro: Por favor, digite apenas números válidos!")`;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Divide className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">
              Guia Completo: Como Calcular Divisão em Python
            </h2>
            <p className="text-xs text-slate-400">
              Operadores <code className="text-amber-300 font-mono">/</code>,{' '}
              <code className="text-amber-300 font-mono">//</code> e{' '}
              <code className="text-amber-300 font-mono">%</code>, prevenção de erros e exemplos práticos.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          Em Python, calcular uma divisão é tão simples quanto usar uma barra inclinada (<code className="text-amber-300 font-mono">/</code>). No entanto, há três detalhes essenciais que todo programador iniciante precisa dominar: o tipo de retorno (<code className="text-sky-300 font-mono">float</code>), os diferentes operadores de divisão e como proteger seu código contra a temida divisão por zero.
        </p>
      </div>

      {/* Interactive Division Laboratory */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Laboratório Interativo de Divisão</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Altere o dividendo e o divisor abaixo para ver o comportamento dos 3 operadores do Python ao vivo.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setDividend(10);
                setDivisor(3);
              }}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-mono"
            >
              10 ÷ 3
            </button>
            <button
              onClick={() => {
                setDividend(20);
                setDivisor(4);
              }}
              className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 font-mono"
            >
              20 ÷ 4
            </button>
            <button
              onClick={() => {
                setDividend(10);
                setDivisor(0);
              }}
              className="px-2.5 py-1 text-xs bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 rounded font-mono"
            >
              10 ÷ 0 (Erro!)
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <label className="text-xs font-mono text-slate-400 block mb-1">
              1. Dividendo (<span className="text-amber-400 font-semibold">o número a ser dividido</span>):
            </label>
            <input
              type="number"
              step="any"
              value={dividend}
              onChange={(e) => setDividend(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono text-lg focus:outline-none focus:border-amber-400"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Exemplo: total de moedas, valor da conta, metros</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <label className="text-xs font-mono text-slate-400 block mb-1">
              2. Divisor (<span className="text-amber-400 font-semibold">quem divide</span>):
            </label>
            <input
              type="number"
              step="any"
              value={divisor}
              onChange={(e) => setDivisor(parseFloat(e.target.value) || 0)}
              className={`w-full bg-slate-900 border rounded-lg px-3 py-2 font-mono text-lg focus:outline-none ${
                isZero
                  ? 'border-rose-500 text-rose-300'
                  : 'border-slate-700 text-slate-100 focus:border-amber-400'
              }`}
            />
            <span className="text-[11px] text-slate-500 mt-1 block">Exemplo: número de amigos para dividir</span>
          </div>
        </div>

        {/* Zero warning if divisor is 0 */}
        {isZero ? (
          <div className="p-4 bg-rose-950/40 border border-rose-800/80 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>ZeroDivisionError: division by zero</span>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              O divisor é <strong>0</strong>! Se você executar <code className="bg-slate-950 px-1 py-0.5 rounded font-mono text-rose-300">{dividend} / 0</code> sem testar com <code className="bg-slate-950 px-1 py-0.5 rounded font-mono text-amber-300">if divisor == 0:</code>, o Python interrompe o programa instantaneamente.
            </p>
          </div>
        ) : (
          /* Live Results of the 3 Operators */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Operator 1: / */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400 font-semibold uppercase">1. Divisão Padrão</span>
                  <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-mono rounded">
                    Operador /
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-400 mb-1">
                  {dividend} / {divisor} =
                </div>
                <div className="text-xl font-bold font-mono text-amber-300">
                  {floatDiv !== null && (Number.isInteger(floatDiv) ? floatDiv.toFixed(1) : floatDiv.toFixed(4).replace(/\.?0+$/, ''))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                Sempre retorna um número decimal (<strong className="text-slate-300">float</strong>), mesmo que a divisão seja exata (ex: 10 / 2 = 5.0).
              </p>
            </div>

            {/* Operator 2: // */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400 font-semibold uppercase">2. Divisão Inteira</span>
                  <span className="px-1.5 py-0.5 bg-sky-500/10 text-sky-400 text-xs font-mono rounded">
                    Operador //
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-400 mb-1">
                  {dividend} // {divisor} =
                </div>
                <div className="text-xl font-bold font-mono text-sky-300">
                  {floorDiv}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                Retorna apenas a parte inteira (o quociente), descartando tudo após a vírgula.
              </p>
            </div>

            {/* Operator 3: % */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400 font-semibold uppercase">3. Resto da Divisão</span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-mono rounded">
                    Operador %
                  </span>
                </div>
                <div className="font-mono text-xs text-slate-400 mb-1">
                  {dividend} % {divisor} =
                </div>
                <div className="text-xl font-bold font-mono text-emerald-300">
                  {modDiv}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                Retorna o resto da divisão. Se for <strong className="text-slate-300">0</strong>, a divisão é perfeitamente exata!
              </p>
            </div>
          </div>
        )}

        {/* Mathematical verification identity */}
        {!isZero && (
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between flex-wrap gap-2">
            <span className="text-slate-400">Prova Real da Matemática:</span>
            <span className="text-amber-300 font-semibold">
              {dividend} = ({divisor} × {floorDiv}) + {modDiv}
            </span>
          </div>
        )}
      </div>

      {/* The 4 Core Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lesson 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center">
              1
            </span>
            <h4 className="text-base font-semibold text-slate-100">
              O Operador Básico de Divisão (<code className="text-amber-300">/</code>)
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Para dividir qualquer número em Python, basta colocar uma barra <code className="text-amber-300 font-mono">/</code> entre os dois números ou variáveis:
          </p>
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
{`a = 15
b = 3
resultado = a / b
print(resultado)  # Exibe 5.0 (sempre com ponto decimal!)`}
          </pre>
          <p className="text-xs text-slate-400 italic">
            Mesmo que a conta seja exata (como 15 / 3 = 5), o Python retorna <code className="text-slate-300">5.0</code> do tipo <code className="text-sky-300">float</code>.
          </p>
        </div>

        {/* Lesson 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center">
              2
            </span>
            <h4 className="text-base font-semibold text-slate-100">
              Cuidado: Convertendo a Entrada com <code className="text-sky-300">float()</code>
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Se você for ler os números digitados pelo usuário com <code className="text-sky-300 font-mono">input()</code>, você <strong>DEVE</strong> converter com <code className="text-sky-300 font-mono">float()</code>:
          </p>
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
{`# CERTO:
num1 = float(input("Digite o dividendo: "))
num2 = float(input("Digite o divisor: "))
divisao = num1 / num2

# ERRADO:
# num1 = input("...")  <- Isso é texto!
# num1 / num2          <- Causará TypeError!`}
          </pre>
        </div>

        {/* Lesson 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center">
              3
            </span>
            <h4 className="text-base font-semibold text-slate-100">
              Prevenindo a Divisão por Zero
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sempre faça uma pergunta com <code className="text-amber-300 font-mono">if</code> antes de dividir, garantindo que o segundo número não seja zero:
          </p>
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
{`if num2 == 0:
    print("Erro: Não é possível dividir por zero!")
else:
    resultado = num1 / num2
    print(f"Resultado: {resultado}")`}
          </pre>
        </div>

        {/* Lesson 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 font-bold font-mono text-xs flex items-center justify-center">
              4
            </span>
            <h4 className="text-base font-semibold text-slate-100">
              Formatando Casas Decimais com f-strings
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Algumas divisões geram dízimas (como 10 / 3 = 3.33333333...). Você pode limitar para 2 casas usando <code className="text-amber-300 font-mono">:.2f</code>:
          </p>
          <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 overflow-x-auto">
{`resultado = 10 / 3

# Exibe apenas 2 casas após o ponto decimal:
print(f"Resultado: {resultado:.2f}")  # 3.33

# Ou arredondando com a função round():
print(round(resultado, 2))            # 3.33`}
          </pre>
        </div>
      </div>

      {/* Copyable Code Snippets */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-100">
          Modelos de Código Prontos para Testar e Usar
        </h3>

        {/* Snippet 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-200">
              Opção 1: Função Simples com Proteção
            </span>
            <button
              onClick={() => handleCopy(codeSimpleCheck, 'simple')}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition-colors"
            >
              {copiedCode === 'simple' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 rounded-lg font-mono text-xs text-amber-300 overflow-x-auto">
            {codeSimpleCheck}
          </pre>
        </div>

        {/* Snippet 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-200">
              Opção 2: Programa Interativo com input() e f-string
            </span>
            <button
              onClick={() => handleCopy(codeInteractiveInput, 'interactive')}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition-colors"
            >
              {copiedCode === 'interactive' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto">
            {codeInteractiveInput}
          </pre>
        </div>

        {/* Snippet 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-200">
              Opção 3: Tratamento com try / except (Nível Profissional)
            </span>
            <button
              onClick={() => handleCopy(codeTryExcept, 'tryexcept')}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded border border-slate-700 transition-colors"
            >
              {copiedCode === 'tryexcept' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 bg-slate-950 rounded-lg font-mono text-xs text-sky-300 overflow-x-auto">
            {codeTryExcept}
          </pre>
        </div>
      </div>
    </div>
  );
};
