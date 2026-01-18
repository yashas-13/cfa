
export enum LanguageMode {
  ENGLISH = 'English',
  KANNADA = 'Kannada'
}

export interface VocabularyItem {
  german: string;
  english: string;
  kannada: string;
  pronunciation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionKannada: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  explanationKannada: string;
}

export interface DialogueOption {
  text: string;
  nextNodeId: string | null;
  english: string;
  kannada: string;
}

export interface DialogueNode {
  id: string;
  text: string;
  english: string;
  kannada: string;
  options: DialogueOption[];
}

export interface Dialogue {
  nodes: Record<string, DialogueNode>;
  startNodeId: string;
}

export interface GrammarTopic {
  id: string;
  title: string;
  titleKannada: string;
  summary: string;
  summaryKannada: string;
  icon: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleKannada: string;
  level: 'A1' | 'A2';
  description: string;
  descriptionKannada: string;
  content: VocabularyItem[];
  quiz: QuizQuestion[];
  dialogue: Dialogue;
  isAI?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
