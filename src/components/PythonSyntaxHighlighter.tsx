import React from 'react';

interface PythonSyntaxHighlighterProps {
  code: string;
  annotatedLines?: number[];
  activeLine?: number | null;
  onLineClick?: (lineNumber: number) => void;
}

export const PythonSyntaxHighlighter: React.FC<PythonSyntaxHighlighterProps> = ({
  code,
  annotatedLines = [],
  activeLine = null,
  onLineClick,
}) => {
  const lines = code.split('\n');

  // Tokenize a line of Python code into styled spans
  const renderTokens = (lineText: string) => {
    if (!lineText) return <span>&nbsp;</span>;

    // Check if entire line is a comment or docstring
    const trimmed = lineText.trim();
    if (trimmed.startsWith('#')) {
      return <span className="text-emerald-400 font-mono italic">{lineText}</span>;
    }

    if (trimmed.startsWith('"""') && trimmed.endsWith('"""') && trimmed.length > 5) {
      return <span className="text-emerald-400 font-mono italic">{lineText}</span>;
    }

    // Token regex splitter
    // Matches comments, strings (double/single/f-strings/triple), numbers, identifiers, operators/punctuation
    const regex = /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?''')|(f?"(?:\\.|[^"\\])*"|f?'(?:\\.|[^'\\])*')|(\b\d+(?:\.\d+)?\b)|(\b(?:def|return|if|elif|else|while|for|in|break|continue|try|except|is|not|and|or|True|False|None|import|from|as|class|pass|lambda)\b)|(\b(?:print|input|float|int|str|round|len|range|isinstance)\b)|([a-zA-Z_]\w*(?=\s*\())|([+\-*/%=<>!&|^~]+)|([()[\]{},:;])/g;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(lineText)) !== null) {
      // Non-matched plain text between tokens
      if (match.index > lastIndex) {
        elements.push(
          <span key={`plain-${lastIndex}`} className="text-slate-100">
            {lineText.slice(lastIndex, match.index)}
          </span>
        );
      }

      const [
        token,
        comment,
        docstring,
        stringLiteral,
        numberLiteral,
        keyword,
        builtin,
        funcCall,
        operator,
        punctuation,
      ] = match;

      const key = `token-${match.index}`;

      if (comment) {
        elements.push(<span key={key} className="text-emerald-400 italic">{comment}</span>);
      } else if (docstring) {
        elements.push(<span key={key} className="text-emerald-400 italic">{docstring}</span>);
      } else if (stringLiteral) {
        elements.push(<span key={key} className="text-amber-300">{stringLiteral}</span>);
      } else if (numberLiteral) {
        elements.push(<span key={key} className="text-purple-300 font-medium">{numberLiteral}</span>);
      } else if (keyword) {
        elements.push(<span key={key} className="text-sky-300 font-semibold">{keyword}</span>);
      } else if (builtin) {
        elements.push(<span key={key} className="text-cyan-300">{builtin}</span>);
      } else if (funcCall) {
        elements.push(<span key={key} className="text-yellow-200 font-medium">{funcCall}</span>);
      } else if (operator) {
        elements.push(<span key={key} className="text-rose-300">{operator}</span>);
      } else if (punctuation) {
        elements.push(<span key={key} className="text-slate-400">{punctuation}</span>);
      } else {
        elements.push(<span key={key} className="text-slate-100">{token}</span>);
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < lineText.length) {
      elements.push(
        <span key={`tail-${lastIndex}`} className="text-slate-100">
          {lineText.slice(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className="font-mono text-[13px] leading-relaxed select-text overflow-x-auto py-3">
      {lines.map((line, idx) => {
        const lineNum = idx + 1;
        const isAnnotated = annotatedLines.includes(lineNum);
        const isActive = activeLine === lineNum;

        return (
          <div
            key={lineNum}
            onClick={() => onLineClick && onLineClick(lineNum)}
            className={`flex items-start px-4 transition-colors group ${
              isActive
                ? 'bg-amber-500/15 border-l-2 border-amber-400'
                : isAnnotated
                ? 'hover:bg-slate-800/60 cursor-pointer border-l-2 border-transparent hover:border-amber-400/50'
                : 'hover:bg-slate-800/30 border-l-2 border-transparent'
            }`}
          >
            {/* Line number */}
            <span
              className={`w-9 shrink-0 select-none text-right pr-4 text-xs ${
                isActive
                  ? 'text-amber-300 font-bold'
                  : isAnnotated
                  ? 'text-slate-500 group-hover:text-amber-400'
                  : 'text-slate-600'
              }`}
            >
              {lineNum}
            </span>

            {/* Indicator dot if line has interactive explanation */}
            <div className="w-4 shrink-0 flex items-center justify-center pt-1 mr-1">
              {isAnnotated && (
                <span
                  title="Clique para ver a explicação desta linha"
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-amber-400 ring-2 ring-amber-400/30' : 'bg-amber-400/60 group-hover:bg-amber-400'
                  }`}
                />
              )}
            </div>

            {/* Highlighted code tokens */}
            <div className="flex-1 whitespace-pre">{renderTokens(line)}</div>
          </div>
        );
      })}
    </div>
  );
};
