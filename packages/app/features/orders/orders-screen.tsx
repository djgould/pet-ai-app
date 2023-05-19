import {
  Button,
  Paragraph,
  XStack,
  YStack,
  H2,
  Spinner,
  ListItem,
  Separator,
  YGroup,
  Card,
  Image,
  H1,
} from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { Star, ChevronRight, Moon } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import { useClient } from 'app/provider/client'
import { useOrders } from 'app/provider/Order'
import React from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { DateTime } from 'luxon'
import { OrderCard } from './OrderCard'

const { useParam } = createParam<{ id: string }>()

export function OrdersScreen() {
  const [id] = useParam('id')
  const client = useClient()
  const { push } = useRouter()
  const { orders } = useOrders()

  return (
    <YStack f={1} jc="center" ai="center">
      <H1>Your Orders</H1>
      <YGroup alignItems="center" width="100%" height="100%" separator={<Separator />}>
        {orders.data?.map((order) => (
          <OrderCard order={order} />
        ))}
      </YGroup>
    </YStack>
  )
}
