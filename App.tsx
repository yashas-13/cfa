
import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, BookOpen, MessageSquare, GraduationCap, ChevronRight, Globe, Mic, ClipboardList, MessageCircle, BookText, Sun, Moon, Shuffle, Sparkles, Loader2, Menu, X } from 'lucide-react';
import { LanguageMode, Lesson, VocabularyItem } from './types';
import { LESSONS } from './constants';
import { getGermanSpeech, generateAILesson } from './services/geminiService';
import { shuffleArray } from './utils/helpers';
import LanguageToggle from './components/LanguageToggle';
import LessonCard from './components/LessonCard';
import ChatTutor from './components/ChatTutor';
import PronunciationModal from './components/PronunciationModal';
import QuizView from './components/QuizView';
import DialoguePractice from './components/DialoguePractice';
import GrammarLibrary from './components/GrammarLibrary';

const App: React.FC = () => {
  const [langMode, setLangMode] = useState<LanguageMode>(LanguageMode.ENGLISH);
  const [randomizedLessons, setRandomizedLessons] = useState<Lesson[]>([]);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [practiceItem, setPracticeItem] = useState<VocabularyItem | null>(null);
  const [viewMode, setViewMode] = useState<'learn' | 'quiz' | 'dialogue' | 'grammar'>('learn');
  const [isAILoading, setIsAILoading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });

  // Initialize and Shuffle
  const initializeLessons = () => {
    const shuffled = shuffleArray(LESSONS);
    setRandomizedLessons(shuffled);
    setActiveLessonId(shuffled[0].id);
    setViewMode('learn');
  };

  useEffect(() => {
    initializeLessons();
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const activeLesson = useMemo(() => 
    randomizedLessons.find(l => l.id === activeLessonId) || randomizedLessons[0], 
    [activeLessonId, randomizedLessons]
  );

  const shuffledVocabulary = useMemo(() => 
    activeLesson ? shuffleArray(activeLesson.content) : [], 
    [activeLesson]
  );

  const isKannada = langMode === LanguageMode.KANNADA;

  const handlePlayAudio = (text: string) => {
    getGermanSpeech(text);
  };

  const handleLessonChange = (lesson: Lesson) => {
    setActiveLessonId(lesson.id);
    setViewMode('learn');
    setIsSidebarOpen(false); // Close drawer on mobile after selection
  };

  const handleGenerateAIContent = async () => {
    setIsAILoading(true);
    try {
      const aiLesson = await generateAILesson();
      setRandomizedLessons(prev => [aiLesson, ...prev]);
      setActiveLessonId(aiLesson.id);
      setViewMode('learn');
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsAILoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (!activeLesson) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300 overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col h-screen transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:w-80
      `}>
        <div className="p-4 md:p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="font-bold text-lg md:text-xl tracking-tight text-gray-900 dark:text-white">Namaste-Hallo</h1>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-slate-400 font-medium">German Instructor</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-2 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block">
              Teaching Support
            </label>
            <LanguageToggle mode={langMode} onChange={setLangMode} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest block">
              Curriculum / ಪಠ್ಯಕ್ರಮ
            </label>
            <div className="flex gap-1">
              <button 
                onClick={initializeLessons}
                className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors"
                title="Shuffle Lessons"
              >
                <Shuffle size={14} />
              </button>
              <button 
                onClick={handleGenerateAIContent}
                disabled={isAILoading}
                className="p-1.5 text-pink-600 dark:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/30 rounded-md transition-colors disabled:opacity-50"
                title="AI Magic Generator"
              >
                {isAILoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              </button>
            </div>
          </div>
          {randomizedLessons.map((lesson) => (
            <LessonCard 
              key={lesson.id}
              lesson={lesson}
              mode={langMode}
              isActive={activeLessonId === lesson.id}
              onClick={() => handleLessonChange(lesson)}
            />
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
          <button 
            onClick={() => { setIsChatOpen(!isChatOpen); setIsSidebarOpen(false); }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MessageSquare size={20} />
              <span className="text-sm">{isChatOpen ? 'Close Chat' : 'Chat with Guru'}</span>
            </div>
            <ChevronRight size={18} className={`transform transition-transform ${isChatOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-x-hidden">
        <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-20 p-3 md:p-4 border-b border-gray-100 dark:border-slate-800 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="md:hidden p-2 -ml-2 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400 text-xs">
                <BookOpen size={14} className="hidden xs:block" />
                <span className="hidden xs:block">{activeLesson.level} Level</span>
                <ChevronRight size={12} className="hidden xs:block" />
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 max-w-[150px] md:max-w-none truncate">
                  {activeLesson.isAI && <Sparkles size={12} className="text-pink-500 shrink-0" />}
                  {viewMode === 'grammar' 
                    ? (isKannada ? 'ಗ್ರಾಮರ್ ಗುರು' : 'Grammar Guru') 
                    : (isKannada ? activeLesson.titleKannada : activeLesson.title)}
                </span>
              </div>
            </div>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
          
          <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg overflow-x-auto no-scrollbar">
            <div className="flex gap-1 min-w-max">
              {(['learn', 'grammar', 'dialogue', 'quiz'] as const).map((mode) => (
                <button 
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                    viewMode === mode ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
                  }`}
                >
                  {mode === 'learn' && <BookOpen size={14} />}
                  {mode === 'grammar' && <BookText size={14} />}
                  {mode === 'dialogue' && <MessageCircle size={14} />}
                  {mode === 'quiz' && <ClipboardList size={14} />}
                  <span>
                    {mode === 'learn' && (isKannada ? 'ಕಲಿಯಿರಿ' : 'Learn')}
                    {mode === 'grammar' && (isKannada ? 'ಗ್ರಾಮರ್' : 'Grammar')}
                    {mode === 'dialogue' && (isKannada ? 'ಸಂಭಾಷಣೆ' : 'Dialogue')}
                    {mode === 'quiz' && (isKannada ? 'ರಸಪ್ರಶ್ನೆ' : 'Quiz')}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className={`flex-1 p-4 md:p-8 flex flex-col gap-6 ${isChatOpen ? 'md:mr-[400px]' : ''} transition-all duration-300`}>
          {isAILoading && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12 md:py-20">
               <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-pink-100 dark:border-pink-900 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
                  <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-500 animate-pulse" />
               </div>
               <div className="text-center px-4">
                  <p className="text-base md:text-lg font-bold text-gray-800 dark:text-white">Guru is crafting a new lesson...</p>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-slate-400">Generating German words and translations in English & Kannada</p>
               </div>
            </div>
          )}

          {!isAILoading && viewMode === 'learn' && (
            <>
              <section className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <div className="max-w-3xl">
                    <h2 className={`text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 ${isKannada ? 'font-kannada' : ''}`}>
                      {isKannada ? activeLesson.titleKannada : activeLesson.title}
                    </h2>
                    <p className={`text-base md:text-lg text-gray-600 dark:text-slate-400 leading-relaxed ${isKannada ? 'font-kannada' : ''}`}>
                      {isKannada ? activeLesson.descriptionKannada : activeLesson.description}
                    </p>
                 </div>
              </section>

              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                 {shuffledVocabulary.map((item, idx) => (
                    <div 
                      key={`${activeLessonId}-${item.german}`} 
                      className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all group animate-in zoom-in duration-300"
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 inline-block">
                          {item.german}
                        </span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handlePlayAudio(item.german)}
                            className="p-2 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-colors"
                          >
                            <Volume2 size={16} />
                          </button>
                          <button 
                            onClick={() => setPracticeItem(item)}
                            className="p-2 bg-orange-50 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-full hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white dark:hover:text-white transition-colors"
                          >
                            <Mic size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-3 pt-4 border-t border-gray-50 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                           <Globe size={14} className="text-gray-400 dark:text-slate-500" />
                           <span className="text-sm font-medium text-gray-800 dark:text-slate-200">{item.english}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-bold text-orange-400 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/30 px-1.5 py-0.5 rounded uppercase">KN</span>
                           <span className="text-sm font-bold text-gray-700 dark:text-slate-300 font-kannada">{item.kannada}</span>
                        </div>
                        <div className="mt-2 text-[10px] text-gray-400 dark:text-slate-500 uppercase tracking-tighter">
                          Pronunciation: <span className="font-mono text-gray-500 dark:text-slate-400 lowercase">{item.pronunciation}</span>
                        </div>
                      </div>
                    </div>
                 ))}
              </section>
            </>
          )}

          {!isAILoading && viewMode === 'quiz' && (
            <div className="max-w-4xl mx-auto w-full">
              <QuizView 
                key={`quiz-${activeLessonId}`}
                questions={activeLesson.quiz} 
                mode={langMode} 
                onComplete={() => setViewMode('learn')} 
              />
            </div>
          )}

          {!isAILoading && viewMode === 'dialogue' && (
            <div className="max-w-4xl mx-auto w-full">
              <DialoguePractice 
                key={`dialogue-${activeLessonId}`}
                dialogue={activeLesson.dialogue} 
                mode={langMode} 
              />
            </div>
          )}

          {!isAILoading && viewMode === 'grammar' && (
            <div className="max-w-5xl mx-auto w-full">
              <GrammarLibrary 
                mode={langMode} 
                onDiscuss={() => setIsChatOpen(true)} 
              />
            </div>
          )}
        </div>

        {isChatOpen && (
          <div className="fixed inset-0 md:inset-y-0 md:right-0 md:left-auto md:w-96 p-0 md:p-4 z-50 bg-slate-50 dark:bg-slate-950 md:bg-transparent flex flex-col">
            <div className="h-full pointer-events-auto shadow-2xl relative">
              <button 
                onClick={() => setIsChatOpen(false)}
                className="md:hidden absolute top-4 right-4 z-50 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur rounded-full text-gray-500"
              >
                <X size={20} />
              </button>
              <ChatTutor />
            </div>
          </div>
        )}

        {practiceItem && (
          <PronunciationModal 
            item={practiceItem} 
            onClose={() => setPracticeItem(null)} 
          />
        )}
      </main>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 400px) {
          .xs\\:hidden { display: none; }
          .xs\\:block { display: block; }
        }
      `}</style>
    </div>
  );
};

export default App;
