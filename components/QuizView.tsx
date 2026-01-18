
import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from 'lucide-react';
import { QuizQuestion, LanguageMode as LangMode } from '../types';
import { shuffleArray } from '../utils/helpers';

interface Props {
  questions: QuizQuestion[];
  mode: LangMode;
  onComplete: () => void;
}

const QuizView: React.FC<Props> = ({ questions, mode, onComplete }) => {
  // Randomize questions on mount
  const randomizedQuestions = useMemo(() => shuffleArray(questions), [questions]);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const isKannada = mode === LangMode.KANNADA;
  const currentQuestion = randomizedQuestions[currentIdx];

  // Randomize options for the current question
  const shuffledOptions = useMemo(() => 
    currentQuestion ? shuffleArray(currentQuestion.options) : [], 
    [currentQuestion]
  );

  const handleOptionSelect = (option: string) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);
    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < randomizedQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <Award size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isKannada ? 'ರಸಪ್ರಶ್ನೆ ಪೂರ್ಣಗೊಂಡಿದೆ!' : 'Quiz Complete!'}
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mb-8">
          {isKannada 
            ? `ನೀವು ${randomizedQuestions.length} ರಲ್ಲಿ ${score} ಅಂಕಗಳನ್ನು ಗಳಿಸಿದ್ದೀರಿ.` 
            : `You scored ${score} out of ${randomizedQuestions.length}.`}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <RotateCcw size={18} />
            {isKannada ? 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : 'Try Again'}
          </button>
          <button 
            onClick={onComplete}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
          >
            {isKannada ? 'ಪಾಠಕ್ಕೆ ಹಿಂತಿರುಗಿ' : 'Back to Lesson'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex-1 mr-6">
          <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-out"
              style={{ width: `${((currentIdx + 1) / randomizedQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-bold text-gray-400 dark:text-slate-500">
          {currentIdx + 1} / {randomizedQuestions.length}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 animate-in fade-in slide-in-from-right-4 duration-300">
        <h3 className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8 ${isKannada ? 'font-kannada' : ''}`}>
          {isKannada ? currentQuestion.questionKannada : currentQuestion.question}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {shuffledOptions.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            
            let btnClass = "p-4 rounded-xl border-2 text-left transition-all font-medium flex items-center justify-between ";
            if (!showFeedback) {
              btnClass += "border-gray-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-gray-700 dark:text-slate-300";
            } else {
              if (isCorrect) {
                btnClass += "border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400";
              } else if (isSelected) {
                btnClass += "border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
              } else {
                btnClass += "border-gray-50 dark:border-slate-800 opacity-50 grayscale text-gray-400 dark:text-slate-600";
              }
            }

            return (
              <button 
                key={idx}
                disabled={showFeedback}
                onClick={() => handleOptionSelect(option)}
                className={btnClass}
              >
                <span>{option}</span>
                {showFeedback && isCorrect && <CheckCircle2 size={20} className="text-green-500 dark:text-green-400" />}
                {showFeedback && isSelected && !isCorrect && <XCircle size={20} className="text-red-500 dark:text-red-400" />}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-800 animate-in slide-in-from-top-2">
            <h4 className="font-bold text-sm uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              {isKannada ? 'ವಿವರಣೆ' : 'Explanation'}
            </h4>
            <p className={`text-gray-700 dark:text-slate-300 font-kannada leading-relaxed`}>
              {isKannada ? currentQuestion.explanationKannada : currentQuestion.explanation}
            </p>
            <button 
              onClick={handleNext}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-md"
            >
              {currentIdx < randomizedQuestions.length - 1 
                ? (isKannada ? 'ಮುಂದಿನ ಪ್ರಶ್ನೆ' : 'Next Question') 
                : (isKannada ? 'ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ' : 'See Results')}
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizView;
