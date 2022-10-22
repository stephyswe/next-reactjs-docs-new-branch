/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import cn from 'classnames';
import {highlightTree} from '@codemirror/highlight';
import {javascript} from '@codemirror/lang-javascript';
import {css} from '@codemirror/lang-css';
import {HighlightStyle, tags} from '@codemirror/highlight';
import rangeParser from 'parse-numeric-range';
import {CustomTheme} from '../Sandpack/Themes';

interface InlineHiglight {
  step: number;
  line: number;
  startColumn: number;
  endColumn: number;
}

const jsxLang = javascript({jsx: true, typescript: false});
const cssLang = css();

const CodeBlock = function CodeBlock({
  children: {
    props: {className = 'language-js', children: code = '', meta},
  },
  noMargin,
}: {
  children: React.ReactNode & {
    props: {
      className: string;
      children?: string;
      meta?: string;
    };
  };
  className?: string;
  noMargin?: boolean;
}) {
  let lang = jsxLang;
  if (className === 'language-css') {
    lang = cssLang;
  }
  const tree = lang.language.parser.parse(code);
  let tokenStarts = new Map();
  let tokenEnds = new Map();
  const highlightTheme = getSyntaxHighlight(CustomTheme);
  highlightTree(tree, highlightTheme.match, (from, to, className) => {
    tokenStarts.set(from, className);
    tokenEnds.set(to, className);
  });
  const highlightedLines = new Map();
  const lineDecorators = getLineDecorators(code, meta);
  for (let decorator of lineDecorators) {
    highlightedLines.set(decorator.line - 1, decorator.className);
  }

  // Produce output based on tokens and decorators.
  // We assume tokens never overlap other tokens, and
  // decorators never overlap with other decorators.
  // However, tokens and decorators may mutually overlap.
  // In that case, decorators always take precedence.
  let currentDecorator = null;
  let currentToken = null;
  let buffer = '';
  let lineIndex = 0;
  let lineOutput = [];
  let finalOutput = [];
  for (let i = 0; i < code.length; i++) {
    if (tokenEnds.has(i)) {
      if (!currentToken) {
        throw Error('Cannot close token at ' + i + ' because it was not open.');
      }
      if (!currentDecorator) {
        lineOutput.push(
          <span key={i + '/t'} className={currentToken}>
            {buffer}
          </span>
        );
        buffer = '';
      }
      currentToken = null;
    }

    if (tokenStarts.has(i)) {
      currentToken = tokenStarts.get(i);
    }
    if (code[i] === '\n') {
      lineOutput.push(buffer);
      buffer = '';
      finalOutput.push(
        <div
          key={lineIndex}
          className={'cm-line ' + (highlightedLines.get(lineIndex) ?? '')}>
          {lineOutput}
          <br />
        </div>
      );
      lineOutput = [];
      lineIndex++;
    } else {
      buffer += code[i];
    }
  }
  lineOutput.push(buffer);
  finalOutput.push(
    <div
      key={lineIndex}
      className={'cm-line ' + (highlightedLines.get(lineIndex) ?? '')}>
      {lineOutput}
    </div>
  );

  return (
    <div
      className={cn(
        'sandpack sandpack--codeblock',
        'rounded-lg h-full w-full overflow-x-auto flex items-center bg-wash dark:bg-gray-95 shadow-lg',
        !noMargin && 'my-8'
      )}>
      <div className="sp-wrapper">
        <div className="sp-stack">
          <div className="sp-code-editor">
            <pre className="sp-cm sp-pristine sp-javascript flex align-start">
              <code className="sp-pre-placeholder grow-[2]">{finalOutput}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;

function classNameToken(name: string): string {
  return `sp-syntax-${name}`;
}

function getSyntaxHighlight(theme: any): HighlightStyle {
  return HighlightStyle.define([
    {
      tag: tags.keyword,
      class: classNameToken('keyword'),
    },
    {
      tag: [tags.atom, tags.number, tags.bool],
      class: classNameToken('static'),
    },
    {
      tag: tags.tagName,
      class: classNameToken('tag'),
    },
    {
      // Highlight function definition differently (eg: functional component def in React)
      tag: tags.definition(tags.function(tags.variableName)),
      class: classNameToken('definition'),
    },
    {
      tag: tags.propertyName,
      class: classNameToken('property'),
    },
    {
      tag: [tags.literal, tags.inserted],
      class: classNameToken(theme.syntax.string ? 'string' : 'static'),
    },
    {
      tag: tags.punctuation,
      class: classNameToken('punctuation'),
    },
    {
      tag: [tags.comment, tags.quote],
      class: classNameToken('comment'),
    },
  ]);
}

function getLineDecorators(
  code: string,
  meta: string
): Array<{
  line: number;
  className: string;
}> {
  if (!meta) {
    return [];
  }
  const linesToHighlight = getHighlightLines(meta);
  const highlightedLineConfig = linesToHighlight.map((line) => {
    return {
      className: 'bg-github-highlight dark:bg-opacity-10',
      line,
    };
  });
  return highlightedLineConfig;
}


/**
 *
 * @param meta string provided after the language in a markdown block
 * @returns array of lines to highlight
 * @example
 * ```js {1-3,7} [[1, 1, 20, 33], [2, 4, 4, 8]] App.js active
 * ...
 * ```
 *
 * -> The meta is `{1-3,7} [[1, 1, 20, 33], [2, 4, 4, 8]] App.js active`
 */
function getHighlightLines(meta: string): number[] {
  const HIGHLIGHT_REGEX = /{([\d,-]+)}/;
  const parsedMeta = HIGHLIGHT_REGEX.exec(meta);
  if (!parsedMeta) {
    return [];
  }
  return rangeParser(parsedMeta[1]);
}