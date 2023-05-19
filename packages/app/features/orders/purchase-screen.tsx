import { Button, Paragraph, XStack, YStack, H2, Spinner } from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useMutation } from '@tanstack/react-query'
import { useClient } from 'app/provider/client'
import React from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

const { useParam } = createParam<{ id: string }>()

export function PurchaseScreen() {
  const [id] = useParam('id')
  const client = useClient()
  const { push } = useRouter()

  const createCheckoutSession = useMutation(
    async () => {
      console.log(id)
      const response = await client.post('/stripe/create-checkout-session', {
        order_id: id,
      })
      return response.data
    },
    {
      onSuccess: (data) => {
        console.log(data)
        push(data.url)
      },
    }
  )

  return (
    <YStack f={1} jc="center" ai="center" fullscreen overflow="hidden">
      <YStack fullscreen zIndex={'$1'} f={1} jc="flex-end" ai="center">
        <LinearGradient
          position="absolute"
          colors={['transparent', 'rgba(0,0,0,0.9)', 'rgba(0,0,0,1)']}
          locations={[0.0, 0.3, 1.0]}
          width="100%"
          height="$19"
        />
        <YStack space="$4" maw={600} pb="$4">
          <H2 ta="center">Photos uploaded!</H2>
          <Paragraph ta="center">To complete your order please finish the payment step.</Paragraph>
        </YStack>

        <XStack marginBottom="$4">
          <Button
            onPress={() => createCheckoutSession.mutate()}
            disabled={createCheckoutSession.isLoading}
          >
            {createCheckoutSession.isLoading ? (
              <Spinner size="small" color="$green10" />
            ) : (
              'Pay $10'
            )}
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
