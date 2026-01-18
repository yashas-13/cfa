
import React from 'react';
import { LanguageMode } from '../types';

interface Props {
  mode: LanguageMode;
  onChange: (mode: LanguageMode) => void;
}

const LanguageToggle: React.FC<Props> = ({ mode, onChange }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
      <button
        onClick={() => onChange(LanguageMode.ENGLISH)}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
          mode === LanguageMode.ENGLISH 
            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
            : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onChange(LanguageMode.KANNADA)}
        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all font-kannada ${
          mode === LanguageMode.KANNADA 
            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm' 
            : 'text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200'
        }`}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
};

export default LanguageToggle;
