import React, { useState, useEffect } from 'react';
import './App.css';
import StarfieldCanvas from './components/Common/StarfieldCanvas';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// News Components
import NewsFeed from './components/News/NewsFeed';
import ArticleDetailModal from './components/News/ArticleDetailModal';

// Learn Components
import LearnView from './components/Learn/LearnView';
import TopicDetailModal from './components/Learn/TopicDetailModal';

// Formula Solver Components
import FormulaSolver from './components/FormulaSolver/FormulaSolver';

// Simulations Components
import SimulationsView from './components/Simulations/SimulationsView';

// Dedicated Admin Portal
import AdminPortal from './components/Admin/AdminPortal';

// Storage helpers
import { 
  getStoredNews, 
  addNewsArticle, 
  updateNewsArticle, 
  deleteNewsArticle, 
  resetNewsToDefault,
  isAdminAuthenticated,
  setAdminAuth 
} from './utils/storage';

export function App() {
  // Navigation tab: 'news' | 'learn' | 'solver' | 'sims' | 'admin'
  const [activeTab, setActiveTab] = useState('news');

  // News state
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Admin session state
  const [isAdmin, setIsAdmin] = useState(false);

  // Learn module modal state
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedGradeTitle, setSelectedGradeTitle] = useState('');

  // Target preset to pass to Formula Solver
  const [targetPresetId, setTargetPresetId] = useState(null);

  // Inisialisasi data berita dan sesi admin
  useEffect(() => {
    setNews(getStoredNews());
    setIsAdmin(isAdminAuthenticated());
  }, []);

  // Admin Actions
  const handleAdminLoginSuccess = () => {
    setAdminAuth(true);
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    setAdminAuth(false);
    setIsAdmin(false);
  };

  const handleSaveArticle = (articleData) => {
    if (articleData.id) {
      const updated = updateNewsArticle(articleData.id, articleData);
      setNews(updated);
    } else {
      const updated = addNewsArticle(articleData);
      setNews(updated);
    }
  };

  const handleDeleteArticle = (id) => {
    const updated = deleteNewsArticle(id);
    setNews(updated);
  };

  const handleResetNews = () => {
    const defaultData = resetNewsToDefault();
    setNews(defaultData);
  };

  // Navigasi silang: Belajar -> Solver
  const handleOpenInSolver = (presetId) => {
    setTargetPresetId(presetId);
    setActiveTab('solver');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigasi silang: Berita -> Belajar
  const handleExplorePhysicsFromNews = () => {
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Background Starfield Canvas */}
      <StarfieldCanvas />

      {/* Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdmin={isAdmin}
        onLogoutAdmin={handleAdminLogout}
      />

      {/* Main Content Sections */}
      <main className="main-content-container">
        {activeTab === 'news' && (
          <NewsFeed
            news={news}
            onSelectArticle={(article) => setSelectedArticle(article)}
          />
        )}

        {activeTab === 'learn' && (
          <LearnView
            onSelectTopic={(topic, gradeTitle) => {
              setSelectedTopic(topic);
              setSelectedGradeTitle(gradeTitle);
            }}
            onOpenInSolver={handleOpenInSolver}
          />
        )}

        {activeTab === 'solver' && (
          <FormulaSolver targetPresetId={targetPresetId} />
        )}

        {activeTab === 'sims' && (
          <SimulationsView />
        )}

        {activeTab === 'admin' && (
          <AdminPortal
            news={news}
            isAdmin={isAdmin}
            onLogin={handleAdminLoginSuccess}
            onLogout={handleAdminLogout}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            onResetNews={handleResetNews}
            onViewArticleInReader={(article) => setSelectedArticle(article)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* Article Detail Reader Modal (dapat dibuka dari news maupun dari admin portal preview) */}
      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onExplorePhysics={handleExplorePhysicsFromNews}
        />
      )}

      {/* Topic Detail Modal */}
      {selectedTopic && (
        <TopicDetailModal
          topic={selectedTopic}
          gradeTitle={selectedGradeTitle}
          onClose={() => setSelectedTopic(null)}
          onOpenInSolver={handleOpenInSolver}
        />
      )}
    </div>
  );
}

export default App;
