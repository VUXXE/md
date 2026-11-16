import { marked } from './vendor/marked/marked.esm.js';

const plainParagraph = /^(?! {4})(?=.*[\p{L}\p{N}])[\p{L}\p{N} ]+$/u;

/**
 * Return true while Marked is using its unmodified defaults.
 * Fast paths must yield to custom hooks, renderers, tokenizers, and options.
 */
function hasDefaultOptions() {
  const options = marked.defaults;

  return options.async === false
    && options.breaks === false
    && options.extensions === null
    && options.gfm === true
    && options.hooks === null
    && options.pedantic === false
    && options.renderer === null
    && options.silent === false
    && options.tokenizer === null
    && options.walkTokens === null;
}

/**
 * Parse Markdown to HTML with Marked-compatible output.
 *
 * Empty input and a plain one-line paragraph avoid Marked's lexer and parser
 * work. Other inputs use Marked directly so its full Markdown behavior stays
 * available.
 *
 * @param {string} markdown
 * @returns {string}
 */
export function parse(markdown) {
  if (typeof markdown === 'string' && hasDefaultOptions()) {
    if (markdown.length === 0) return '';

    // This character set cannot contain Markdown syntax or HTML to escape.
    if (plainParagraph.test(markdown)) return `<p>${markdown}</p>\n`;
  }

  return marked.parse(markdown);
}
