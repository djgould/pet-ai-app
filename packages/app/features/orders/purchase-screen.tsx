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

  const createFreePurchase = useMutation(
    async () => {
      const response = await client.post(`/orders/${id}/free`)
      return response.data
    },
    {
      onSuccess: (data) => {
        push('/orders')
      },
    }
  )

  const STYLES = [
    {
      title: 'Cowboy',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/d4265a54-0aae-4076-0a5b-4fb57f898d00/public',
    },
    {
      title: 'Pirate',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/f4ed57f8-9cf8-42e1-2acd-84b5fdd09500/public',
    },
    {
      title: 'King',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/9b250d47-c7ac-4ac8-6d4f-90a2a45c4100/public',
    },
    {
      title: 'Impressionist',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/03a0bdd4-07f1-463d-6f9d-510cfd531e00/public',
    },
    {
      title: 'Christmas',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/066c4236-2ccf-4821-d38d-56985185b100/public',
    },
    {
      title: 'Suit',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/e51b66d7-1f1c-42c7-8f21-76810efd8000/public',
    },
    {
      title: 'Superhero',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/5579ecf5-3143-4df0-f791-e55b67d78b00/public',
    },
    {
      title: 'Jedi',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/216a3db7-253a-423e-f4b9-b22ef3fb1f00/public',
    },
    {
      title: 'Mobster',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/017a2283-26a7-4817-a45a-2d27f3799800/public',
    },
    {
      title: 'Astronaut',
      imageUrl:
        'https://imagedelivery.net/Pg1MxPV3UBYR5Z4j-Ai2dQ/4fa8c284-c91b-49f3-87d9-0387e7d50900/public',
    },
  ]

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
          {STYLES.slice(0, 5).map((style) => (
            <YStack flexGrow={1} aspectRatio={1} display="flex" flexShrink={1}>
              <Paragraph textAlign="center">{style.title}</Paragraph>
              <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center">
                <Image source={{ uri: style.imageUrl }} width="100%" height="100%" />
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
          {STYLES.slice(5).map((style) => (
            <YStack flexGrow={1} aspectRatio={1} display="flex" flexShrink={1}>
              <Paragraph textAlign="center">{style.title}</Paragraph>
              <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center">
                <Image source={{ uri: style.imageUrl }} width="100%" height="100%" />
              </Square>
            </YStack>
          ))}
        </XStack>

        <YStack space="$4" maw={600} pb="$4">
          <Paragraph ta="center">
            After Payment the image generation process will begin and takes approximately 70 minutes{' '}
          </Paragraph>
        </YStack>

        <XStack marginBottom="$4" space="$4">
          <Button
            onPress={() => createFreePurchase.mutate()}
            disabled={createFreePurchase.isLoading}
          >
            {createFreePurchase.isLoading ? (
              <Spinner size="small" color="$green10" />
            ) : (
              'Free (1 Style)'
            )}
          </Button>
          <Button
            onPress={() => createCheckoutSession.mutate()}
            disabled={createCheckoutSession.isLoading}
          >
            {createCheckoutSession.isLoading ? (
              <Spinner size="small" color="$green10" />
            ) : (
              '$10 (10 Styles)'
            )}
          </Button>
        </XStack>
      </YStack>
    </YStack>
  )
}
