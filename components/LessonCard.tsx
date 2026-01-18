
import React from 'react';
import { Lesson, LanguageMode } from '../types';
import { Sparkles } from 'lucide-react';

interface Props {
  lesson: Lesson;
  mode: LanguageMode;
  onClick: () => void;
  isActive: boolean;
}

const LessonCard: React.FC<Props> = ({ lesson, mode, onClick, isActive }) => {
  const isKannada = mode === LanguageMode.KANNADA;
  
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all relative overflow-hidden group ${
        isActive 
          ? 'border-indigo-500 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 shadow-md scale-[1.02]' 
          : 'border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-800'
      }`}
    >
      {lesson.isAI && (
        <div className="absolute top-0 right-0 p-1 bg-pink-500 text-white rounded-bl-lg">
           <Sparkles size={10} />
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
          lesson.isAI 
            ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400' 
            : 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
        }`}>
          {lesson.level} {lesson.isAI && '• AI'}
        </span>
      </div>
      <h3 className={`text-lg font-bold text-gray-800 dark:text-slate-100 leading-tight ${isKannada ? 'font-kannada' : ''}`}>
        {isKannada ? lesson.titleKannada : lesson.title}
      </h3>
      <p className={`text-sm text-gray-500 dark:text-slate-400 mt-1 line-clamp-2 ${isKannada ? 'font-kannada' : ''}`}>
        {isKannada ? (lesson.descriptionKannada || lesson.description) : lesson.description}
      </p>
    </div>
  );
};

export default LessonCard;
