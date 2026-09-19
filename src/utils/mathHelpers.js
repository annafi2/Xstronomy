// Utilitas Matematika, Formatting, Unicode Math Symbols & Safe Formula Evaluation
import { CONSTANT_MAP } from '../data/constantsData';

// Pemetaan Simbol Matematika dan Kosmis Unicode
export const MATH_SYMBOL_MAP = {
  '×': '*',
  '·': '*',
  '÷': '/',
  '²': '^2',
  '³': '^3',
  '⁴': '^4',
  'π': 'pi',
  'λ': 'lambda',
  'θ': 'theta',
  'ω': 'omega',
  'γ': 'gamma',
  'σ': 'sigma',
  'Δ': 'delta_',
  'M☉': 'M_sun',
  'R☉': 'R_sun',
  'L☉': 'L_sun',
  'M⊕': 'M_earth',
  'R⊕': 'R_earth'
};

// Format angka ke notasi ilmiah yang indah
export const formatScientific = (num, precision = 4) => {
  if (num === null || num === undefined || isNaN(num)) return 'NaN';
  if (!isFinite(num)) return num > 0 ? '∞' : '-∞';
  if (num === 0) return '0';

  const abs = Math.abs(num);
  // Jika angka dalam rentang normal sehari-hari
  if (abs >= 0.001 && abs < 100000) {
    const str = num.toFixed(precision);
    return parseFloat(str).toLocaleString('id-ID');
  }

  // Notasi ilmiah
  const expStr = num.toExponential(precision);
  const [mantissa, exponent] = expStr.split('e');
  const expInt = parseInt(exponent, 10);

  return `${parseFloat(mantissa)} × 10^${expInt}`;
};

// Format ke LaTeX untuk notasi ilmiah
export const formatScientificLatex = (num, precision = 4) => {
  if (num === null || num === undefined || isNaN(num)) return '\\text{NaN}';
  if (!isFinite(num)) return num > 0 ? '\\infty' : '-\\infty';
  if (num === 0) return '0';

  const abs = Math.abs(num);
  if (abs >= 0.01 && abs < 100000) {
    return parseFloat(num.toFixed(precision)).toString();
  }

  const expStr = num.toExponential(precision);
  const [mantissa, exponent] = expStr.split('e');
  const expInt = parseInt(exponent, 10);

  return `${parseFloat(mantissa)} \\times 10^{${expInt}}`;
};

// Daftar fungsi matematika yang diizinkan
export const ALLOWED_FUNCTIONS = [
  'sqrt', 'cbrt', 'abs', 'exp', 'log', 'log10', 'ln',
  'sin', 'cos', 'tan', 'asin', 'acos', 'atan'
];

// Daftar konstanta bawaan matematika
export const BUILTIN_MATH_CONSTANTS = {
  pi: Math.PI,
  PI: Math.PI,
  e: Math.E,
  E: Math.E
};

/**
 * Normalisasi simbol matematika Unicode menjadi sintaks ekspresi standar
 */
export const normalizeMathSymbols = (expr) => {
  if (!expr || typeof expr !== 'string') return '';
  let normalized = expr;

  // Ganti akar kuadrat simbolis √(x) menjadi sqrt(x)
  normalized = normalized.replace(/√\s*\(/g, 'sqrt(');
  normalized = normalized.replace(/√([a-zA-Z0-9_]+)/g, 'sqrt($1)');

  // Ganti simbol-simbol peta
  Object.keys(MATH_SYMBOL_MAP).forEach((symbol) => {
    const replacement = MATH_SYMBOL_MAP[symbol];
    normalized = normalized.split(symbol).join(replacement);
  });

  return normalized;
};

/**
 * Konversi ekspresi yang diketik menjadi tampilan rumus LaTeX matematika yang cantik
 */
export const convertToLatexMath = (expr) => {
  if (!expr || !expr.trim()) return '';

  let latex = expr.trim();

  // Bersihkan spasi berlebih
  latex = latex.replace(/\s+/g, ' ');

  // Ganti simbol unicode jika ada
  Object.keys(MATH_SYMBOL_MAP).forEach((sym) => {
    if (sym === '×' || sym === '·') {
      latex = latex.split(sym).join(' \\cdot ');
    } else if (sym === '÷') {
      latex = latex.split(sym).join(' / ');
    } else if (sym === '²') {
      latex = latex.split(sym).join('^2');
    } else if (sym === '³') {
      latex = latex.split(sym).join('^3');
    } else if (sym === '⁴') {
      latex = latex.split(sym).join('^4');
    } else if (sym === 'M☉') {
      latex = latex.split(sym).join('M_\\odot');
    } else if (sym === 'R☉') {
      latex = latex.split(sym).join('R_\\odot');
    } else if (sym === 'L☉') {
      latex = latex.split(sym).join('L_\\odot');
    } else if (sym === 'M⊕') {
      latex = latex.split(sym).join('M_\\oplus');
    } else if (sym === 'R⊕') {
      latex = latex.split(sym).join('R_\\oplus');
    }
  });

  // Ganti operator * dengan \cdot
  latex = latex.replace(/\*/g, ' \\cdot ');

  // Ganti sqrt(...) dengan \sqrt{...}
  // Rekursif tangani sqrt
  let hasSqrt = true;
  let safety = 0;
  while (hasSqrt && safety < 5) {
    safety++;
    const match = latex.match(/sqrt\(([^()]+)\)/);
    if (match) {
      latex = latex.replace(match[0], `\\sqrt{${match[1]}}`);
    } else {
      hasSqrt = false;
    }
  }

  // Ganti pecahan sederhana (A) / (B) atau A / B menjadi \frac{A}{B}
  // Untuk pola sederhana
  latex = latex.replace(/\(([^()]+)\)\s*\/\s*\(([^()]+)\)/g, '\\frac{$1}{$2}');

  // Ganti pangkat ^(x) atau ^x
  latex = latex.replace(/\^([0-9a-zA-Z_]+)/g, '^{$1}');

  // Ganti konstanta astronomi & variabel terkenal
  latex = latex.replace(/\bM_sun\b/g, 'M_\\odot');
  latex = latex.replace(/\bR_sun\b/g, 'R_\\odot');
  latex = latex.replace(/\bL_sun\b/g, 'L_\\odot');
  latex = latex.replace(/\bM_earth\b/g, 'M_\\oplus');
  latex = latex.replace(/\bR_earth\b/g, 'R_\\oplus');
  latex = latex.replace(/\bpi\b/g, '\\pi');
  latex = latex.replace(/\blambda\b/g, '\\lambda');
  latex = latex.replace(/\btheta\b/g, '\\theta');
  latex = latex.replace(/\bomega\b/g, '\\omega');
  latex = latex.replace(/\bgamma\b/g, '\\gamma');
  latex = latex.replace(/\bsigma\b/g, '\\sigma');
  latex = latex.replace(/\bdelta_m\b/g, '\\Delta m');
  latex = latex.replace(/\bdelta_([a-zA-Z0-9_]+)\b/g, '\\Delta $1');
  latex = latex.replace(/\bv_esc\b/g, 'v_{\\text{esc}}');
  latex = latex.replace(/\bv_orb\b/g, 'v_{\\text{orb}}');
  latex = latex.replace(/\bm1\b/g, 'm_1');
  latex = latex.replace(/\bm2\b/g, 'm_2');
  latex = latex.replace(/\br1\b/g, 'r_1');
  latex = latex.replace(/\br2\b/g, 'r_2');
  latex = latex.replace(/\bR1\b/g, 'R_1');
  latex = latex.replace(/\bR2\b/g, 'R_2');
  latex = latex.replace(/\bomega1\b/g, '\\omega_1');
  latex = latex.replace(/\bomega2\b/g, '\\omega_2');

  return latex;
};

/**
 * Ekstraksi variabel dari ekspresi rumus string.
 */
export const extractVariables = (rawExpression) => {
  if (!rawExpression || typeof rawExpression !== 'string') return [];

  // Normalisasi simbol sebelum ekstraksi
  const expression = normalizeMathSymbols(rawExpression);

  // Temukan semua token kata / huruf (identifier)
  const tokens = expression.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
  const uniqueTokens = Array.from(new Set(tokens));

  const variables = uniqueTokens.filter((token) => {
    // Abaikan jika merupakan fungsi matematika
    if (ALLOWED_FUNCTIONS.includes(token.toLowerCase())) return false;
    // Abaikan jika merupakan konstanta matematika (pi, e)
    if (token.toLowerCase() in BUILTIN_MATH_CONSTANTS || token in BUILTIN_MATH_CONSTANTS) return false;
    // Abaikan jika merupakan konstanta fisika yang dikenal (G, c, h, sigma, dll)
    if (token in CONSTANT_MAP) return false;
    return true;
  });

  return variables;
};

/**
 * Persiapkan formula string untuk evaluasi:
 * Normalisasi simbol matematika, ganti operator pangkat ^ dengan **
 */
export const sanitizeExpression = (rawExpression) => {
  let expr = normalizeMathSymbols(rawExpression);

  // Tangani `^` dengan menggantinya menjadi `**`
  expr = expr.replace(/\^/g, '**');

  // Ganti fungsi matematika khusus
  expr = expr.replace(/\bln\b/g, 'Math.log');
  expr = expr.replace(/\blog10\b/g, 'Math.log10');
  expr = expr.replace(/\blog\b/g, 'Math.log10');

  // Ganti fungsi standar dengan Math.fn
  ALLOWED_FUNCTIONS.forEach((fn) => {
    if (fn !== 'ln' && fn !== 'log' && fn !== 'log10') {
      const regex = new RegExp(`\\b${fn}\\b`, 'g');
      expr = expr.replace(regex, `Math.${fn}`);
    }
  });

  return expr;
};

/**
 * Evaluasi formula matematika secara aman dengan nilai variabel yang diberikan.
 */
export const evaluateFormula = (rawExpression, variableValues = {}) => {
  try {
    if (!rawExpression || !rawExpression.trim()) {
      return { success: false, error: 'Ekspresi formula kosong' };
    }

    // Bangun lingkup variabel + konstanta
    const scope = {
      ...CONSTANT_MAP,
      ...BUILTIN_MATH_CONSTANTS,
      ...variableValues
    };

    // Validasi bahwa tidak ada kode berbahaya
    const blacklisted = /eval|Function|window|document|localStorage|fetch|XMLHttpRequest|import|export|class|process|global|require/i;
    if (blacklisted.test(rawExpression)) {
      return { success: false, error: 'Simbol atau perintah tidak diizinkan' };
    }

    // Ubah formula menjadi format evaluasi
    let sanitized = sanitizeExpression(rawExpression);

    // Kumpulkan nama-nama variabel & argumen
    const paramNames = Object.keys(scope);
    const paramValues = Object.values(scope);

    // Buat fungsi evaluator terisolasi
    // eslint-disable-next-line no-new-func
    const evaluator = new Function(...paramNames, `"use strict"; return (${sanitized});`);
    const result = evaluator(...paramValues);

    if (isNaN(result)) {
      return { success: false, error: 'Hasil kalkulasi menghasilkan NaN (Periksa pembagian nol atau akar bilangan negatif)' };
    }

    return {
      success: true,
      result: result,
      formatted: formatScientific(result),
      latexFormatted: formatScientificLatex(result)
    };
  } catch (err) {
    return {
      success: false,
      error: `Kesalahan sintaks atau perhitungan: ${err.message}`
    };
  }
};
