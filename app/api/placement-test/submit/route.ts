import { NextRequest, NextResponse } from 'next/server';
import { TestSubmission } from '@/types';
import { sampleQuestions, calculateScore } from '@/utils/validation';
import { submissions } from '@/lib/db';

function getFeedbackByScore(percentage: number): string {
  if (percentage >= 80) return 'Excellent! Your English level is Advanced';
  if (percentage >= 60) return 'Good! Your English level is Intermediate';
  if (percentage >= 40) return 'Fair. Your English level is Pre-Intermediate';
  return 'Keep learning! Your English level is Beginner';
}

export async function POST(request: NextRequest) {
  try {
    const submission: TestSubmission = await request.json();
    
    // Validasi
    if (!submission.answers || submission.answers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tidak ada jawaban yang diberikan' },
        { status: 400 }
      );
    }
    
    // Generate taskId
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    
    // Simpan submission
    submissions.set(taskId, {
      submission,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });
    
    // Simulasi proses async
    setTimeout(async () => {
      try {
        // Update status ke processing
        const currentData = submissions.get(taskId);
        if (currentData) {
          submissions.set(taskId, {
            ...currentData,
            status: 'processing',
          });
        }
        
        // Hitung score
        const score = calculateScore(submission.answers, sampleQuestions);
        const totalQuestions = sampleQuestions.length;
        const percentage = (score / totalQuestions) * 100;
        
        // Update ke completed
        submissions.set(taskId, {
          ...submissions.get(taskId),
          status: 'completed',
          score,
          totalQuestions,
          percentage,
          feedback: getFeedbackByScore(percentage),
          completedAt: new Date().toISOString(),
        });
      } catch (error) {
        submissions.set(taskId, {
          ...submissions.get(taskId),
          status: 'failed',
          error: 'Gagal memproses hasil',
        });
      }
    }, 3000);
    
    return NextResponse.json({
      success: true,
      data: { taskId },
      message: 'Tes berhasil dikirim, sedang diproses',
    });
    
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}