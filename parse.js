import { marked } from './vendor/marked/marked.esm.js';

const plainParagraph = /^(?! {4})(?=.*[\p{L}\p{N}])[\p{L}\p{N} ]+$/u;

/** Fast paths are safe only while Marked's behavior is uncustomized. */
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
 * Empty input and a plain one-line paragraph avoid Marked's lexer and parser.
 * All customized configurations and other Markdown use Marked directly.
 *
 * @param {string} markdown
 * @returns {string}
 */
export function parse(markdown) {
  if (typeof markdown !== 'string' || !hasDefaultOptions()) {
    return marked.parse(markdown);
  }

  if (markdown.length === 0) return '';

  // These characters need no Markdown parsing or HTML escaping.
  if (plainParagraph.test(markdown)) return `<p>${markdown}</p>\n`;

  return marked.parse(markdown);
}
