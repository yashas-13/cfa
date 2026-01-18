
import React, { useState, useRef } from 'react';
import { Mic, Square, X, RefreshCcw, Loader2, Sparkles, Play, Volume2 } from 'lucide-react';
import { analyzePronunciation, getGermanSpeech } from '../services/geminiService';
import { VocabularyItem } from '../types';

interface Props {
  item: VocabularyItem;
  onClose: () => void;
}

const PronunciationModal: React.FC<Props> = ({ item, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const playbackRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Convert to base64 for Gemini
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Data = (reader.result as string).split(',')[1];
          await handleAnalysis(base64Data, 'audio/webm');
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleAnalysis = async (base64: string, mimeType: string) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzePronunciation(item.german, base64, mimeType);
      setFeedback(result || "Could not analyze. Try again.");
    } catch (error) {
      setFeedback("Error connecting to Guru for analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playAI = () => {
    getGermanSpeech(item.german);
  };

  const playRecording = () => {
    if (playbackRef.current) {
      playbackRef.current.play();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md max-h-[95vh] rounded-3xl shadow-2xl overflow-y-auto relative animate-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
              Pronunciation Practice
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 truncate px-4">{item.german}</h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 font-kannada">{item.kannada} • {item.english}</p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="relative">
              {isRecording && (
                <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full animate-ping opacity-75"></div>
              )}
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isAnalyzing}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/20' 
                    : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/20 hover:bg-indigo-700'
                } disabled:bg-gray-300 dark:disabled:bg-slate-800 disabled:shadow-none scale-100 active:scale-95`}
              >
                {isRecording ? <Square size={28} /> : <Mic size={28} />}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-slate-400">
              {isRecording ? 'Listening... Tap to stop' : 'Tap to record yourself'}
            </p>

            {isAnalyzing && (
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-xl">
                <Loader2 size={16} className="animate-spin" />
                <span className="text-xs font-bold">Guru is analyzing...</span>
              </div>
            )}

            {feedback && (
              <div className="w-full bg-slate-50 dark:bg-slate-800/50 border border-indigo-100 dark:border-indigo-900/30 p-4 sm:p-5 rounded-2xl animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 mb-3 text-indigo-600 dark:text-indigo-400">
                  <Sparkles size={16} />
                  <span className="font-bold text-xs uppercase tracking-wider">Guru's Feedback</span>
                </div>
                <div className="text-gray-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-kannada mb-4">
                  {feedback}
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={playAI}
                    className="flex flex-col items-center gap-1.5 p-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all text-indigo-600 dark:text-indigo-400"
                  >
                    <Volume2 size={18} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Listen to AI</span>
                  </button>
                  <button 
                    onClick={playRecording}
                    className="flex flex-col items-center gap-1.5 p-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all text-gray-600 dark:text-slate-300"
                  >
                    <Play size={18} />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Your Voice</span>
                  </button>
                </div>

                <button 
                  onClick={() => { setFeedback(null); setAudioUrl(null); }}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors"
                >
                  <RefreshCcw size={12} />
                  Retry Practice
                </button>
              </div>
            )}

            {audioUrl && <audio ref={playbackRef} src={audioUrl} className="hidden" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PronunciationModal;
