
import { Lesson, GrammarTopic } from './types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'g1',
    title: 'Genders & Articles (Der, Die, Das)',
    titleKannada: 'ಲಿಂಗಗಳು ಮತ್ತು ಲೇಖನಗಳು',
    summary: 'Understanding the three genders in German and how they differ from English.',
    summaryKannada: 'ಜರ್ಮನ್‌ನಲ್ಲಿರುವ ಮೂರು ಲಿಂಗಗಳನ್ನು ಮತ್ತು ಅವು ಇಂಗ್ಲಿಷ್‌ಗಿಂತ ಹೇಗೆ ಭಿನ್ನವಾಗಿವೆ ಎಂಬುದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳುವುದು.',
    icon: 'Type'
  },
  {
    id: 'g2',
    title: 'Sentence Structure (V2 Rule)',
    titleKannada: 'ವಾಕ್ಯ ರಚನೆ (V2 ನಿಯಮ)',
    summary: 'The golden rule of where the verb sits in a German sentence.',
    summaryKannada: 'ಜರ್ಮನ್ ವಾಕ್ಯದಲ್ಲಿ ಕ್ರಿಯಾಪದವು ಎಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳುತ್ತದೆ ಎಂಬುವ ಸುವರ್ಣ ನಿಯಮ.',
    icon: 'Layout'
  },
  {
    id: 'g3',
    title: 'Personal Pronouns',
    titleKannada: 'ಪುರುಷವಾಚಕ ಸರ್ವನಾಮಗಳು',
    summary: 'I, You, He, She, It in German - including formal and informal "You".',
    summaryKannada: 'ಜರ್ಮನ್‌ನಲ್ಲಿ ನಾನು, ನೀನು, ಅವನು, ಅವಳು - ಗೌರವಾನ್ವಿತ ಮತ್ತು ಸಾಮಾನ್ಯ "ನೀನು" ಸೇರಿದಂತೆ.',
    icon: 'Users'
  }
];

export const LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Greetings & Introductions',
    titleKannada: 'ಶುಭಾಶಯಗಳು ಮತ್ತು ಪರಿಚಯ',
    level: 'A1',
    description: 'Learn how to say hello and introduce yourself in German.',
    descriptionKannada: 'ಜರ್ಮನ್ ಭಾಷೆಯಲ್ಲಿ ಹಲೋ ಹೇಳುವುದು ಮತ್ತು ನಿಮ್ಮನ್ನು ಪರಿಚಯಿಸಿಕೊಳ್ಳುವುದನ್ನು ಕಲಿಯಿರಿ.',
    content: [
      { german: 'Hallo', english: 'Hello', kannada: 'ಹಲೋ / ನಮಸ್ಕಾರ', pronunciation: 'hah-loh' },
      { german: 'Guten Tag', english: 'Good day', kannada: 'ಶುಭ ದಿನ', pronunciation: 'goo-ten tahk' },
      { german: 'Wie geht es dir?', english: 'How are you?', kannada: 'ನೀವು ಹೇಗಿದ್ದೀರಿ?', pronunciation: 'vee gayt es deer' },
      { german: 'Ich heiße...', english: 'My name is...', kannada: 'ನನ್ನ ಹೆಸರು...', pronunciation: 'ikh hy-suh' },
      { german: 'Tschüss', english: 'Bye', kannada: 'ಬೈ / ಹೋಗಿ ಬರುತ್ತೇನೆ', pronunciation: 'tchuess' },
      { german: 'Freut mich', english: 'Nice to meet you', kannada: 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದಕ್ಕೆ ಸಂತೋಷ', pronunciation: 'froyt mikh' },
      { german: 'Auf Wiedersehen', english: 'Goodbye (Formal)', kannada: 'ವಿದಾಯ', pronunciation: 'owf vee-der-zayn' },
    ],
    quiz: [
      {
        id: 'q1-1',
        question: 'What is the German word for "Hello"?',
        questionKannada: '"ಹಲೋ" ಗೆ ಜರ್ಮನ್ ಪದ ಯಾವುದು?',
        options: ['Tschüss', 'Hallo', 'Guten Tag', 'Ja'],
        correctAnswer: 'Hallo',
        explanation: '"Hallo" is the informal way to say Hello in German.',
        explanationKannada: '"Hallo" ಎಂಬುದು ಜರ್ಮನ್‌ನಲ್ಲಿ ಹಲೋ ಎಂದು ಹೇಳುವ ಅನೌಪಚಾರಿಕ ವಿಧಾನವಾಗಿದೆ.'
      },
      {
        id: 'q1-2',
        question: 'How do you say "My name is..." in German?',
        questionKannada: 'ಜರ್ಮನ್‌ನಲ್ಲಿ "ನನ್ನ ಹೆಸರು..." ಎಂದು ಹೇಗೆ ಹೇಳುತ್ತೀರಿ?',
        options: ['Ich heiße...', 'Wie geht es dir?', 'Danke', 'Bitte'],
        correctAnswer: 'Ich heiße...',
        explanation: '"Ich heiße" literally means "I am called".',
        explanationKannada: '"Ich heiße" ಎಂದರೆ "ನನ್ನನ್ನು ಕರೆಯಲಾಗುತ್ತದೆ" ಎಂದು ಅರ್ಥ.'
      },
      {
        id: 'q1-3',
        question: 'Which is a formal way to say Goodbye?',
        questionKannada: 'ವಿದಾಯ ಹೇಳಲು ಔಪಚಾರಿಕ ಮಾರ್ಗ ಯಾವುದು?',
        options: ['Tschüss', 'Auf Wiedersehen', 'Hallo', 'Freut mich'],
        correctAnswer: 'Auf Wiedersehen',
        explanation: 'Auf Wiedersehen is the polite way to say goodbye.',
        explanationKannada: 'Auf Wiedersehen ಎನ್ನುವುದು ವಿದಾಯ ಹೇಳುವ ಸುಸಂಸ್ಕೃತ ಮಾರ್ಗವಾಗಿದೆ.'
      }
    ],
    dialogue: {
      startNodeId: 'start',
      nodes: {
        'start': {
          id: 'start',
          text: 'Hallo! Wie geht es dir?',
          english: 'Hello! How are you?',
          kannada: 'ಹಲೋ! ನೀವು ಹೇಗಿದ್ದೀರಿ?',
          options: [
            { text: 'Mir geht es gut, danke.', english: 'I am doing well, thanks.', kannada: 'ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ, ಧನ್ಯವಾದಗಳು.', nextNodeId: 'node2' },
            { text: 'Nicht so gut.', english: 'Not so good.', kannada: 'ಅಷ್ಟೊಂದು ಚೆನ್ನಾಗಿಲ್ಲ.', nextNodeId: 'node3' }
          ]
        },
        'node2': {
          id: 'node2',
          text: 'Das freut mich! Wie heißt du?',
          english: 'I am happy to hear that! what is your name?',
          kannada: 'ಅದನ್ನು ಕೇಳಿ ಸಂತೋಷವಾಯಿತು! ನಿಮ್ಮ ಹೆಸರೇನು?',
          options: [
            { text: 'Ich heiße Student.', english: 'My name is Student.', kannada: 'ನನ್ನ ಹೆಸರು ವಿದ್ಯಾರ್ಥಿ.', nextNodeId: 'end' }
          ]
        },
        'node3': {
          id: 'node3',
          text: 'Oh, das tut mir leid. Kann ich helfen?',
          english: 'Oh, I am sorry. Can I help?',
          kannada: 'ಓಹ್, ಕ್ಷಮಿಸಿ. ನಾನು ಸಹಾಯ ಮಾಡಬಹುದೇ?',
          options: [
            { text: 'Ja, bitte.', english: 'Yes, please.', kannada: 'ಹೌದು, ದಯವಿಟ್ಟು.', nextNodeId: 'end' },
            { text: 'Nein, danke.', english: 'No, thanks.', kannada: 'ಇಲ್ಲ, ಧನ್ಯವಾದಗಳು.', nextNodeId: 'end' }
          ]
        },
        'end': {
          id: 'end',
          text: 'Schön dich kennenzulernen! Tschüss!',
          english: 'Nice to meet you! Bye!',
          kannada: 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದಕ್ಕೆ ಸಂತೋಷ! ಹೋಗಿ ಬರುತ್ತೇನೆ!',
          options: []
        }
      }
    }
  },
  {
    id: '2',
    title: 'Numbers (1-10)',
    titleKannada: 'ಸಂಖ್ಯೆಗಳು (೧-೧೦)',
    level: 'A1',
    description: 'Master the basic numbers for daily counting.',
    descriptionKannada: 'ದೈನಂದಿನ ಎಣಿಕೆಗಾಗಿ ಮೂಲ ಸಂಖ್ಯೆಗಳನ್ನು ಕಲಿಯಿರಿ.',
    content: [
      { german: 'Eins', english: 'One', kannada: 'ಒಂದು', pronunciation: 'eyns' },
      { german: 'Zwei', english: 'Two', kannada: 'ಎರಡು', pronunciation: 'tsvay' },
      { german: 'Drei', english: 'Three', kannada: 'ಮೂರು', pronunciation: 'dry' },
      { german: 'Vier', english: 'Four', kannada: 'ನಾಲ್ಕು', pronunciation: 'fyeer' },
      { german: 'Fünf', english: 'Five', kannada: 'ಐದು', pronunciation: 'fuenf' },
      { german: 'Sechs', english: 'Six', kannada: 'ಆರು', pronunciation: 'zeks' },
      { german: 'Sieben', english: 'Seven', kannada: 'ಏಳು', pronunciation: 'zee-ben' },
      { german: 'Acht', english: 'Eight', kannada: 'ಎಂಟು', pronunciation: 'akht' },
      { german: 'Neun', english: 'Nine', kannada: 'ಒಂಬತ್ತು', pronunciation: 'noyn' },
      { german: 'Zehn', english: 'Ten', kannada: 'ಹತ್ತು', pronunciation: 'tsayn' },
    ],
    quiz: [
      {
        id: 'q2-1',
        question: 'What is the German word for "Three"?',
        questionKannada: '"ಮೂರು" ಗೆ ಜರ್ಮನ್ ಪದ ಯಾವುದು?',
        options: ['Eins', 'Zwei', 'Drei', 'Vier'],
        correctAnswer: 'Drei',
        explanation: 'Drei is the German word for 3.',
        explanationKannada: 'Drei ಎಂಬುದು 3 ಕ್ಕ್ಕೆ ಜರ್ಮನ್ ಪದವಾಗಿದೆ.'
      },
      {
        id: 'q2-2',
        question: 'Which number is "Acht"?',
        questionKannada: '"Acht" ಯಾವ ಸಂಖ್ಯೆ?',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        explanation: 'Acht corresponds to number 8.',
        explanationKannada: 'Acht ಎನ್ನುವುದು ಸಂಖ್ಯೆ 8 ಕ್ಕೆ ಸಮಾನವಾಗಿದೆ.'
      }
    ],
    dialogue: {
      startNodeId: 'start',
      nodes: {
        'start': {
          id: 'start',
          text: 'Wie viele Äpfel hast du?',
          english: 'How many apples do you have?',
          kannada: 'ನಿಮ್ಮ ಬಳಿ ಎಷ್ಟು ಸೇಬುಗಳಿವೆ?',
          options: [
            { text: 'Ich habe eins.', english: 'I have one.', kannada: 'ನನ್ನ ಬಳಿ ಒಂದು ಇದೆ.', nextNodeId: 'node2' },
            { text: 'Ich habe zwei.', english: 'I have two.', kannada: 'ನನ್ನ ಬಳಿ ಎರಡು ಇವೆ.', nextNodeId: 'node2' }
          ]
        },
        'node2': {
          id: 'node2',
          text: 'Möchtest du noch eins?',
          english: 'Would you like another one?',
          kannada: 'ನಿಮಗೆ ಇನ್ನೊಂದು ಬೇಕೇ?',
          options: [
            { text: 'Ja, gerne!', english: 'Yes, gladly!', kannada: 'ಹೌದು, ಸಂತೋಷದಿಂದ!', nextNodeId: 'end' },
            { text: 'Nein, danke.', english: 'No, thanks.', kannada: 'ಇಲ್ಲ, ಧನ್ಯವಾದಗಳು.', nextNodeId: 'end' }
          ]
        },
        'end': {
          id: 'end',
          text: 'Alles klar! Bis bald.',
          english: 'All right! See you soon.',
          kannada: 'ಸರಿ! ಶೀಘ್ರದಲ್ಲೇ ಭೇಟಿಯಾಗೋಣ.',
          options: []
        }
      }
    }
  },
  {
    id: '3',
    title: 'Common Phrases',
    titleKannada: 'ಸಾಮಾನ್ಯ ನುಡಿಗಟ್ಟುಗಳು',
    level: 'A1',
    description: 'Essential phrases for everyday communication.',
    descriptionKannada: 'ದೈನಂದಿನ ಸಂವಹನಕ್ಕೆ ಅಗತ್ಯವಾದ ನುಡಿಗಟ್ಟುಗಳು.',
    content: [
      { german: 'Bitte', english: 'Please / You\'re welcome', kannada: 'ದಯವಿಟ್ಟು / ಸ್ವಾಗತ', pronunciation: 'bit-tuh' },
      { german: 'Danke', english: 'Thank you', kannada: 'ಧನ್ಯವಾದಗಳು', pronunciation: 'dan-kuh' },
      { german: 'Entschuldigung', english: 'Excuse me / Sorry', kannada: 'ಕ್ಷಮಿಸಿ', pronunciation: 'ent-shool-dee-goong' },
      { german: 'Ja', english: 'Yes', kannada: 'ಹೌದು', pronunciation: 'yah' },
      { german: 'Nein', english: 'No', kannada: 'ಇಲ್ಲ', pronunciation: 'nine' },
      { german: 'Kein Problem', english: 'No problem', kannada: 'ಏನೂ ತೊಂದರೆ ಇಲ್ಲ', pronunciation: 'kayn pro-blaym' },
    ],
    quiz: [
      {
        id: 'q3-1',
        question: 'How do you say "Thank you" in German?',
        questionKannada: 'ಜರ್ಮನ್‌ನಲ್ಲಿ "ಧನ್ಯವಾದಗಳು" ಎಂದು ಹೇಗೆ ಹೇಳುತ್ತೀರಿ?',
        options: ['Bitte', 'Danke', 'Ja', 'Nein'],
        correctAnswer: 'Danke',
        explanation: '"Danke" is the standard way to say Thank You.',
        explanationKannada: '"Danke" ಎಂಬುದು ಧನ್ಯವಾದಗಳು ಹೇಳಲು ಪ್ರಮಾಣಿತ ಮಾರ್ಗವಾಗಿದೆ.'
      },
      {
        id: 'q3-2',
        question: 'What does "Entschuldigung" mean?',
        questionKannada: '"Entschuldigung" ಎಂದರೆ ಏನು?',
        options: ['Yes', 'No', 'Excuse me', 'Please'],
        correctAnswer: 'Excuse me',
        explanation: 'Entschuldigung is used to apologize or get attention.',
        explanationKannada: 'Entschuldigung ಎನ್ನುವುದನ್ನು ಕ್ಷಮೆ ಕೇಳಲು ಅಥವಾ ಗಮನ ಸೆಳೆಯಲು ಬಳಸಲಾಗುತ್ತದೆ.'
      }
    ],
    dialogue: {
      startNodeId: 'start',
      nodes: {
        'start': {
          id: 'start',
          text: 'Entschuldigung, wo ist der Bahnhof?',
          english: 'Excuse me, where is the train station?',
          kannada: 'ಕ್ಷಮಿಸಿ, ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?',
          options: [
            { text: 'Geradeaus, bitte.', english: 'Straight ahead, please.', kannada: 'ನೇರವಾಗಿ ಹೋಗಿ, ದಯವಿಟ್ಟು.', nextNodeId: 'node2' }
          ]
        },
        'node2': {
          id: 'node2',
          text: 'Vielen Dank für Ihre Hilfe!',
          english: 'Thank you very much for your help!',
          kannada: 'ನಿಮ್ಮ ಸಹಾಯಕ್ಕಾಗಿ ತುಂಬಾ ಧನ್ಯವಾದಗಳು!',
          options: [
            { text: 'Gern geschehen.', english: "You're welcome.", kannada: 'ಸ್ವಾಗತ / ಪರವಾಗಿಲ್ಲ.', nextNodeId: 'end' }
          ]
        },
        'end': {
          id: 'end',
          text: 'Einen schönen Tag noch!',
          english: 'Have a nice day!',
          kannada: 'ನಿಮ್ಮ ದಿನ ಶುಭವಾಗಿರಲಿ!',
          options: []
        }
      }
    }
  }
];
