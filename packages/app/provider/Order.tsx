import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import React from 'react'
import { useClient } from './client'

interface Order {
  id: string
  files: string[]
}

interface OrderContext {
  order: any
  createOrder: UseMutationResult<AxiosResponse<Order>, unknown, any, unknown>
}

const OrderContext = React.createContext<OrderContext | null>(null)

export function useOrders() {
  const client = useClient()

  const createOrder = useMutation(async (order: { urls: string[] }) => {
    const { data } = await client.post('/orders', order)

    return data
  })

  const orders = useQuery(['orders'], async () => {
    const { data } = await client.get('/orders')

    return data
  })

  return { createOrder, orders }
}

export function useOrder(id?: string) {
  const client = useClient()
  console.log(id)
  const order = useQuery(
    ['orders', id],
    async () => {
      const { data } = await client.get(`/orders/${id}`)

      return data
    },
    {
      enabled: Boolean(id),
    }
  )

  return order
}
