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
import {
  Star,
  ChevronRight,
  Moon,
  ArrowLeft,
  CheckCheck,
  CheckCircle,
  Download,
} from '@tamagui/lucide-icons'
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
import Lightbox from 'yet-another-react-lightbox'
import DownloadPlugin from 'yet-another-react-lightbox/plugins/download'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import { useUser } from 'app/provider/User'

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
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [lightboxIndex, setLightboxIndex] = React.useState(0)
  const user = useUser()

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

  // resultImages have a label and we want to group them by label
  const groupedResultImages = React.useMemo(() => {
    const grouped = {}
    order.data?.resultImages?.forEach((image) => {
      if (!grouped[image.label]) {
        grouped[image.label] = []
      }
      grouped[image.label].push(image)
    })
    return grouped
  }, [order.data?.resultImages])

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
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={order.data?.resultImages?.map((image, i) => ({
          src: user.data?.tier !== 'basic' ? image.watermarkedUrl : image.url,
          title: `${image.label.charAt(0).toUpperCase() + image.label.slice(1)}`,
          download: {
            filename: `${image.label}-${i}.jpeg`,
            url: user.data?.tier !== 'basic' ? image.watermarkedUrl : image.url,
          },
        }))}
        plugins={[DownloadPlugin, Captions]}
      />
      <XStack position="absolute" top="$4" left="$4" zIndex={4}>
        <Button {...backLinkProps}>
          <ArrowLeft />
        </Button>
      </XStack>
      <H2 textAlign="center">{order.data && getOrderStatus(order.data, user.data)}</H2>
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
      {user.data?.tier === 'free' && (
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
                <H2 color="white">Start a 7 day free trial</H2>
                <Paragraph color="white">
                  Get 3 trainings per month and access to all styles
                </Paragraph>
              </YStack>
            </XStack>
          </Card.Header>
          <Card.Background>
            <LinearGradient
              position="absolute"
              colors={['rgb(221, 93, 94)', 'rgb(123, 131, 213)']}
              locations={[0.3, 1.0]}
              direction="rtl"
              width="100%"
              height="100%"
            />
          </Card.Background>
        </Card>
      )}
      {Boolean(resultImages.length) && (
        <XStack space="$4">
          <H3>Generated Images</H3>
          <a
            href={
              user.data?.tier !== 'basic'
                ? `https://deving-pet-ai.s3.amazonaws.com//result_images/${id}-watermarked-result-images.zip`
                : `https://deving-pet-ai.s3.amazonaws.com//result_images/${id}-result-images.zip`
            }
            download
          >
            <Button>
              <Download />
            </Button>
          </a>
          {/*<Button onPress={() => downloadSelected.mutate()} disabled={downloadSelected.isLoading}>
            {downloadSelected.isLoading ? (
              <Spinner size="small" color="$green10" />
            ) : (
              <>
                <Download />
                `(${Object.values(selectedImageIds).filter((el) => el).length})`
              </>
            )}
          </Button>*/}
        </XStack>
      )}
      {Object.entries(groupedResultImages).map(([label, images]) => {
        return (
          <YStack space="$2">
            <H3>{label.toUpperCase()}</H3>
            {splitArray(images, 5)?.map((chunk) => (
              <XStack justifyContent="center" alignContent="stretch" space="$2">
                {chunk.map((image) => (
                  <ZStack
                    aspectRatio={1}
                    f={1}
                    position="relative"
                    onPress={() => {
                      setLightboxOpen(true)
                      setLightboxIndex(
                        order.data?.resultImages.findIndex((el) => el.id === image.id)
                      )
                    }}
                  >
                    <ResultImage
                      url={
                        user.data?.tier !== 'basic'
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
      })}
    </YStack>
  )
}

function getOrderStatus({ status }, user) {
  if (status === 'UPLOADING_MODEL' || status === 'INFERING' || status === 'TRAINING') {
    return 'Generating Images'
  } else if (status === 'PENDING') {
    return user?.tier !== 'basic' ? 'Payment Required' : 'Pending'
  } else if (status === 'COMPLETED') {
    return 'Completed'
  } else if (status === 'FAILED') {
    return 'Failed'
  }

  return status
}
