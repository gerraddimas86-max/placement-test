import { useState, useEffect, useCallback, useRef } from 'react';
import { placementTestApi } from '@/services/api';
import { TestResult } from '@/types';

export const useResultPolling = (taskId: string | null, interval: number = 2000) => {
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const stopPolling = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const fetchResult = useCallback(async () => {
    if (!taskId || !isMountedRef.current) return false;
    
    setLoading(true);
    try {
      const response = await placementTestApi.getResult(taskId);
      if (response.success && response.data && isMountedRef.current) {
        setResult(response.data);
        setError(null);
        
        // Stop polling if completed or failed
        if (response.data.status === 'completed' || response.data.status === 'failed') {
          stopPolling();
          return true;
        }
      } else if (response.error && isMountedRef.current) {
        setError(response.error);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError('Gagal mengambil hasil tes');
        console.error(err);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
    return false;
  }, [taskId, stopPolling]);

  useEffect(() => {
    isMountedRef.current = true;
    
    if (!taskId) return;
    
    // Initial fetch
    fetchResult();
    
    // Setup polling interval
    const poll = async () => {
      const shouldStop = await fetchResult();
      if (!shouldStop && isMountedRef.current) {
        timeoutRef.current = setTimeout(poll, interval);
      }
    };
    
    timeoutRef.current = setTimeout(poll, interval);
    
    return () => {
      isMountedRef.current = false;
      stopPolling();
    };
  }, [taskId, interval, fetchResult, stopPolling]);

  return { result, loading, error, stopPolling };
};