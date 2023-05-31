import { Button, Paragraph, XStack, YStack, H2, Spinner, Square, Image } from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { useMutation } from '@tanstack/react-query'
import { useClient } from 'app/provider/client'
import { useOrder } from 'app/provider/Order'
import React from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'

const { useParam } = createParam<{ id: string }>()

export function PurchaseScreen() {
  const [id] = useParam('id')
  const client = useClient()
  const { push } = useRouter()
  const order = useOrder(id)

  const createCheckoutSession = useMutation(
    async () => {
      const response = await client.post('/stripe/create-checkout-session', {
        order_id: id,
        return_url: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/orders`
          : 'http://localhost:3001/orders',
        cancel_url: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/orders`
          : 'http://localhost:3001/orders',
      })
      return response.data
    },
    {
      onSuccess: (data) => {
        push(data.url)
      },
    }
  )

  const STYLES = ['Cowboy', 'Pirate', 'King', 'Water Color', 'Christmas']

  return (
    <YStack f={1} jc="center" ai="center" fullscreen overflow="hidden">
      <YStack fullscreen zIndex={'$1'} f={1} jc="center" ai="center" space="$3">
        <YStack space="$2" maw={600}>
          <H2 ta="center">Almost Ready!</H2>
          <Paragraph ta="center">Complete Payment to finish your order</Paragraph>
        </YStack>

        <YStack
          space="$2"
          maw={600}
          width="100%"
          borderColor={'white'}
          borderWidth={1}
          p={'$3'}
          pt={'$2'}
        >
          <Paragraph>Training Images</Paragraph>
          <XStack
            justifyContent="center"
            alignContent="stretch"
            space="$3"
            width="100%"
            maxWidth={600}
          >
            {order.data?.trainingImages?.map((image) => (
              <Square
                backgroundColor={'$backgroundStrong'}
                f={1}
                alignContent="center"
                aspectRatio={1}
              >
                <Image source={{ uri: image.url }} width="100%" height="100%" />
              </Square>
            ))}
          </XStack>
        </YStack>

        <YStack space="$4" maw={600}>
          <Paragraph ta="center">
            Your order includes 100 generated photos in 10 different styles
          </Paragraph>
        </YStack>

        <XStack
          justifyContent="center"
          alignContent="stretch"
          space="$3"
          width="100%"
          maxWidth={600}
        >
          {STYLES.map((style) => (
            <YStack flexGrow={1} aspectRatio={1} display="flex" flexShrink={1}>
              <Paragraph textAlign="center">{style}</Paragraph>
              <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center">
                <Image
                  source={{ uri: order.data?.trainingImages[0].url }}
                  width="100%"
                  height="100%"
                />
              </Square>
            </YStack>
          ))}
        </XStack>

        <XStack
          justifyContent="center"
          alignContent="stretch"
          space="$3"
          width="100%"
          maxWidth={600}
        >
          {STYLES.map((style) => (
            <YStack flexGrow={1} aspectRatio={1} display="flex" flexShrink={1}>
              <Paragraph textAlign="center">{style}</Paragraph>
              <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center">
                <Image
                  source={{ uri: order.data?.trainingImages[0].url }}
                  width="100%"
                  height="100%"
                />
              </Square>
            </YStack>
          ))}
        </XStack>

        <YStack space="$4" maw={600} pb="$4">
          <Paragraph ta="center">
            After Payment the image generation process will begin and takes approximately 70 minutes{' '}
          </Paragraph>
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
