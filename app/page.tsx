'use client';

import { useState } from 'react';
import { TestForm } from '@/components/TestForm';
import { ResultView } from '@/components/ResultView';

export default function Home() {
  const [taskId, setTaskId] = useState<string | null>(null);
  
  const handleReset = () => {
    setTaskId(null);
  };
  
  if (taskId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            English Placement Test
          </h1>
          <ResultView taskId={taskId} onReset={handleReset} />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          English Placement Test
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Jawab semua pertanyaan di bawah ini untuk mengetahui level bahasa Inggris Anda
        </p>
        <TestForm onSuccess={setTaskId} />
      </div>
    </div>
  );
}