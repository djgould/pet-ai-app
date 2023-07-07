import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { useClient } from './client'

interface User {
  id: string
  uid: string
  tier: string
}

export function useUser() {
  const client = useClient()
  const user = useQuery(['user'], async () => {
    const { data } = await client.get<User>(`/user/me`)

    return data
  })

  return user
}
