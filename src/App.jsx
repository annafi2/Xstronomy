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

// Quiz & Bank Soal Components
import QuizView from './components/Quiz/QuizView';

// Simulations Components
import SimulationsView from './components/Simulations/SimulationsView';

// Dedicated Admin Portal
import AdminPortal from './components/Admin/AdminPortal';

// Storage helpers
import { 
  getStoredNews, 
  fetchNewsFromApi,
  addNewsArticle, 
  updateNewsArticle, 
  deleteNewsArticle, 
  resetNewsToDefault,
  isAdminAuthenticated,
  setAdminAuth,
  getStoredQuiz,
  fetchQuizFromApi,
  addQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  resetQuizToDefault,
  getStoredCustomFormulas,
  fetchCustomFormulasFromApi,
  saveCustomFormula,
  deleteCustomFormula
} from './utils/storage';

export function App() {
  // Navigation tab: 'news' | 'learn' | 'quiz' | 'solver' | 'sims' | 'admin'
  const [activeTab, setActiveTab] = useState('news');

  // News state
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Quiz state
  const [quizList, setQuizList] = useState([]);

  // Custom formulas state
  const [customFormulas, setCustomFormulas] = useState([]);

  // Admin session state
  const [isAdmin, setIsAdmin] = useState(false);

  // Learn module modal state
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedGradeTitle, setSelectedGradeTitle] = useState('');

  // Target preset to pass to Formula Solver
  const [targetPresetId, setTargetPresetId] = useState(null);

  // Inisialisasi data berita, kuis, formula kustom, dan sesi admin
  useEffect(() => {
    // Muat data awal dari cache lokal
    setNews(getStoredNews());
    setQuizList(getStoredQuiz());
    setCustomFormulas(getStoredCustomFormulas());
    setIsAdmin(isAdminAuthenticated());

    // Fetch pembaruan data secara realtime dari Prisma Postgres DB
    fetchNewsFromApi().then((data) => {
      if (Array.isArray(data)) {
        setNews(data);
      }
    });

    fetchQuizFromApi().then((data) => {
      if (Array.isArray(data)) {
        setQuizList(data);
      }
    });

    fetchCustomFormulasFromApi().then((data) => {
      if (Array.isArray(data)) {
        setCustomFormulas(data);
      }
    });
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

  const handleSaveArticle = async (articleData) => {
    if (articleData.id) {
      const updated = await updateNewsArticle(articleData.id, articleData);
      setNews(updated);
    } else {
      const updated = await addNewsArticle(articleData);
      setNews(updated);
    }
  };

  const handleDeleteArticle = async (id) => {
    const updated = await deleteNewsArticle(id);
    setNews(updated);
  };

  const handleResetNews = () => {
    const defaultData = resetNewsToDefault();
    setNews(defaultData);
  };

  // Quiz Handlers
  const handleSaveQuizQuestion = async (questionData) => {
    if (questionData.id) {
      const updated = await updateQuizQuestion(questionData.id, questionData);
      setQuizList(updated);
    } else {
      const updated = await addQuizQuestion(questionData);
      setQuizList(updated);
    }
  };

  const handleDeleteQuizQuestion = async (id) => {
    const updated = await deleteQuizQuestion(id);
    setQuizList(updated);
  };

  const handleResetQuiz = () => {
    const defaultData = resetQuizToDefault();
    setQuizList(defaultData);
  };

  // Custom Formula Handlers
  const handleSaveCustomFormula = async (formulaData) => {
    const updated = await saveCustomFormula(formulaData);
    setCustomFormulas(updated);
  };

  const handleDeleteCustomFormula = async (id) => {
    const updated = await deleteCustomFormula(id);
    setCustomFormulas(updated);
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
            onOpenAdmin={() => setActiveTab('admin')}
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

        {activeTab === 'quiz' && (
          <QuizView
            questions={quizList}
            quizList={quizList}
            onOpenInSolver={handleOpenInSolver}
            onOpenSolver={handleOpenInSolver}
          />
        )}

        {activeTab === 'solver' && (
          <FormulaSolver 
            targetPresetId={targetPresetId} 
            customFormulas={customFormulas}
            onSaveCustomFormula={handleSaveCustomFormula}
            onDeleteCustomFormula={handleDeleteCustomFormula}
          />
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
            quizList={quizList}
            onSaveQuizQuestion={handleSaveQuizQuestion}
            onDeleteQuizQuestion={handleDeleteQuizQuestion}
            onResetQuiz={handleResetQuiz}
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
