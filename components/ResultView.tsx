'use client';

import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Spinner } from './Spinner';
import { useResultPolling } from '@/hooks/useResultPolling';

interface ResultViewProps {
  taskId: string;
  onReset?: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ taskId, onReset }) => {
  const { result, loading, error } = useResultPolling(taskId);

  const getStatusMessage = () => {
    if (result?.status === 'pending') return 'Tes sedang diantrekan...';
    if (result?.status === 'processing') return 'Sedang memproses jawaban Anda...';
    if (result?.status === 'failed') return 'Gagal memproses tes';
    if (result?.status === 'completed') return 'Tes selesai!';
    return 'Memuat hasil...';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-blue-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading && !result) {
    return (
      <Card>
        <div className="text-center py-8">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">{getStatusMessage()}</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <div className="text-center py-8">
          <div className="text-red-600 text-xl mb-2">⚠️</div>
          <p className="text-red-600">{error}</p>
          {onReset && (
            <Button onClick={onReset} variant="primary" className="mt-4">
              Coba Lagi
            </Button>
          )}
        </div>
      </Card>
    );
  }

  if (result?.status === 'completed') {
    return (
      <Card>
        <div className="text-center py-4">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-4">Hasil Placement Test</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Skor Anda</div>
              <div className={`text-4xl font-bold ${getScoreColor(result.percentage || 0)}`}>
                {result.score}/{result.totalQuestions}
              </div>
              <div className="text-lg text-gray-600 mt-1">
                ({result.percentage?.toFixed(1)}%)
              </div>
            </div>
            
            {result.feedback && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-blue-600 mb-1">Feedback</div>
                <div className="text-gray-700">{result.feedback}</div>
              </div>
            )}
            
            <div className="text-xs text-gray-400 mt-4">
              Task ID: {taskId}
            </div>
            
            {onReset && (
              <Button onClick={onReset} variant="secondary" className="mt-4">
                Ambil Tes Lagi
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div className="text-center py-8">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">{getStatusMessage()}</p>
        <p className="text-sm text-gray-400 mt-2">Mohon tunggu, ini hanya beberapa detik...</p>
      </div>
    </Card>
  );
};