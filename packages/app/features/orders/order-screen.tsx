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
      <H2 textAlign="center">{getOrderStatus(order)}</H2>
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
      {Boolean(resultImages.length) && (
        <XStack space="$4">
          <H3>Generated Images</H3>
          <a
            href={`https://deving-pet-ai.s3.amazonaws.com//result_images/${id}-result-images.zip`}
            download
          >
            <Button>Download All</Button>
          </a>
          <Button>
            {`Download Selected (${Object.values(selectedImageIds).filter((el) => el).length})`}
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
              <ResultImage url={image.url as string} />

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
      <Button {...payLinkProps}>Complete Payment</Button>
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
