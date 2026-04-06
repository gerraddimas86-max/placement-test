import { NextRequest, NextResponse } from 'next/server';
import { submissions } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  
  const submission = submissions.get(taskId);
  
  if (!submission) {
    return NextResponse.json(
      { success: false, error: 'Task ID tidak ditemukan' },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    success: true,
    data: {
      taskId,
      status: submission.status,
      score: submission.score,
      totalQuestions: submission.totalQuestions,
      percentage: submission.percentage,
      feedback: submission.feedback,
      createdAt: submission.createdAt,
      completedAt: submission.completedAt,
      error: submission.error,
    },
  });
}