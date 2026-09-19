// Helper penyimpanan lokal (localStorage) untuk Xstronomy
import { INITIAL_NEWS } from '../data/newsData';

const NEWS_STORAGE_KEY = 'xstronomy_news_data';
const HISTORY_STORAGE_KEY = 'xstronomy_calc_history';
const ADMIN_AUTH_KEY = 'xstronomy_admin_session';

export const getStoredNews = () => {
  try {
    const data = localStorage.getItem(NEWS_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Gagal membaca berita dari storage:', e);
  }
  // Default seed
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(INITIAL_NEWS));
  return INITIAL_NEWS;
};

export const saveNews = (newsList) => {
  try {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsList));
  } catch (e) {
    console.error('Gagal menyimpan berita:', e);
  }
};

export const addNewsArticle = (article) => {
  const current = getStoredNews();
  const newArticle = {
    ...article,
    id: 'news-' + Date.now(),
    date: new Date().toISOString().split('T')[0]
  };
  const updated = [newArticle, ...current];
  saveNews(updated);
  return updated;
};

export const updateNewsArticle = (id, updatedFields) => {
  const current = getStoredNews();
  const updated = current.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveNews(updated);
  return updated;
};

export const deleteNewsArticle = (id) => {
  const current = getStoredNews();
  const updated = current.filter((item) => item.id !== id);
  saveNews(updated);
  return updated;
};

export const resetNewsToDefault = () => {
  saveNews(INITIAL_NEWS);
  return INITIAL_NEWS;
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
    const updated = [itemWithId, ...current].slice(0, 15); // simpan maksimal 15 riwayat
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

// Admin Session (Simple simulated token)
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
