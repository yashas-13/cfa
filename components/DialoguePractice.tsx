
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Play, User, Bot, RotateCcw, ChevronRight, Globe } from 'lucide-react';
import { Dialogue, LanguageMode as LangMode } from '../types';
import { getGermanSpeech } from '../services/geminiService';

interface Props {
  dialogue: Dialogue;
  mode: LangMode;
}

interface ChatEntry {
  role: 'tutor' | 'user';
  text: string;
  english: string;
  kannada: string;
}

const DialoguePractice: React.FC<Props> = ({ dialogue, mode }) => {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string>(dialogue.startNodeId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isKannada = mode === LangMode.KANNADA;

  const currentNode = dialogue.nodes[currentNodeId];

  useEffect(() => {
    // Initial tutor greeting
    const startNode = dialogue.nodes[dialogue.startNodeId];
    setHistory([{
      role: 'tutor',
      text: startNode.text,
      english: startNode.english,
      kannada: startNode.kannada
    }]);
    getGermanSpeech(startNode.text);
  }, [dialogue]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleOptionSelect = (option: any) => {
    if (!option.nextNodeId) return;

    const userEntry: ChatEntry = {
      role: 'user',
      text: option.text,
      english: option.english,
      kannada: option.kannada
    };

    const nextTutorNode = dialogue.nodes[option.nextNodeId];
    const tutorEntry: ChatEntry = {
      role: 'tutor',
      text: nextTutorNode.text,
      english: nextTutorNode.english,
      kannada: nextTutorNode.kannada
    };

    setHistory(prev => [...prev, userEntry, tutorEntry]);
    setCurrentNodeId(option.nextNodeId);
    getGermanSpeech(nextTutorNode.text);
  };

  const restart = () => {
    const startNode = dialogue.nodes[dialogue.startNodeId];
    setHistory([{
      role: 'tutor',
      text: startNode.text,
      english: startNode.english,
      kannada: startNode.kannada
    }]);
    setCurrentNodeId(dialogue.startNodeId);
    getGermanSpeech(startNode.text);
  };

  return (
    <div className="flex flex-col h-[500px] md:h-[600px] max-h-[75vh] bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="p-3 md:p-4 bg-indigo-600 dark:bg-indigo-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle size={18} />
          <h2 className="font-bold text-sm md:text-base">{isKannada ? 'ಸಂಭಾಷಣೆ ಅಭ್ಯಾಸ' : 'Dialogue Practice'}</h2>
        </div>
        <button 
          onClick={restart}
          className="p-1.5 hover:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors"
          title="Restart Dialogue"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-slate-50 dark:bg-slate-950"
      >
        {history.map((entry, idx) => (
          <div 
            key={idx} 
            className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex gap-2 md:gap-3 max-w-[85%] md:max-w-[80%] ${entry.role === 'user' ? 'flex-row-reverse text-right' : ''}`}>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                entry.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-gray-100 dark:border-slate-700'
              }`}>
                {entry.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className="space-y-1">
                <div className={`p-3 md:p-4 rounded-2xl shadow-sm border ${
                  entry.role === 'user' 
                    ? 'bg-indigo-600 text-white border-indigo-700 rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 border-gray-100 dark:border-slate-700 rounded-tl-none'
                }`}>
                  <p className="text-base md:text-lg font-bold mb-1">{entry.text}</p>
                  <div className={`text-[10px] md:text-xs opacity-80 space-y-0.5 ${isKannada ? 'font-kannada' : ''}`}>
                    <p>{entry.english}</p>
                    <p className="font-kannada">{entry.kannada}</p>
                  </div>
                </div>
                {entry.role === 'tutor' && (
                  <button 
                    onClick={() => getGermanSpeech(entry.text)}
                    className="flex items-center gap-1.5 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider hover:text-indigo-800 dark:hover:text-indigo-300"
                  >
                    <Play size={8} fill="currentColor" /> Listen
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {currentNode.options.length === 0 && (
          <div className="flex justify-center pt-8">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 p-4 rounded-2xl text-center">
              <p className="text-green-700 dark:text-green-400 font-bold mb-2 text-sm">
                {isKannada ? 'ಸಂಭಾಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ!' : 'Dialogue Complete!'}
              </p>
              <button 
                onClick={restart}
                className="text-[10px] font-bold text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 flex items-center gap-1 mx-auto"
              >
                <RotateCcw size={10} /> {isKannada ? 'ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ' : 'Start Again'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Options Area */}
      {currentNode.options.length > 0 && (
        <div className="p-3 md:p-6 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3 md:mb-4">
            {isKannada ? 'ನಿಮ್ಮ ಉತ್ತರವನ್ನು ಆರಿಸಿ' : 'Choose your response'}
          </p>
          <div className="grid grid-cols-1 gap-2 md:gap-3">
            {currentNode.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option)}
                className="group w-full p-3 md:p-4 text-left border-2 border-gray-100 dark:border-slate-800 rounded-xl md:rounded-2xl hover:border-indigo-600 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all flex items-center justify-between"
              >
                <div>
                  <p className="font-bold text-sm md:text-base text-gray-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">{option.text}</p>
                  <div className="flex flex-wrap gap-2 md:gap-3 mt-1 text-[10px] text-gray-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Globe size={8} /> {option.english}</span>
                    <span className="font-kannada">{option.kannada}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 dark:text-slate-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DialoguePractice;
