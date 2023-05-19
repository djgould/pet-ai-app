import { Card, H2, Paragraph, XStack, Spinner, Button, H1, YStack, Image } from '@my/ui'
import { AlertCircle, Moon } from '@tamagui/lucide-icons'
import { DateTime } from 'luxon'
import { Link, useLink } from 'solito/link'

export function OrderCard({ order }) {
  const linkProps = useLink({
    href: `/orders/${order.id}`,
  })

  return (
    <Card
      elevate
      size="$4"
      bordered
      animation="bouncy"
      width={'100%'}
      maxWidth={600}
      height={300}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
      {...linkProps}
    >
      <Card.Header padded>
        <XStack>
          <YStack>
            <OrderStatus status={order.status} />
            <Paragraph theme="alt2">
              {DateTime.fromISO(order.createdAt).toFormat("MM-dd-yy 'at' HH:mm")}
            </Paragraph>
          </YStack>
        </XStack>
      </Card.Header>

      <XStack
        flex={1}
        justifyContent="center"
        alignContent="stretch"
        space="$4"
        width="100%"
        paddingHorizontal="$4"
      >
        {order?.trainingImages?.map((image) => {
          return <Image source={{ uri: image.url }} aspectRatio={1} />
        })}
      </XStack>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">{getOrderButtonText(order)}</Button>
      </Card.Footer>
      <CardBackground status={order.status} />
    </Card>
  )
}

function OrderStatus({ status }) {
  if (status === 'PENDING' || status === 'UPLOADING_MODEL' || status === 'INFERING') {
    return <H2>Generating Images</H2>
  } else if (status === 'COMPLETED') {
    return <H2>Completed</H2>
  } else if (status === 'FAILED') {
    return <H2>Failed</H2>
  }

  return <H2>{status}</H2>
}

function getOrderButtonText({ status }) {
  if (status === 'PENDING' || status === 'UPLOADING_MODEL' || status === 'INFERING') {
    return 'ETA 12min'
  } else if (status === 'COMPLETED') {
    return 'View Order'
  } else if (status === 'FAILED') {
    return 'Contact Suppport'
  }

  return 'Contact Support'
}

function CardBackground({ status }) {
  if (status === 'PENDING') {
    return (
      <Card.Background justifyContent="center">
        <Spinner size="large" alignSelf="center" />
      </Card.Background>
    )
  } else if (status === 'COMPLETE') {
    return (
      <Card.Background justifyContent="center">
        <Moon size={64} />
      </Card.Background>
    )
  } else if (status === 'FAILED') {
    return (
      <Card.Background justifyContent="center" alignItems="center">
        <AlertCircle size={64} />
      </Card.Background>
    )
  }

  return null
}
