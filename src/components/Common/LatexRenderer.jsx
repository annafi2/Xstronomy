import React, { useMemo } from 'react';
import katex from 'katex';

export const LatexRenderer = ({ math, block = false, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!math || typeof math !== 'string') return '';

    const text = math.trim();

    // 1. Cek apakah teks mengandung delimiter matematika $...$ atau $$...$$
    const hasDelimiters = /\$\$[\s\S]*?\$\$|\$([^\$\n]+?)\$/.test(text);

    if (hasDelimiters) {
      let result = '';
      // Tokenisasi regex untuk memisahkan $$...$$, $...$, dan teks biasa
      const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
      const parts = text.split(regex);

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (!part) continue;

        if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
          const formula = part.slice(2, -2).trim();
          try {
            result += katex.renderToString(formula, {
              displayMode: true,
              throwOnError: false,
              strict: false
            });
          } catch (e) {
            result += `<span class="katex-fallback">${formula}</span>`;
          }
        } else if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
          const formula = part.slice(1, -1).trim();
          try {
            result += katex.renderToString(formula, {
              displayMode: false,
              throwOnError: false,
              strict: false
            });
          } catch (e) {
            result += `<span class="katex-fallback">${formula}</span>`;
          }
        } else {
          // Teks biasa di luar rumus matematika
          const escapedText = part
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br />');
          result += `<span class="text-segment">${escapedText}</span>`;
        }
      }

      return result;
    }

    // 2. Jika tidak ada tanda $, periksa apakah seluruh string adalah ekspresi LaTeX murni
    const isLatexPattern = /\\(frac|sqrt|times|cdot|mu|rho|alpha|beta|gamma|lambda|omega|pi|Omega|Delta|theta|epsilon|phi|sigma|text|mathbf|int|sum|approx|le|ge|pm)|[\^_{}]/.test(text);

    if (isLatexPattern) {
      try {
        return katex.renderToString(text, {
          displayMode: block,
          throwOnError: false,
          strict: false
        });
      } catch (e) {
        return `<span class="katex-fallback">${text}</span>`;
      }
    }

    // 3. Teks biasa tanpa matematika
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br />');
  }, [math, block]);

  return (
    <span
      className={`latex-container ${block ? 'latex-block' : 'latex-inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default LatexRenderer;

