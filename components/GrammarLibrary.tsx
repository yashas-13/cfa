
import React, { useState, useMemo } from 'react';
import { Type, Layout, Users, ChevronRight, Loader2, Sparkles, MessageSquare, BookOpen } from 'lucide-react';
import { GRAMMAR_TOPICS } from '../constants';
import { GrammarTopic, LanguageMode } from '../types';
import { getGrammarExplanation } from '../services/geminiService';
import { shuffleArray } from '../utils/helpers';

interface Props {
  mode: LanguageMode;
  onDiscuss: (topic: string) => void;
}

const GrammarLibrary: React.FC<Props> = ({ mode, onDiscuss }) => {
  const randomizedTopics = useMemo(() => shuffleArray(GRAMMAR_TOPICS), []);
  
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isKannada = mode === LanguageMode.KANNADA;

  const handleTopicSelect = async (topic: GrammarTopic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setExplanation(null);
    try {
      const result = await getGrammarExplanation(topic.title);
      setExplanation(result || "Could not fetch explanation.");
    } catch (err) {
      setExplanation("Error loading grammar rules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Type': return <Type size={24} />;
      case 'Layout': return <Layout size={24} />;
      case 'Users': return <Users size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  return (
    <div className="space-y-6">
      {!selectedTopic ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {randomizedTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleTopicSelect(topic)}
              className="p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl text-left hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg transition-all group animate-in zoom-in duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(topic.icon)}
              </div>
              <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${isKannada ? 'font-kannada' : ''}`}>
                {isKannada ? topic.titleKannada : topic.title}
              </h3>
              <p className={`text-sm text-gray-500 dark:text-slate-400 font-kannada leading-relaxed`}>
                {isKannada ? topic.summaryKannada : topic.summary}
              </p>
              <div className="mt-4 flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                {isKannada ? 'ವಿವರಗಳನ್ನು ನೋಡಿ' : 'Learn Details'}
                <ChevronRight size={16} />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-indigo-50/50 dark:bg-indigo-950/20">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedTopic(null)}
                className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl text-gray-500 dark:text-slate-400 transition-colors"
              >
                <ChevronRight size={20} className="rotate-180" />
              </button>
              <div>
                <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${isKannada ? 'font-kannada' : ''}`}>
                  {isKannada ? selectedTopic.titleKannada : selectedTopic.title}
                </h3>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">A1 Grammar Detail</span>
              </div>
            </div>
            <button 
              onClick={() => onDiscuss(selectedTopic.title)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
            >
              <MessageSquare size={16} />
              {isKannada ? 'ಗುರು ಜೊತೆ ಚರ್ಚಿಸಿ' : 'Discuss with Guru'}
            </button>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 size={40} className="text-indigo-600 dark:text-indigo-400 animate-spin" />
                <p className="text-gray-500 dark:text-slate-400 font-bold animate-pulse">Guru is preparing a bilingual deep-dive...</p>
              </div>
            ) : (
              <div className="prose prose-indigo dark:prose-invert max-w-none font-kannada">
                <div className="flex items-center gap-2 mb-6 text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={20} />
                  <span className="font-bold text-lg">AI Generated Comparative Analysis</span>
                </div>
                <div className="text-gray-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap text-lg">
                  {explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarLibrary;
