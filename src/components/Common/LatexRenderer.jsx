import React, { useMemo } from 'react';
import katex from 'katex';

export const LatexRenderer = ({ math, block = false, className = '' }) => {
  const renderedHtml = useMemo(() => {
    if (!math) return '';
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch (e) {
      console.warn('KaTeX render warning:', e);
      return `<span class="katex-fallback">${math}</span>`;
    }
  }, [math, block]);

  return (
    <span
      className={`latex-container ${block ? 'latex-block' : 'latex-inline'} ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

export default LatexRenderer;
