import { NextRequest, NextResponse } from 'next/server';
import { submissions } from '@/lib/db';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) {
  const { taskId } = await params;
  
  const submission = submissions.get(taskId);
  
  if (!submission) {
    return NextResponse.json(
      { success: false, error: 'Task ID tidak ditemukan' },
      { status: 404, headers: corsHeaders() }
    );
  }
  
  return NextResponse.json(
    {
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
    },
    { headers: corsHeaders() }
  );
}