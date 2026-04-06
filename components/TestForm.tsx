'use client';

import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { RadioGroup } from './RadioGroup';
import { placementTestApi } from '@/services/api';
import { sampleQuestions } from '@/utils/validation';
import { TestAnswer } from '@/types';

interface TestFormProps {
  onSuccess: (taskId: string) => void;
}

interface OptionType {
  value: number;
  label: string;
}

export const TestForm: React.FC<TestFormProps> = ({ onSuccess }) => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswerChange = (questionId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all questions are answered
    const totalQuestions = sampleQuestions.length;
    const answeredCount = Object.keys(answers).length;
    
    if (answeredCount < totalQuestions) {
      setError(`Silakan jawab semua pertanyaan (${answeredCount}/${totalQuestions} terjawab)`);
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    // Prepare submission data
    const submissionAnswers: TestAnswer[] = Object.entries(answers).map(([questionId, selectedAnswer]) => ({
      questionId: parseInt(questionId),
      selectedAnswer,
    }));
    
    try {
      const response = await placementTestApi.submitTest({ answers: submissionAnswers });
      
      if (response.success && response.data?.taskId) {
        onSuccess(response.data.taskId);
      } else {
        setError(response.message || 'Gagal mengirim tes');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to convert options to RadioGroup format
  const getRadioOptions = (options: string[]): OptionType[] => {
    return options.map((opt: string, idx: number) => ({ value: idx, label: opt }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {sampleQuestions.map((question, index) => (
          <Card key={question.id} title={`Soal ${index + 1}`}>
            <div className="space-y-4">
              <p className="text-gray-800 font-medium">{question.text}</p>
              <RadioGroup
                name={`question_${question.id}`}
                options={getRadioOptions(question.options)}
                selectedValue={answers[question.id]}
                onChange={(value: number) => handleAnswerChange(question.id, value)}
                disabled={submitting}
              />
            </div>
          </Card>
        ))}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          variant="primary"
          loading={submitting}
          fullWidth
          className="py-3 text-lg"
        >
          Submit Test
        </Button>
      </div>
    </form>
  );
};