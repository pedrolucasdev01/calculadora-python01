import { CodeLineAnnotation, ConceptExplanation, PracticeChallenge } from '../types';

export const INTERACTIVE_CALCULATOR_CODE = `# ==============================================================================
# CALCULADORA SIMPLES EM PYTHON - 4 OPERAÇÕES BÁSICAS
# Criada especialmente para quem está começando a programar!
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
# Uma função é um bloco reutilizável de código que realiza uma tarefa específica.
# ------------------------------------------------------------------------------

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """
    Retorna a divisão do primeiro número pelo segundo.
    Inclui verificação para evitar erro de divisão por zero!
    """
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b


# ------------------------------------------------------------------------------
# 2. FUNÇÃO PARA EXIBIR O MENU DE OPÇÕES
# ------------------------------------------------------------------------------
def exibir_menu():
    print("\\n" + "=" * 32)
    print("      CALCULADORA PYTHON      ")
    print("=" * 32)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("0 - Sair do programa")
    print("=" * 32)


# ------------------------------------------------------------------------------
# 3. PROGRAMA PRINCIPAL (LOOP CONTÍNUO COM WHILE)
# O loop 'while True' mantém a calculadora aberta até o usuário escolher '0'.
# ------------------------------------------------------------------------------
def calculadora():
    print("Bem-vindo(a) à sua Calculadora em Python!")
    
    while True:
        # Exibe o menu na tela
        exibir_menu()
        
        # Lê a escolha da operação feita pelo usuário
        opcao = input("Escolha uma opção (0 a 4): ").strip()
        
        # Opção de saída
        if opcao == "0":
            print("\\nObrigado por usar a calculadora. Bons estudos na programação! Até logo!")
            break
            
        # Validação: verifica se a opção digitada é válida
        if opcao not in ["1", "2", "3", "4"]:
            print("\\n[!] Opção inválida! Por favor, digite um número de 0 a 4.")
            continue  # Volta para o início do loop sem pedir os números
            
        # Leitura dos números que serão calculados
        try:
            # float() permite que o usuário use números decimais (ex: 7.5 ou 10)
            num1 = float(input("\\nDigite o primeiro número: "))
            num2 = float(input("Digite o segundo número: "))
        except ValueError:
            print("\\n[!] Erro: Você deve digitar números válidos (ex: 10 ou 4.5)!")
            continue

        # Realiza a operação correspondente à escolha
        if opcao == "1":
            resultado = somar(num1, num2)
            print(f"\\n>>> Resultado: {num1} + {num2} = {resultado}")
            
        elif opcao == "2":
            resultado = subtrair(num1, num2)
            print(f"\\n>>> Resultado: {num1} - {num2} = {resultado}")
            
        elif opcao == "3":
            resultado = multiplicar(num1, num2)
            print(f"\\n>>> Resultado: {num1} * {num2} = {resultado}")
            
        elif opcao == "4":
            resultado = dividir(num1, num2)
            if isinstance(resultado, str):
                # Se o resultado for a mensagem de erro da divisão por zero
                print(f"\\n>>> {resultado}")
            else:
                print(f"\\n>>> Resultado: {num1} / {num2} = {resultado}")


# Executa o programa principal apenas quando este arquivo for rodado diretamente
if __name__ == "__main__":
    calculadora()
`;

export const SIMPLE_CALCULATOR_CODE = `# Calculadora Básica Direta em Python (Sem Loops)
# Ideal para entender funções e condicionais em pouquíssimas linhas

# Funções das 4 operações básicas
def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero!"
    return a / b

# Entrada de dados do usuário
print("Operações: 1=Soma | 2=Subtração | 3=Multiplicação | 4=Divisão")
operacao = input("Escolha a operação (1/2/3/4): ")

num1 = float(input("Primeiro número: "))
num2 = float(input("Segundo número: "))

# Estrutura de decisão if / elif / else
if operacao == '1':
    print(f"Resultado: {num1} + {num2} = {somar(num1, num2)}")
elif operacao == '2':
    print(f"Resultado: {num1} - {num2} = {subtrair(num1, num2)}")
elif operacao == '3':
    print(f"Resultado: {num1} * {num2} = {multiplicar(num1, num2)}")
elif operacao == '4':
    print(f"Resultado: {num1} / {num2} = {dividir(num1, num2)}")
else:
    print("Operação inválida!")
`;

export const ADVANCED_CALCULATOR_CODE = `# Calculadora Profissional com Dicionário de Operações e Lambdas
# Uma forma muito elegante e pythônica de criar a mesma calculadora!

import operator

# Dicionário mapeando opções para símbolos e funções
OPERACOES = {
    '1': ('+', operator.add),
    '2': ('-', operator.sub),
    '3': ('*', operator.mul),
    '4': ('/', lambda a, b: "Erro: Divisão por zero!" if b == 0 else a / b),
}

def executar_calculo(opcao, a, b):
    simbolo, funcao = OPERACOES[opcao]
    resultado = funcao(a, b)
    return f"{a} {simbolo} {b} = {resultado}"

# Teste direto
print("1: Adição | 2: Subtração | 3: Multiplicação | 4: Divisão")
escolha = input("Opção: ").strip()

if escolha in OPERACOES:
    x = float(input("Número 1: "))
    y = float(input("Número 2: "))
    print("Resultado:", executar_calculo(escolha, x, y))
else:
    print("Opção inválida.")
`;

export const CODE_LINE_ANNOTATIONS: CodeLineAnnotation[] = [
  {
    line: 12,
    code: 'def somar(a, b):',
    category: 'function',
    title: 'Definição de Função (def)',
    explanation: 'A palavra-chave "def" cria uma nova função chamada "somar". Os parênteses recebem "a" e "b", que são chamados de parâmetros (os valores que a função precisa para trabalhar).',
    beginnerTip: 'Sempre termine a linha de definição com dois pontos (:). Em Python, os dois pontos indicam que o bloco de código a seguir está associado a esta linha.',
    pitfall: 'Não esqueça de identar (dar 4 espaços) no código dentro da função.'
  },
  {
    line: 14,
    code: '    return a + b',
    category: 'function',
    title: 'Retorno de Valor (return)',
    explanation: 'O comando "return" envia o resultado da soma de volta para quem chamou a função. Sem return, a função devolveria "None" por padrão.',
    beginnerTip: 'Diferença crucial: "return" devolve um valor para ser guardado ou usado depois; "print" apenas mostra texto na tela.',
    pitfall: 'Qualquer código colocado abaixo do return dentro da mesma função nunca será executado.'
  },
  {
    line: 24,
    code: 'def dividir(a, b):',
    category: 'function',
    title: 'Função de Divisão com Tratamento',
    explanation: 'A divisão requer atenção especial em matemática e programação, pois dividir qualquer número por zero é matematicamente impossível.',
    beginnerTip: 'Sempre pense em casos especiais e valores extremos ao criar funções.',
  },
  {
    line: 29,
    code: '    if b == 0:',
    category: 'condition',
    title: 'Verificação de Divisão por Zero',
    explanation: 'Verificamos se o divisor "b" é exatamente igual a zero usando o operador de comparação "==".',
    beginnerTip: 'Cuidado para não confundir: "=" serve para guardar valor em uma variável (atribuição), enquanto "==" serve para comparar se dois valores são iguais.',
    pitfall: 'Se você tentar fazer "10 / 0" diretamente, o Python interrompe o programa com o erro ZeroDivisionError.'
  },
  {
    line: 49,
    code: '    while True:',
    category: 'loop',
    title: 'Loop Infinito Controlado (while True)',
    explanation: 'O loop "while True" cria uma repetição contínua. Ele faz a calculadora continuar ativa após cada cálculo, em vez de fechar imediatamente.',
    beginnerTip: 'Para sair de um "while True", usamos a instrução "break" quando uma condição for atendida (como o usuário escolher a opção 0).',
    pitfall: 'Crie sempre uma condição com "break" para permitir a saída, senão o programa ficará travado em loop eterno.'
  },
  {
    line: 54,
    code: '        opcao = input("Escolha uma opção (0 a 4): ").strip()',
    category: 'input',
    title: 'Lendo Texto do Usuário (input)',
    explanation: 'A função input() pausa o programa e aguarda o usuário digitar algo e pressionar Enter. O método .strip() remove espaços vazios acidentais antes ou depois.',
    beginnerTip: 'O input() SEMPRE retorna o dado no formato de texto (string). Por isso comparamos com aspas: "0", "1", "2".',
  },
  {
    line: 58,
    code: '            break',
    category: 'loop',
    title: 'Interrupção de Loop (break)',
    explanation: 'Quando o usuário digita "0", o comando break encerra imediatamente o loop while, permitindo que o programa finalize com elegância.',
    beginnerTip: 'O break só interrompe o loop mais interno onde ele está inserido.',
  },
  {
    line: 63,
    code: '            continue',
    category: 'loop',
    title: 'Pular para Próxima Volta (continue)',
    explanation: 'Se o usuário digitar uma opção que não existe (ex: 9 ou "abc"), o comando continue pula o restante do código e recomeça o loop no menu.',
    beginnerTip: 'Use continue para evitar aninhar muitos if/else uns dentro dos outros.',
  },
  {
    line: 66,
    code: '        try:',
    category: 'error_handling',
    title: 'Captura Segura de Erros (try / except)',
    explanation: 'O bloco try tenta converter o texto digitado em número. Se o usuário digitar "banana" em vez de um número, o programa não quebra feio.',
    beginnerTip: 'Programas amigáveis sempre antecipam que usuários podem digitar coisas erradas por engano.',
  },
  {
    line: 68,
    code: '            num1 = float(input("\\nDigite o primeiro número: "))',
    category: 'input',
    title: 'Conversão para Número Decimal (float)',
    explanation: 'A função float() converte o texto retornado por input() em um número com casas decimais (ponto flutuante). Assim podemos calcular tanto 10 quanto 3.14.',
    beginnerTip: 'No Python usamos ponto (.) para decimais, como 5.5, e não vírgula (,).',
    pitfall: 'Se esquecer de colocar float() ou int(), o Python somará como texto: "5" + "5" resultará em "55" e não em 10!'
  },
  {
    line: 76,
    code: '        if opcao == "1":',
    category: 'condition',
    title: 'Decisão Múltipla com if / elif / else',
    explanation: 'Comparamos a opção escolhida. "if" testa a primeira opção. Se não for ela, o Python testa as seguintes com "elif" (else if).',
    beginnerTip: 'O Python testa os blocos de cima para baixo e executa apenas o primeiro que for verdadeiro.',
  },
  {
    line: 78,
    code: '            print(f"\\n>>> Resultado: {num1} + {num2} = {resultado}")',
    category: 'output',
    title: 'F-Strings (Formatação Moderna)',
    explanation: 'O "f" antes das aspas indica uma f-string (format string). Qualquer variável ou expressão dentro de chaves { } é substituída automaticamente pelo seu valor.',
    beginnerTip: 'As f-strings foram introduzidas no Python 3.6 e são a maneira mais rápida, limpa e legível de juntar textos e variáveis.',
  },
  {
    line: 96,
    code: 'if __name__ == "__main__":',
    category: 'header',
    title: 'Boas Práticas: Execução Direta (__main__)',
    explanation: 'Esta linha é um padrão muito famoso no Python: ela garante que a função calculadora() só seja chamada se você executar este arquivo diretamente.',
    beginnerTip: 'Se outro programador importar suas funções somar() e dividir() em outro arquivo com "import calculadora", ele não vai disparar o menu acidentalmente.',
  }
];

export const CONCEPTS_EXPLANATIONS: ConceptExplanation[] = [
  {
    id: 'functions',
    title: 'Funções (def e return)',
    iconName: 'Boxes',
    tagline: 'Organização, clareza e reaproveitamento de lógica',
    summary: 'Funções são pequenos "programas dentro do programa". Em vez de espalhar contas matemáticas pelo código, criamos funções dedicadas para somar, subtrair, multiplicar e dividir.',
    pythonSyntax: 'def nome_da_funcao(parametro1, parametro2):\\n    resultado = parametro1 + parametro2\\n    return resultado',
    keyPoints: [
      'A palavra-chave "def" define uma nova função.',
      'Parâmetros entre parênteses funcionam como ingredientes que a função precisa.',
      'O comando "return" devolve o resultado para quem chamou.',
      'Funções evitam repetição de código (princípio DRY - Don\'t Repeat Yourself).'
    ],
    whyImportant: 'Ao separar cada operação matemática em sua própria função, seu código fica fácil de testar, fácil de ler e muito simples de expandir futuramente.',
    commonMistake: {
      wrong: 'def somar(a, b):\\n    print(a + b)  # Só imprime, não devolve!',
      right: 'def somar(a, b):\\n    return a + b  # Devolve o valor para ser usado!',
      reason: 'Se você usar print em vez de return, você não conseguirá salvar o resultado em uma variável nem usá-lo em outros cálculos.'
    }
  },
  {
    id: 'input_conversion',
    title: 'Entrada e Tipos (input e float)',
    iconName: 'Keyboard',
    tagline: 'Como o Python conversa com o usuário e processa números',
    summary: 'A função input() lê tudo o que o usuário digita no teclado. Porém, o Python sempre armazena essa entrada como texto (string). Para fazer contas, precisamos converter para número.',
    pythonSyntax: '# Leitura pura (string / texto)\\ntexto = input("Digite algo: ")\\n\\n# Conversão direta para número decimal\\nnumero = float(input("Digite um número: "))',
    keyPoints: [
      'input() sempre devolve dados do tipo str (texto).',
      'float() converte texto em número decimal (com ponto flutuante, ex: 10.5).',
      'int() converteria apenas para inteiros (ex: 1, 2, 3), perdendo decimais.',
      '.strip() remove espaços vazios acidentais no início e no fim da digitação.'
    ],
    whyImportant: 'Computadores tratam texto e números de maneiras completamente distintas. Se você somar textos, o Python junta eles ("2" + "3" = "23"). Com float, ele calcula (2.0 + 3.0 = 5.0).',
    commonMistake: {
      wrong: 'a = input("Número 1: ")\\nb = input("Número 2: ")\\nprint(a + b)  # Se digitar 5 e 2, exibirá "52"!',
      right: 'a = float(input("Número 1: "))\\nb = float(input("Número 2: "))\\nprint(a + b)  # Exibirá 7.0!',
      reason: 'Sem a conversão com float(), o operador "+" faz concatenação de strings em vez de soma aritmética.'
    }
  },
  {
    id: 'conditionals',
    title: 'Decisões (if, elif e else)',
    iconName: 'GitFork',
    tagline: 'O caminho que o programa escolhe baseado na ação do usuário',
    summary: 'As estruturas condicionais permitem que o programa tome decisões lógicas dependendo da opção que o usuário digitou no menu (1, 2, 3, 4 ou 0).',
    pythonSyntax: 'if condicao_1:\\n    # executa se a condição 1 for verdadeira\\nelif condicao_2:\\n    # executa se a 1 for falsa e a 2 for verdadeira\\nelse:\\n    # executa se nenhuma das anteriores for verdadeira',
    keyPoints: [
      '"if" é a primeira pergunta que o programa faz.',
      '"elif" (abreviação de else if) serve para testar outras opções em sequência.',
      '"else" é o plano B caso nenhuma das condições anteriores seja atendida.',
      'O operador "==" compara se dois valores são iguais.'
    ],
    whyImportant: 'É o coração da inteligência da calculadora: saber se deve executar uma soma, uma subtração, encerrar o programa ou avisar que a opção é inválida.',
    commonMistake: {
      wrong: 'if opcao = "1":  # Erro de sintaxe!',
      right: 'if opcao == "1": # Correto! Dois sinais de igual.',
      reason: 'Um sinal só (=) atribui valor a uma variável. Dois sinais (==) comparam se são iguais.'
    }
  },
  {
    id: 'zero_division',
    title: 'Prevenção de Erros (Divisão por Zero)',
    iconName: 'ShieldAlert',
    tagline: 'Protegendo o programa contra travamentos matemáticos',
    summary: 'Na matemática elementar, a divisão por zero é indefinida. Se um programa tenta dividir um número por zero em Python, o interpretador lança uma exceção ZeroDivisionError e encerra o programa abruptamente.',
    pythonSyntax: 'def dividir(a, b):\\n    if b == 0:\\n        return "Erro: Não é possível dividir por zero!"\\n    return a / b',
    keyPoints: [
      'Sempre validamos o denominador antes de executar a divisão.',
      'Se b == 0, retornamos uma mensagem amigável em vez de quebrar.',
      'Tratar erros antes que aconteçam é uma prática essencial da programação profissional chamada "programação defensiva".'
    ],
    whyImportant: 'Um bom software nunca fecha de surpresa na cara do usuário. Mensagens explicativas ensinam o usuário e mantêm o sistema estável.',
    commonMistake: {
      wrong: 'def dividir(a, b):\\n    return a / b  # Quebra se b for zero!',
      right: 'def dividir(a, b):\\n    if b == 0:\\n        return "Erro: Divisão por zero!"\\n    return a / b',
      reason: 'Dividir por zero gera um crash imediato (ZeroDivisionError) se não for tratado.'
    }
  },
  {
    id: 'loops',
    title: 'Repetição e Menus (while True e break)',
    iconName: 'Repeat',
    tagline: 'Como fazer o programa ficar aberto para múltiplos cálculos',
    summary: 'Sem um loop, o programa rodaria uma única operação e fecharia a janela do terminal. Com while True, ele cria um ciclo contínuo, reexibindo o menu até que o usuário peça para sair.',
    pythonSyntax: 'while True:\\n    opcao = input("Digite 0 para sair: ")\\n    if opcao == "0":\\n        break  # Sai do loop\\n    print("Continuando...")',
    keyPoints: [
      '"while True" cria um laço que nunca para por conta própria.',
      '"break" é o freio de emergência: interrompe o laço quando necessário.',
      '"continue" reinicia a volta atual do loop pulando o restante do código.',
      'Fundamental para criar interfaces de linha de comando (CLI) interativas.'
    ],
    whyImportant: 'Proporciona uma experiência agradável onde o usuário pode calcular 10 vezes seguidas sem precisar reabrir o terminal.',
    commonMistake: {
      wrong: 'while True:\\n    print("Olá") # Esquecer de colocar um break ou condição de parada!',
      right: 'while True:\\n    # Sempre forneça uma forma do usuário sair do loop\\n    if opcao == "0":\\n        break',
      reason: 'Sem um comando break ou condição falsa, o programa entrará em loop infinito consumindo CPU.'
    }
  },
  {
    id: 'fstrings',
    title: 'Saídas Elegantes (f-strings)',
    iconName: 'Sparkles',
    tagline: 'A forma mais limpa de misturar texto com resultados numéricos',
    summary: 'As f-strings (strings formatadas) permitem incluir variáveis diretamente dentro de um texto usando chaves { }. Elas tornam mensagens como "Resultado: 5 + 3 = 8" fáceis de escrever e ler.',
    pythonSyntax: 'nome = "Ana"\\nidade = 20\\nprint(f"Olá, {nome}! Você tem {idade} anos.")',
    keyPoints: [
      'Basta colocar a letra "f" minúscula colada antes das aspas de abertura.',
      'Coloque variáveis ou expressões matemáticas dentro de { chaves }.',
      'Você também pode formatar casas decimais: f"{resultado:.2f}" mostra 2 casas decimais.',
      'Muito mais legível que a antiga concatenação com "+".'
    ],
    whyImportant: 'Substitui códigos longos e confusos como `print("Resultado: " + str(num1) + " + " + str(num2) + " = " + str(res))`.',
    commonMistake: {
      wrong: 'print("O resultado é: {resultado}")  # Esqueceu o f antes das aspas!',
      right: 'print(f"O resultado é: {resultado}") # Correto! Exibe o valor da variável.',
      reason: 'Sem a letra f inicial, o Python imprime as chaves literalmente como texto.'
    }
  }
];

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: 'challenge-1',
    title: '1. Adicionar Operação de Potência (Exponenciação)',
    difficulty: 'Fácil',
    description: 'Em Python, o operador de potência é indicado por dois asteriscos (**). Exemplo: 2 ** 3 = 8. Crie uma função chamada potencia(base, expoente) e adicione a opção 5 ao menu da calculadora!',
    hint: 'Use a mesma estrutura das outras funções: def potencia(base, expoente): return base ** expoente.',
    starterCode: `# 1. Crie a função de potência:
def potencia(a, b):
    # Dica: use o operador **
    pass

# 2. Adicione ao menu a opção "5 - Potência (**)"
# 3. Adicione um novo elif opcao == "5": no programa`,
    solutionCode: `def potencia(a, b):
    """Retorna a elevado à potência b (a ** b)."""
    return a ** b

# No menu:
# print("5 - Potência (**)")

# No loop:
# elif opcao == "5":
#     resultado = potencia(num1, num2)
#     print(f"\\n>>> Resultado: {num1} ** {num2} = {resultado}")`,
    solutionExplanation: 'O operador ** eleva a base ao expoente. Em Python, potências com números grandes funcionam com precisão arbitrária sem risco de estouro de memória!'
  },
  {
    id: 'challenge-2',
    title: '2. Resto da Divisão (Operador Módulo %)',
    difficulty: 'Fácil',
    description: 'O operador % calcula o resto de uma divisão inteira (muito usado para saber se um número é par ou ímpar). Exemplo: 10 % 3 = 1. Adicione a função resto(a, b) com proteção contra divisão por zero!',
    hint: 'Lembre-se de verificar se b == 0, exatamente como na função de divisão.',
    starterCode: `def resto_divisao(a, b):
    # Proteja contra divisão por zero e use o operador %
    pass`,
    solutionCode: `def resto_divisao(a, b):
    """Retorna o resto da divisão entre a e b."""
    if b == 0:
        return "Erro: Não é possível calcular resto de divisão por zero!"
    return a % b`,
    solutionExplanation: 'O operador de módulo (%) é fundamental na programação para ciclos, verificação de divisibilidade e paginações.'
  },
  {
    id: 'challenge-3',
    title: '3. Arredondar Resultados com round()',
    difficulty: 'Médio',
    description: 'Algumas divisões geram números decimais infinitos (ex: 10 / 3 = 3.3333333333333335). Modifique a exibição dos resultados para arredondar em no máximo 2 casas decimais.',
    hint: 'Você pode usar a função round(resultado, 2) ou formatar na f-string com {resultado:.2f}.',
    starterCode: `# Exemplo de resultado com muitas casas:
resultado = 10 / 3

# Como você formataria para mostrar apenas 3.33?`,
    solutionCode: `# Opção 1: Usando a função embutida round()
resultado_formatado = round(resultado, 2)
print(f"Resultado: {resultado_formatado}")

# Opção 2: Direto na f-string (mais elegante!)
print(f"Resultado: {num1} / {num2} = {resultado:.2f}")`,
    solutionExplanation: 'A especificação :.2f dentro da f-string instrui o Python a formatar o número em ponto flutuante (f) com exatamente 2 casas após o ponto decimal.'
  },
  {
    id: 'challenge-4',
    title: '4. Fazer Cálculos com o Último Resultado',
    difficulty: 'Desafio',
    description: 'Transforme a calculadora em uma máquina com memória! Permita que o usuário continue fazendo operações usando o resultado da conta anterior como o "primeiro número".',
    hint: 'Crie uma variável memoria = None antes do loop while e reutilize seu valor caso ela não seja None.',
    starterCode: `memoria = None

while True:
    exibir_menu()
    opcao = input("Opção: ")
    
    if memoria is None:
        num1 = float(input("Primeiro número: "))
    else:
        print(f"Usando resultado anterior ({memoria}) como primeiro número.")
        num1 = memoria
        
    # Complete o restante...`,
    solutionCode: `memoria = None

while True:
    exibir_menu()
    opcao = input("Opção: ")
    if opcao == "0":
        break
        
    if memoria is None:
        num1 = float(input("Primeiro número: "))
    else:
        usar = input(f"Deseja usar o valor anterior ({memoria})? (s/n): ").lower()
        num1 = memoria if usar == 's' else float(input("Primeiro número: "))
        
    num2 = float(input("Segundo número: "))
    
    if opcao == "1":
        memoria = somar(num1, num2)
    # ... outros elifs
    print(f"Resultado atual: {memoria}")`,
    solutionExplanation: 'Manter estado entre voltas de um loop é a base para criar aplicações reais, jogos e calculadoras avançadas.'
  }
];
