import { Button, Spinner, useToastController, XStack, YStack, ZStack } from '@my/ui'
import { ArrowLeft } from '@tamagui/lucide-icons'
import { useOrders } from 'app/provider/Order'
import { useUser } from 'app/provider/User'
import { AxiosError } from 'axios'
import React from 'react'
import { createParam } from 'solito'
import { useLink } from 'solito/link'
import { useRouter } from 'solito/router'
import { SelectorProvider, useSelector } from './context'
import RectangleScreen from './imageSelector'

const { useParam } = createParam<{ id: string }>()

export function SelectionScreen() {
  return (
    <SelectorProvider>
      <SelectedScreenContent />
    </SelectorProvider>
  )
}

function SelectedScreenContent() {
  const { images } = useSelector()
  const { createOrder } = useOrders()
  const toast = useToastController()
  const { push } = useRouter()
  const backLinkProps = useLink({
    href: '/orders',
  })
  const user = useUser()

  const submit = () => {
    if (images.some((image) => image === null)) {
      return alert('Please select all images')
    }

    createOrder.mutate(
      { urls: images as string[] },
      {
        onSuccess: (data) => {
          if (user.data?.tier === 'basic') {
            return push(`/orders/${data.id}`)
          } else {
            return push(`/orders/${data.id}/payment`)
          }
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.show(error.message)
          }
        },
      }
    )
  }

  return (
    <ZStack fullscreen>
      <XStack position="absolute" top="$4" left="$4" zIndex={4}>
        <Button {...backLinkProps}>
          <ArrowLeft />
        </Button>
      </XStack>
      <YStack
        f={1}
        jc="center"
        ai="center"
        space
        paddingBottom="$6"
        alignItems="stretch"
        fullscreen
      >
        <RectangleScreen />
        <Button onPress={submit} disabled={createOrder.isLoading}>
          {createOrder.isLoading ? <Spinner /> : 'Submit'}
        </Button>
      </YStack>
    </ZStack>
  )
}
