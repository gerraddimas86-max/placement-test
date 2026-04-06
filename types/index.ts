export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category: 'grammar' | 'vocabulary' | 'reading';
}

export interface TestAnswer {
  questionId: number;
  selectedAnswer: number;
}

export interface TestSubmission {
  answers: TestAnswer[];
  userEmail?: string;
  userName?: string;
}

export interface TestResult {
  taskId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  score?: number;
  totalQuestions?: number;
  percentage?: number;
  feedback?: string;
  createdAt?: string;
  completedAt?: string;
  error?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}