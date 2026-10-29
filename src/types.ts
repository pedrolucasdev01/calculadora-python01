export type CodeVariant = 'interactive' | 'simple' | 'advanced';

export interface CodeLineAnnotation {
  line: number;
  code: string;
  category: 'header' | 'function' | 'input' | 'condition' | 'loop' | 'output' | 'error_handling';
  title: string;
  explanation: string;
  beginnerTip: string;
  pitfall?: string;
}

export interface ConceptExplanation {
  id: string;
  title: string;
  iconName: string;
  tagline: string;
  summary: string;
  pythonSyntax: string;
  keyPoints: string[];
  whyImportant: string;
  commonMistake: {
    wrong: string;
    right: string;
    reason: string;
  };
}

export interface PracticeChallenge {
  id: string;
  title: string;
  difficulty: 'Fácil' | 'Médio' | 'Desafio';
  description: string;
  hint: string;
  starterCode: string;
  solutionCode: string;
  solutionExplanation: string;
}

export interface TerminalMessage {
  id: string;
  type: 'system' | 'prompt' | 'user' | 'result' | 'error' | 'menu';
  text: string;
}
