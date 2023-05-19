import { UseMutationResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

function createDefaultMutation<T>(): UseMutationResult<AxiosResponse<T>, unknown, any, unknown> {
  return {
    data: undefined,
    error: null,
    isError: false,
    isIdle: false,
    isLoading: false,
    isSuccess: false,
    mutate: () => {},
    mutateAsync: async () => {
      throw new Error('createOrder must be used within a OrderProvider')
    },
    reset: () => {},
    status: 'idle',
    // Add any missing properties with default values
    context: undefined,
    failureCount: 0,
    failureReason: undefined,
    isPaused: false,
    variables: undefined,
  }
}

export function useEmptyMutation<T>(): UseMutationResult<AxiosResponse<T>, unknown, any, unknown> {
  return createDefaultMutation<T>()
}
