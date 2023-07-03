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
  Square,
  H3,
  ZStack,
} from '@my/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import { Star, ChevronRight, Moon, ArrowLeft, CheckCheck, CheckCircle } from '@tamagui/lucide-icons'
import { useMutation } from '@tanstack/react-query'
import { useClient } from 'app/provider/client'
import { useOrder } from 'app/provider/Order'
import React from 'react'
import { createParam } from 'solito'
import { useRouter } from 'solito/router'
import { DateTime } from 'luxon'
import { OrderCard } from './OrderCard'
import { useLink } from 'solito/link'
import ResultImage from './ResultImage'
import axios from 'axios'

const { useParam } = createParam<{ id: string }>()

function splitArray<T>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize))
  }
  return result
}

export function OrderScreen() {
  const [id] = useParam('id')
  const client = useClient()
  const { push } = useRouter()
  const order = useOrder(id)

  const resultImages = order.data?.resultImages ? splitArray(order.data?.resultImages, 5) : []

  const backLinkProps = useLink({
    href: '/orders',
  })

  const payLinkProps = useLink({
    href: `/orders/${id}/payment`,
  })

  const [selectedImageIds, setSelectedImageIds] = React.useState<{}>({})
  const downloadSelected = useMutation(async () => {
    const response = await client.post(
      `/orders/${id}/download-selected`,
      {
        ids: Object.entries(selectedImageIds)
          .filter(([, value]) => value)
          .map(([key]) => key),
      },
      {
        responseType: 'blob',
      }
    )

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'images.zip')
    document.body.appendChild(link)
    link.click()
    link.remove()

    // Reset selected images
    setSelectedImageIds([])
  })

  return (
    <YStack
      space="$3"
      flex={1}
      pt="$3"
      paddingRight="$5"
      paddingLeft="$5"
      alignContent="center"
      jc="center"
    >
      <XStack position="absolute" top="$4" left="$4" zIndex={4}>
        <Button {...backLinkProps}>
          <ArrowLeft />
        </Button>
      </XStack>
      <H2 textAlign="center">{order.data && getOrderStatus(order.data)}</H2>
      <Paragraph theme="alt2" textAlign="center">
        Order created on {DateTime.fromISO(order.data?.createdAt).toFormat("MM-dd-yy 'at' HH:mm")}
      </Paragraph>
      <Separator />
      <H3>Training Images</H3>
      <XStack justifyContent="center" alignContent="stretch" space="$3">
        {order.data?.trainingImages?.map((image) => (
          <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center" aspectRatio={1}>
            <Image source={{ uri: image.url }} width="100%" height="100%" />
          </Square>
        ))}
      </XStack>
      <Separator />
      <Card
        elevate
        size="$4"
        borderRadius={'$4'}
        width="100%"
        height={100}
        animation="bouncy"
        hoverStyle={{ scale: 1.015 }}
        {...payLinkProps}
      >
        <Card.Header padded>
          <XStack justifyContent="space-between" alignItems="center">
            <YStack>
              <H2 color="$gray3Dark">Upgrade for $10</H2>
              <Paragraph color="black">Get all 10 Styles with no watermark for $10</Paragraph>
            </YStack>
            <Button borderRadius="$10" {...payLinkProps}>
              Purchase
            </Button>
          </XStack>
        </Card.Header>
        <Card.Background>
          <LinearGradient
            position="absolute"
            colors={['#e66465', '#9198e5']}
            locations={[0.3, 1.0]}
            direction="rtl"
            width="100%"
            height="100%"
          />
        </Card.Background>
      </Card>
      {Boolean(resultImages.length) && (
        <XStack space="$4">
          <H3>Generated Images</H3>
          <a
            href={
              order.data.tier === 'free'
                ? `https://deving-pet-ai.s3.amazonaws.com//result_images/${id}-watermarked-result-images.zip`
                : `https://deving-pet-ai.s3.amazonaws.com//result_images/${id}-result-images.zip`
            }
            download
          >
            <Button>Download All</Button>
          </a>
          <Button onPress={() => downloadSelected.mutate()} disabled={downloadSelected.isLoading}>
            {downloadSelected.isLoading ? (
              <Spinner size="small" color="$green10" />
            ) : (
              `Download Selected (${Object.values(selectedImageIds).filter((el) => el).length})`
            )}
          </Button>
        </XStack>
      )}
      {resultImages?.map((chunk) => (
        <XStack justifyContent="center" alignContent="stretch" space="$3">
          {chunk.map((image) => (
            <ZStack
              aspectRatio={1}
              f={1}
              position="relative"
              onPress={() =>
                setSelectedImageIds({
                  ...selectedImageIds,
                  [image.id]: !selectedImageIds[image.id],
                })
              }
            >
              <ResultImage
                url={
                  order.data.tier === 'free'
                    ? (image.watermarkedUrl as string)
                    : (image.url as string)
                }
              />

              {
                /* calculate index of image in the array of selectedImagesIndex */
                selectedImageIds[image.id] && (
                  <XStack
                    jc="center"
                    alignItems="center"
                    zIndex={10}
                    height="100%"
                    backgroundColor={'rgba(52, 52, 52, 0.7)'}
                  >
                    <CheckCircle size={'$8'} />
                  </XStack>
                )
              }
            </ZStack>
          ))}
        </XStack>
      ))}
    </YStack>
  )
}

function getOrderStatus({ status }) {
  if (status === 'UPLOADING_MODEL' || status === 'INFERING' || status === 'TRAINING') {
    return 'Generating Images'
  } else if (status === 'PENDING') {
    return 'Payment Required'
  } else if (status === 'COMPLETED') {
    return 'Completed'
  } else if (status === 'FAILED') {
    return 'Failed'
  }

  return status
}
