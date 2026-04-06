import axios from 'axios';
import { TestSubmission, TestResult, ApiResponse } from '@/types';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const placementTestApi = {
  submitTest: async (submission: TestSubmission): Promise<ApiResponse<{ taskId: string }>> => {
    const response = await apiClient.post('/placement-test/submit', submission);
    return response.data;
  },
  
  getResult: async (taskId: string): Promise<ApiResponse<TestResult>> => {
    const response = await apiClient.get(`/placement-test/result/${taskId}`);
    return response.data;
  },
};