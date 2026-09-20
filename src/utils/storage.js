// Helper penyimpanan lokal (localStorage) & Realtime Database API untuk Xstronomy
import { INITIAL_NEWS } from '../data/newsData';

const NEWS_STORAGE_KEY = 'xstronomy_news_data';
const HISTORY_STORAGE_KEY = 'xstronomy_calc_history';
const ADMIN_AUTH_KEY = 'xstronomy_admin_session';

// --- Local Storage Cache Synchronous Helpers ---
export const getStoredNews = () => {
  try {
    const data = localStorage.getItem(NEWS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Gagal membaca berita dari storage:', e);
  }
  return [];
};

export const saveNews = (newsList) => {
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsList || []));
  } catch (e) {
    console.error('Gagal menyimpan berita ke cache:', e);
  }
};

// --- Realtime Database API Operations (Prisma Postgres / Vercel Serverless) ---

export const fetchNewsFromApi = async () => {
  try {
    const response = await fetch('/api/news');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Gagal memuat berita`);
    }
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      saveNews(result.data);
      return result.data;
    }
  } catch (err) {
    console.warn('Fallback ke cache lokal (offline/dev):', err.message);
  }
  return getStoredNews();
};

export const addNewsArticle = async (article) => {
  // Optimistic update ke cache lokal
  const current = getStoredNews();
  const tempArticle = {
    ...article,
    id: 'news-' + Date.now(),
    date: new Date().toISOString().split('T')[0]
  };
  const updatedLocal = [tempArticle, ...current];
  saveNews(updatedLocal);

  try {
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(article)
    });
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const synced = [result.data, ...current.filter((n) => n.id !== tempArticle.id)];
        saveNews(synced);
        return synced;
      }
    }
  } catch (err) {
    console.warn('Gagal menyimpan ke serverless DB, disimpan di lokal:', err.message);
  }

  return updatedLocal;
};

export const updateNewsArticle = async (id, updatedFields) => {
  const current = getStoredNews();
  const updatedLocal = current.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveNews(updatedLocal);

  try {
    const response = await fetch('/api/news', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updatedFields })
    });
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const synced = current.map((item) => (item.id === id ? result.data : item));
        saveNews(synced);
        return synced;
      }
    }
  } catch (err) {
    console.warn('Gagal update ke serverless DB, update di lokal:', err.message);
  }

  return updatedLocal;
};

export const deleteNewsArticle = async (id) => {
  const current = getStoredNews();
  const updatedLocal = current.filter((item) => item.id !== id);
  saveNews(updatedLocal);

  try {
    await fetch(`/api/news?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Gagal hapus di serverless DB, dihapus di lokal:', err.message);
  }

  return updatedLocal;
};

export const resetNewsToDefault = () => {
  saveNews([]);
  return [];
};

// Calculation History
export const getCalcHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addCalcHistory = (calcItem) => {
  try {
    const current = getCalcHistory();
    const itemWithId = {
      ...calcItem,
      id: 'calc-' + Date.now(),
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [itemWithId, ...current].slice(0, 15);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const clearCalcHistory = () => {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  return [];
};

// Admin Session
export const isAdminAuthenticated = () => {
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
};

export const setAdminAuth = (status) => {
  if (status) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
};

// --- Quiz Questions Storage & Realtime API ---
import { INITIAL_QUIZ_DATA } from '../data/quizData';

const QUIZ_STORAGE_KEY = 'xstronomy_quiz_data';
const CUSTOM_FORMULAS_STORAGE_KEY = 'xstronomy_custom_formulas';

export const getStoredQuiz = () => {
  try {
    const data = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Gagal membaca kuis dari storage:', e);
  }
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(INITIAL_QUIZ_DATA));
  return INITIAL_QUIZ_DATA;
};

export const saveQuizToLocal = (quizList) => {
  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizList));
  } catch (e) {
    console.error('Gagal menyimpan kuis ke cache:', e);
  }
};

export const fetchQuizFromApi = async (grade = null) => {
  try {
    const url = grade && grade !== 'Semua' ? `/api/quiz?grade=${grade}` : '/api/quiz';
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    if (result.success && Array.isArray(result.data) && result.data.length > 0) {
      saveQuizToLocal(result.data);
      return result.data;
    }
  } catch (err) {
    console.warn('Fallback kuis ke cache lokal (offline/dev):', err.message);
  }
  return getStoredQuiz();
};

export const addQuizQuestion = async (questionData) => {
  const current = getStoredQuiz();
  const tempId = 'quiz-' + Date.now();
  const tempItem = { ...questionData, id: tempId };
  const updatedLocal = [...current, tempItem];
  saveQuizToLocal(updatedLocal);

  try {
    const response = await fetch('/api/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(questionData)
    });
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const synced = current.concat([result.data]);
        saveQuizToLocal(synced);
        return synced;
      }
    }
  } catch (err) {
    console.warn('Gagal menyimpan soal kuis ke serverless DB:', err.message);
  }
  return updatedLocal;
};

export const updateQuizQuestion = async (id, questionData) => {
  const current = getStoredQuiz();
  const updatedLocal = current.map((q) => (q.id === id ? { ...q, ...questionData } : q));
  saveQuizToLocal(updatedLocal);

  try {
    const response = await fetch('/api/quiz', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...questionData })
    });
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const synced = current.map((q) => (q.id === id ? result.data : q));
        saveQuizToLocal(synced);
        return synced;
      }
    }
  } catch (err) {
    console.warn('Gagal update soal kuis ke serverless DB:', err.message);
  }
  return updatedLocal;
};

export const deleteQuizQuestion = async (id) => {
  const current = getStoredQuiz();
  const updatedLocal = current.filter((q) => q.id !== id);
  saveQuizToLocal(updatedLocal);

  try {
    await fetch(`/api/quiz?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Gagal hapus soal kuis di serverless DB:', err.message);
  }
  return updatedLocal;
};

export const resetQuizToDefault = () => {
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(INITIAL_QUIZ_DATA));
  return INITIAL_QUIZ_DATA;
};

// --- Custom Formulas Storage & Realtime API ---
export const getStoredCustomFormulas = () => {
  try {
    const data = localStorage.getItem(CUSTOM_FORMULAS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveCustomFormulasToLocal = (formulas) => {
  try {
    localStorage.setItem(CUSTOM_FORMULAS_STORAGE_KEY, JSON.stringify(formulas));
  } catch (e) {
    console.error('Gagal menyimpan formula kustom:', e);
  }
};

export const fetchCustomFormulasFromApi = async () => {
  try {
    const response = await fetch('/api/custom-formulas');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();
    if (result.success && Array.isArray(result.data)) {
      saveCustomFormulasToLocal(result.data);
      return result.data;
    }
  } catch (err) {
    console.warn('Fallback formula kustom ke lokal:', err.message);
  }
  return getStoredCustomFormulas();
};

export const saveCustomFormula = async (formulaData) => {
  const current = getStoredCustomFormulas();
  const tempId = 'cf-' + Date.now();
  const tempItem = { ...formulaData, id: tempId };
  const updatedLocal = [tempItem, ...current];
  saveCustomFormulasToLocal(updatedLocal);

  try {
    const response = await fetch('/api/custom-formulas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formulaData)
    });
    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        const synced = [result.data, ...current];
        saveCustomFormulasToLocal(synced);
        return synced;
      }
    }
  } catch (err) {
    console.warn('Gagal simpan formula kustom ke DB:', err.message);
  }
  return updatedLocal;
};

export const deleteCustomFormula = async (id) => {
  const current = getStoredCustomFormulas();
  const updatedLocal = current.filter((f) => f.id !== id);
  saveCustomFormulasToLocal(updatedLocal);

  try {
    await fetch(`/api/custom-formulas?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Gagal hapus formula kustom di DB:', err.message);
  }
  return updatedLocal;
};

