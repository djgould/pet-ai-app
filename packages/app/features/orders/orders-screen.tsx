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
import { Star, ChevronRight, Moon, Pencil, Plus, UserCircle2 } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import { useClient } from 'app/provider/client'
import { useOrders } from 'app/provider/Order'
import React from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { DateTime } from 'luxon'
import { OrderCard } from './OrderCard'
import { NoOrdersCard } from './NoOrdersCard'
import { useLink } from 'solito/link'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const { useParam } = createParam<{ id: string }>()

export function OrdersScreen() {
  const [id] = useParam('id')
  const client = useClient()
  const { push } = useRouter()
  const { orders } = useOrders()
  const linkProps = useLink({
    href: '/selector',
  })
  const profileLinkProps = useLink({
    href: '/profile',
  })

  if (orders.isFetched && orders.data?.length === 0) {
    return (
      <YStack f={1} jc="center" ai="center">
        <H1>Your Orders</H1>
        <YGroup alignItems="center" width="100%" height="100%" separator={<Separator />}>
          <NoOrdersCard />
        </YGroup>
      </YStack>
    )
  }

  return (
    <YStack f={1} jc="center" ai="center">
      <XStack justifyContent="center" alignItems="center" space="$4">
        <Button mt="$2" theme="blue" size="$3" {...profileLinkProps}>
          <UserCircle2 />
        </Button>
        <H1 flexGrow={1} textAlign="center">
          Your Orders
        </H1>
        <Button mt="$2" theme="blue" {...linkProps} size="$3">
          <Plus />
        </Button>
      </XStack>
      <YGroup alignItems="center" width="100%" height="100%" separator={<Separator />}>
        {orders.data?.map((order) => (
          <OrderCard order={order} />
        ))}
      </YGroup>
    </YStack>
  )
}
