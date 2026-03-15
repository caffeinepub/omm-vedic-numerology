import React, { useState } from 'react';
import { ServiceType } from '../../backend';

interface QuizQuestion {
  question: string;
  options: Array<{ label: string; value: string; points: Record<string, number> }>;
}

const questions: QuizQuestion[] = [
  {
    question: 'Which area of life needs the most guidance right now?',
    options: [
      { label: '💼 Career & Finances', value: 'career', points: { numerology: 3, tarot: 1, vastu: 1, pronology: 2 } },
      { label: '🏠 Home & Family Harmony', value: 'home', points: { numerology: 1, tarot: 0, vastu: 4, pronology: 1 } },
      { label: '❤️ Love & Relationships', value: 'love', points: { numerology: 2, tarot: 3, vastu: 0, pronology: 2 } },
      { label: '🌟 Personal Identity & Purpose', value: 'identity', points: { numerology: 2, tarot: 1, vastu: 0, pronology: 4 } },
    ],
  },
  {
    question: 'What resonates most with you?',
    options: [
      { label: '🔢 Numbers and patterns in life', value: 'numbers', points: { numerology: 4, tarot: 0, vastu: 1, pronology: 2 } },
      { label: '🃏 Symbols and hidden meanings', value: 'symbols', points: { numerology: 0, tarot: 4, vastu: 1, pronology: 1 } },
      { label: '🏛️ Space, energy, and environment', value: 'space', points: { numerology: 1, tarot: 0, vastu: 4, pronology: 0 } },
      { label: '🔤 Words, names, and vibrations', value: 'words', points: { numerology: 1, tarot: 1, vastu: 0, pronology: 4 } },
    ],
  },
  {
    question: 'What kind of insight are you seeking?',
    options: [
      { label: '🔮 Predictions about my future', value: 'future', points: { numerology: 2, tarot: 4, vastu: 0, pronology: 1 } },
      { label: '📊 Understanding my life patterns', value: 'patterns', points: { numerology: 4, tarot: 1, vastu: 0, pronology: 2 } },
      { label: '🌿 Improving my living environment', value: 'environment', points: { numerology: 0, tarot: 0, vastu: 5, pronology: 0 } },
      { label: '✨ Changing my luck through my name', value: 'name', points: { numerology: 1, tarot: 0, vastu: 0, pronology: 5 } },
    ],
  },
  {
    question: 'How do you prefer to receive guidance?',
    options: [
      { label: '📅 Through dates and birth numbers', value: 'dates', points: { numerology: 5, tarot: 0, vastu: 0, pronology: 1 } },
      { label: '🎴 Through visual cards and stories', value: 'cards', points: { numerology: 0, tarot: 5, vastu: 0, pronology: 0 } },
      { label: '🧭 Through spatial arrangement advice', value: 'spatial', points: { numerology: 0, tarot: 0, vastu: 5, pronology: 0 } },
      { label: '🔡 Through name analysis and correction', value: 'nameanalysis', points: { numerology: 1, tarot: 0, vastu: 0, pronology: 5 } },
    ],
  },
];

const serviceDetails: Record<string, { name: string; emoji: string; description: string; serviceType: ServiceType }> = {
  numerology: {
    name: 'Numerology',
    emoji: '🔢',
    description: 'Discover the hidden power of numbers in your life. Your birth date and name hold cosmic codes that reveal your destiny, personality, and life purpose.',
    serviceType: ServiceType.numerology,
  },
  tarot: {
    name: 'Tarot Card Reading',
    emoji: '🃏',
    description: 'Gain profound insights into your past, present, and future through the ancient art of Tarot. Each card reveals hidden truths and guides your path forward.',
    serviceType: ServiceType.tarotCardReading,
  },
  vastu: {
    name: 'Vastu Shastra',
    emoji: '🏠',
    description: 'Transform your living and working spaces using ancient Vedic architecture principles. Align your environment with cosmic energies to attract prosperity and harmony.',
    serviceType: ServiceType.vastu,
  },
  pronology: {
    name: 'Pronology',
    emoji: '🔤',
    description: 'Harness the vibrational power of your name. Pronology reveals how the sounds and letters in your name influence your destiny and how small changes can transform your life.',
    serviceType: ServiceType.pronology,
  },
};

interface SpiritualProfileQuizProps {
  onRecommendService: (serviceType: ServiceType) => void;
}

export default function SpiritualProfileQuiz({ onRecommendService }: SpiritualProfileQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [scores, setScores] = useState({ numerology: 0, tarot: 0, vastu: 0, pronology: 0 });
  const [completed, setCompleted] = useState(false);
  const [recommended, setRecommended] = useState<string>('');

  const handleAnswer = (option: QuizQuestion['options'][0]) => {
    const newScores = {
      numerology: scores.numerology + option.points.numerology,
      tarot: scores.tarot + option.points.tarot,
      vastu: scores.vastu + option.points.vastu,
      pronology: scores.pronology + option.points.pronology,
    };
    setScores(newScores);
    setAnswers([...answers, option.value]);

    if (currentQuestion + 1 >= questions.length) {
      // Find winner
      const winner = Object.entries(newScores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      setRecommended(winner);
      setCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setScores({ numerology: 0, tarot: 0, vastu: 0, pronology: 0 });
    setCompleted(false);
    setRecommended('');
  };

  const handleBookService = () => {
    if (recommended && serviceDetails[recommended]) {
      onRecommendService(serviceDetails[recommended].serviceType);
    }
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-cosmic-950 via-cosmic-900 to-cosmic-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-gold-400 font-cinzel text-sm tracking-[0.3em] uppercase">Discover Your Path</span>
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mt-2">
            Spiritual <span className="text-gold-400">Profile Quiz</span>
          </h2>
          <p className="text-cosmic-300 mt-3 font-cormorant text-lg">
            Answer 4 questions to discover which service aligns with your cosmic journey
          </p>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        <div className="rounded-2xl border border-gold-400/20 bg-cosmic-900/80 backdrop-blur-sm overflow-hidden shadow-gold">
          {!completed ? (
            <div className="p-8">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-cosmic-400 font-cinzel mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-1.5 bg-cosmic-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="font-cinzel text-xl text-white mb-8 text-center leading-relaxed">
                {questions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(option)}
                    className="group p-5 rounded-xl border border-gold-400/20 hover:border-gold-400/60 bg-cosmic-800/50 hover:bg-gold-400/10 text-left transition-all duration-300 hover:shadow-gold transform hover:-translate-y-0.5"
                  >
                    <span className="text-cosmic-200 group-hover:text-gold-200 font-cormorant text-lg leading-snug transition-colors">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">{serviceDetails[recommended]?.emoji}</div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 mb-4">
                <span className="text-gold-400 text-xs font-cinzel tracking-widest uppercase">Your Cosmic Match</span>
              </div>
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-400 mb-4">
                {serviceDetails[recommended]?.name}
              </h3>
              <p className="text-cosmic-200 font-cormorant text-lg leading-relaxed max-w-xl mx-auto mb-8">
                {serviceDetails[recommended]?.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleBookService}
                  className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-cosmic-950 font-cinzel font-bold rounded-full transition-all duration-300 shadow-gold hover:shadow-gold-lg transform hover:-translate-y-0.5"
                >
                  Book This Service · ₹400
                </button>
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 border border-gold-400/40 hover:border-gold-400 text-gold-400 hover:text-gold-300 font-cinzel font-semibold rounded-full transition-all duration-300 hover:bg-gold-400/10"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
