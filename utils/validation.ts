import { TestSubmission, TestAnswer, Question } from '@/types';

export const validateSubmission = (submission: TestSubmission): string[] => {
  const errors: string[] = [];
  
  if (!submission.answers || submission.answers.length === 0) {
    errors.push('Tidak ada jawaban yang diberikan');
    return errors;
  }
  
  submission.answers.forEach((answer: TestAnswer, index: number) => {
    if (answer.selectedAnswer === undefined || answer.selectedAnswer === null) {
      errors.push(`Jawaban untuk soal ${index + 1} belum dipilih`);
    }
  });
  
  return errors;
};

export const calculateScore = (answers: TestAnswer[], questions: Question[]): number => {
  let correct = 0;
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question && question.correctAnswer === answer.selectedAnswer) {
      correct++;
    }
  });
  return correct;
};

// Data soal untuk placement test
export const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "_____ you like to go to the cinema tonight?",
    options: ["Do", "Does", "Is", "Are"],
    correctAnswer: 0,
    category: "grammar"
  },
  {
    id: 2,
    text: "She _____ to school every day by bus.",
    options: ["go", "goes", "going", "went"],
    correctAnswer: 1,
    category: "grammar"
  },
  {
    id: 3,
    text: "What is the synonym of 'happy'?",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    correctAnswer: 1,
    category: "vocabulary"
  },
  {
    id: 4,
    text: "If I _____ you, I would study harder.",
    options: ["am", "is", "were", "was"],
    correctAnswer: 3,
    category: "grammar"
  },
  {
    id: 5,
    text: "The opposite of 'expensive' is _____.",
    options: ["Cheap", "Costly", "Pricey", "Valuable"],
    correctAnswer: 0,
    category: "vocabulary"
  }
];